import React, { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  const [, setfileURL] = useState("");
  const [selectedFile, setselectedFile] = useState(null);
  const [isUploading, setisUploading] = useState(false);
  const [isFileUploaded, setisFileUploaded] = useState(false);

  let uploadInput = React.createRef();

  // Track selected file before the upload
  const handleSelectFile = (e) => {
    const data = [];
    for (let i = 0; i < e.target.files.length; i++) {
      data.push(e.target.files.item(i));
    }
    setselectedFile(data);
  };

  // Upload file to server
  const handleUploadFile = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    // Append the file to the request body
    for (let i = 0; i < uploadInput.files.length; i++) {
      data.append("file", uploadInput.files[i], uploadInput.files[i].name);
      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          console.log(body);
          setfileURL(`http://localhost:5000/${body.filename}`);
          if (response.status === 200) {
            setisFileUploaded(true);
            setisUploading(false);
          }
        });
      });
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
          <button
            className="formButton"
            type="submit"
            onClick={() => setisUploading(true)}
          >
            Upload
          </button>
        </form>
        {isUploading && <Spinner />}
        {/* Show the success message after the file is uploaded */}
        {isFileUploaded && (
          <div className="success">
            <h3>File(s) uploaded successfully!</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
