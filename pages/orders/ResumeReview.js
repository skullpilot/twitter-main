import React from "react";
import { useState, useEffect } from "react";
import AWS from "aws-sdk";
import moment from "moment";
import * as Axios from "axios";
import JWT from "jsonwebtoken";

import styles from "./index.module.css";
import DropZone from "../../components/dropzone";
import {
  API_ENDPOINT,
  FAKE_S3_HOST,
  RESUME_S3_BUCKET_NAME,
  NODE_ENV
} from "../../config";

function downloadResumeFile(link) {
  const element = document.createElement("a");
  element.setAttribute("href", link);
  element.setAttribute("download", "");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

async function downloadResume(resume) {
  if (!resume || !resume.key) {
    return;
  }

  try {
    let resumeUrl;
    if (NODE_ENV === "development") {
      resumeUrl = `${FAKE_S3_HOST}/${RESUME_S3_BUCKET_NAME}/${resume.key}`;
    } else {
      resumeUrl = await getResumeUrl(resume.key);
    }

    downloadResumeFile(resumeUrl);
  } catch (err) {
    console.error(err);
  }
}

// TODO: could improve with cache
async function getResumeUrl(resumeKey) {
  const response = await Axios.post(
    `${API_ENDPOINT}/resume-download-session`,
    {
      key: resumeKey
    },
    {
      headers: {
        Authorization: token
      }
    }
  );

  const { signedRequesturl } = response.data;

  return signedRequesturl;
}

async function uploadResume(file, match, orderId, token) {
  if (!file) {
    return;
  }

  try {
    if (NODE_ENV === "development") {
      await uploadFakeS3(file, match.id, orderId, token);
    } else {
      await uploadS3(file, match.id, orderId, token);
    }

    const createdAt = moment.utc().format();

    const decodedToken = JWT.decode(token);

    const newMatch = {
      ...match,
      resumes: [
        ...match.resumes,
        {
          key: `${decodedToken.email}_${orderId}/${match.id}/${file.name}`,
          createdAt
        }
      ]
    };
    await Axios.put(`${API_ENDPOINT}/match/${match.id}`, newMatch, {
      headers: {
        Authorization: token
      }
    });

    return newMatch;
  } catch (error) {
    console.error(error);
  }
  return match;
}

async function uploadS3(file, matchId, orderId, token) {
  let response = await Axios.post(
    `${API_ENDPOINT}/resume-upload-session`,
    {
      filename: file.name,
      orderId,
      matchId
    },
    {
      headers: {
        Authorization: token
      }
    }
  );

  const { signedRequesturl, url } = response.data;

  await Axios.put(signedRequesturl, file);
}

async function uploadFakeS3(file, matchId, orderId, token) {
  const config = {
    s3ForcePathStyle: true,
    accessKeyId: "ACCESS_KEY_ID",
    secretAccessKey: "SECRET_ACCESS_KEY",
    endpoint: new AWS.Endpoint(FAKE_S3_HOST)
  };

  const client = new AWS.S3(config);

  const decodedToken = JWT.decode(token);

  const params = {
    Key: `${decodedToken.email}_${orderId}/${matchId}/${file.name}`,
    Bucket: RESUME_S3_BUCKET_NAME,
    Body: file
  };

  await client.upload(params).promise();
}

async function removeResume(resume, match, token) {
  if (!resume || !resume.key) {
    return;
  }

  const newMatch = {
    ...match,
    resumes: match.resumes.filter((r) => r.key !== resume.key)
  };

  try {
    const response = await Axios.put(
      `${API_ENDPOINT}/match/${match.id}`,
      newMatch,
      {
        headers: {
          Authorization: token
        }
      }
    );

    await Axios.delete(`${API_ENDPOINT}/resume/${resume.key}`, {
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (error) {
    // TODO: error handling
    console.log(error);
  }
  return match;
}

export default function ResumeReview({ orderId, matchId, token }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    Axios.get(`${API_ENDPOINT}/match/${matchId}`, {
      headers: { Authorization: token }
    }).then((response) => {
      setMatch(response.data);
    });
  }, []);

  const remove = async (resume) => {
    const newMatch = await removeResume(resume, match, token);
    setMatch(newMatch);
  };

  const upload = async (file) => {
    const newMatch = await uploadResume(file, match, orderId, token);
    setMatch(newMatch);
  };

  return (
    <div className="mt-32 max-w-screen-lg mx-auto">
      <div className="text-center">
        <div className={styles["title"]}>Reviews</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 mt-12 gap-10 pb-20">
        {match &&
          match.resumes &&
          match.resumes.map((resume) => (
            <div
              key={resume.key}
              className="shadow-2xl flex rounded-xl h-36 bg-white items-center justify-center break-words text-sm cursor-pointer transform hover:scale-110 motion-reduce:transform-none relative"
              onClick={() => downloadResume(resume)}
            >
              <div
                className="absolute top-5 right-5 text-black cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(resume);
                }}
              >
                X
              </div>
              {resume.key.split("/").pop()}
            </div>
          ))}
      </div>

      <div className="shadow-2xl flex rounded-xl h-80 bg-white w-full items-center justify-center">
        <DropZone uploadResume={upload} />
      </div>
    </div>
  );
}
