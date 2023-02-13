import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  const [, setfileURL] = useState("");
  const [selectedFile, setselectedFile] = useState(null);
  const [uploadedFile, setuploadedFile] = useState({});
  const [isUploading, setisUploading] = useState(false);
  const [isFileUploaded, setisFileUploaded] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);

  let uploadInput = React.createRef();

  // Track selected file before the upload
  const handleSelectFile = (e) => {
    const selectedFileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      selectedFileList.push(e.target.files.item(i));
    }
    setselectedFile(selectedFileList);
  };

  // Upload file to server
  const handleUploadFile = async (ev) => {
    ev.preventDefault();

    setisUploading(true);
    const data = new FormData();
    // Append the file to the request body
    for (let i = 0; i < uploadInput.files.length; i++) {
      data.append("file", uploadInput.files[i], uploadInput.files[i].name);
    }

    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setuploadProgress(Math.round((loaded / total) * 100));
        },
      };
      const response = await axios.post(
        "http://localhost:5000/upload",
        data,
        config
      );
      const body = response.data;
      console.log(body);
      setfileURL(`http://localhost:5000/${body.filename}`);
      if (response.status === 200) {
        setisFileUploaded(true); // flag to show the uploaded file
        setisUploading(false);
        setuploadedFile(selectedFile); // set the uploaded file to show the name
      }
    } catch (error) {
      console.error(error);
      setisUploading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h1>React-Flask File Upload</h1>
        <h3>
          This is a simple file upload app, upload your files and you can see
          the saved files in the backend/app/Downloads folder
        </h3>
        {/* Upload file form */}
        <form className="form" onSubmit={handleUploadFile}>
          <input
            className="formInput"
            type="file"
            multiple
            ref={(ref) => {
              uploadInput = ref;
            }}
            onChange={handleSelectFile}
          />
          <div className="selectFile">
            <h3>Selected file(s): </h3>
            {selectedFile &&
              selectedFile.map((item, index) => {
                return <div key={index}>{item.name}</div>;
              })}
          </div>
          <button className="formButton" type="submit">
            Upload
          </button>
        </form>
        {/* Show the upload progress */}
        {isUploading && (
          <>
            <Spinner />
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={uploadProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {uploadProgress}%
            </div>
          </>
        )}
        {/* Show the success message and file names after upload */}
        {isFileUploaded && (
          <div>
            <h3 className="success">File(s) uploaded successfully!</h3>
            <div className="uploadedFile">
              <h3>Uploaded file(s): </h3>
              {uploadedFile &&
                uploadedFile.map((item, index) => {
                  return <div key={index}>{item.name}</div>;
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
