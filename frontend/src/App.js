import React, { useState } from "react";
import "./App.css";

function App() {
  const [fileURL, setfileURL] = useState("");

  let uploadInput = React.createRef();

  const handleUploadFile = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    for (let i = 0; i < uploadInput.files.length; i++) {
      data.append("file", uploadInput.files[i]);
      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          console.log(body);
          setfileURL(`http://localhost:5000/${body.filename}`);
        });
      });
      alert(`File ${uploadInput.files[i].name} uploaded successfully. `);
    }
  };

  return (
    <>
      <div className="container">
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
          />
          <button className="formButton" type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
