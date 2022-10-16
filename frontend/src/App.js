import React, { useState } from "react";

function App() {
  const [fileURL, setfileURL] = useState("");

  const handleUploadImage = (ev) => {
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
      });
    });
  };

  let uploadInput = null;

  return (
    <form onSubmit={handleUploadImage}>
      <div>
        <input
          ref={(ref) => {
            uploadInput = ref;
          }}
          type="file"
          multiple
        />
      </div>
      <br />
      <div>
        <button>Upload</button>
      </div>
      {/* If successfully uploaded, show the message */}
      {fileURL && <h3>file uploaded successfully</h3>}
    </form>
  );
}

export default App;
