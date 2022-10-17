import React, { useState } from "react";

function App() {
  const [fileURL, setfileURL] = useState("");
  const [filename, setfilename] = useState("");

  // get file name and file url
  const handleFile = (e) => {
    setfilename(e.target.files[0].name);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setfileURL(reader.result);
    };
  };

  let uploadInput = null;
  const handleUploadMultipleFiles = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    for (let i = 0; i < uploadInput.files.length; i++) {
      data.append("file", uploadInput.files[i]);
      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
        // eslint-disable-next-line no-loop-func
      }).then((response) => {
        response.json().then((body) => {
          console.log(body);
          setfileURL(`http://localhost:5000/${body.filename}`);
          alert(`File ${uploadInput.files[i].name} uploaded successfully. `);
        });
      });
    }
  };

  return (
    <>
      <style>
        {`
      .container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
      }
      .form {
        padding: 15px;
        border: 1px solid #eee;
        border-radius: 5px;
      }
      .form__input {
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
      }
      .form__button {
        width: 100%;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 5px;
        background-color: #eee;
        cursor: pointer;
      }
      .form__button:hover {
        background-color: #ddd;
      }
    `}
      </style>
      <div className="container">
        <form className="form" onSubmit={handleUploadMultipleFiles}>
          <input
            className="form__input"
            type="file"
            multiple
            ref={(ref) => {
              uploadInput = ref;
            }}
          />
          <button className="form__button" type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
