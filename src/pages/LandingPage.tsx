import { useState } from "react";
import { handleUpload } from "../api";
import "./LandingPage.css";

const LandingPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (f: File) => {
    setFile(f);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onUploadClick = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    await handleUpload(file);
  };

  return (
    <div className="main">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="logo">Chat Chunker</div>

        <a
          href="https://github.com/YOUR_REPO_LINK"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
            alt="github"
            className="github-icon"
          />
        </a>
      </div>

      {/* CENTER */}
      <div className="container">
        {/* DROP ZONE */}
        <div
          className={`drop-zone ${dragActive ? "active" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          onClick={() =>
            document.getElementById("fileInput")?.click()
          }
        >
          <p className="drop-text">
            Drag & Drop your file here <br />
            or click to upload
          </p>
        </div>

        {/* FILE INPUT */}
        <input
          id="fileInput"
          type="file"
          className="hidden-input"
          accept=".txt"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        {/* BUTTON */}
        <button onClick={onUploadClick} className="upload-btn">
          Upload & Download Chunks
        </button>
      </div>
    </div>
  );
};

export default LandingPage;