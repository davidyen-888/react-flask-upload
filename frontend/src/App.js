import React, { useState } from "react";

function App() {
  const [fileURL, setfileURL] = useState("");

  const handleUploadFile = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", uploadInput.files[0]);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        setfileURL(`http://localhost:5000/${body.filename}`);
        alert(
          `File ${body.filename} uploaded successfully to Downloads folder`
        );
      });
    });
  };

  let uploadInput = null;

  return (
    <>
      <form onSubmit={handleUploadFile}>
        <div>
          <input
            ref={(ref) => {
              uploadInput = ref;
            }}
            type="file"
          />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
      </form>
    </>
  );
}

export default App;
