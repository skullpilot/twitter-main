const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001";
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || "development";

const FAKE_S3_HOST = "http://localhost:4569";
const RESUME_S3_BUCKET_NAME =
  process.env.RESUME_S3_BUCKET_NAME || "resumes-bucket";

export { API_ENDPOINT, FAKE_S3_HOST, NODE_ENV, RESUME_S3_BUCKET_NAME };
