import React, { useState } from "react";

const DropZone = ({ uploadResume }) => {
  const [file, setFile] = useState(null);
  const [dragState, setdragState] = useState(true);
  return (
    <div className="flex flex-col w-full md:px-20 px-5  ">
      <div>
        <div
          className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2  border-dashed rounded-md ${
            dragState ? "border-gray-300" : "border-blue-700"
          }   `}
        >
          <div
            className={`space-y-1 md:py-10 text-center ${file ? "hidden" : ""}`}
            onDrop={async (e) => {
              setdragState(true);
              e.preventDefault();
              e.stopPropagation();
              let files = [...e.dataTransfer.files];
              if (files && files.length > 0) {
                setFile(files[0]);
                await uploadResume(files[0]);
                setFile(null);
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setdragState(false);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setdragState(false);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setdragState(true);
            }}
          >
            <img
              className="mx-auto h-12 w-12 text-gray-400"
              src="/assets/uploadResume/file.svg"
            ></img>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-700"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={async (e) => {
                    let files = [...e.target.files];
                    if (files && files.length > 0) {
                      setFile(files[0]);
                      await uploadResume(files[0]);
                      setFile(null);
                    }
                  }}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">up to 10MB</p>
          </div>
          <div
            className={`space-y-1 md:py-20 text-center ${file ? "" : "hidden"}`}
          >
            <div
              className="rounded animate-spin ease duration-300 "
              viewBox="0 0 24 24"
            >
              <img
                className="mx-auto h-12 w-12 text-gray-400 "
                src="/assets/uploadResume/Spinner.svg"
              ></img>
            </div>
            <div className="mb-4  mx-auto text-gray-400 text-sm ">
              <div>Uploading File:</div> <div>{file && file.name}</div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
