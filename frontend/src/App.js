import React, { useState } from "react";
import "./App.css";

function App() {
  const [fileURL, setfileURL] = useState("");
  const [selectedFile, setselectedFile] = useState(null);

  let uploadInput = React.createRef();

  const handleSelectFile = (e) => {
    const data = [];
    for (let i = 0; i < e.target.files.length; i++) {
      data.push(e.target.files.item(i));
    }
    setselectedFile(data);
  };

  const handleUploadFile = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    for (let i = 0; i < uploadInput.files.length; i++) {
      data.append("file", uploadInput.files[i], uploadInput.files[i].name);
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
          <button className="formButton" type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
