import { useState } from "react";
import { handleUpload } from "../api";
import "./LandingPage.css";

const LandingPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showApi, setShowApi] = useState(false);

  const API_LINK =
    "https://document-chunker.onrender.com/chat/chunk/api";

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

  const copyApi = async () => {
    await navigator.clipboard.writeText(API_LINK);
    alert("API copied");
  };

  return (
    <div className="main">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="logo">Chat Chunker</div>

        <div className="top-right">
          <button
            className="api-btn"
            onClick={() => setShowApi(!showApi)}
          >
            API
          </button>

          <a
            href="https://github.com/mehakbhardwaj1029-ops/document-chunker"
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
      </div>

      {/* API MODAL */}
{showApi && (
  <div className="api-overlay">
    <div className="api-modal">

      <button
        className="close-btn"
        onClick={() => setShowApi(false)}
      >
        ✕
      </button>

      <h2 className="api-title">
        Chunking API
      </h2>

      <div className="api-box">
        <span className="api-link">
          {API_LINK}
        </span>

        <button
          className="copy-btn"
          onClick={copyApi}
        >
          📋
        </button>
      </div>

      <p className="api-note">
        Call this API to chunk your document.
      </p>

    </div>
  </div>
)}
      

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
          {file ? (
            <p className="file-name">
              📄 {file.name}
            </p>
          ) : (
            <p className="drop-text">
              Drag & Drop your file here <br />
              or click to upload
            </p>
          )}
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
        <button
          onClick={onUploadClick}
          className="upload-btn"
        >
          Upload & Download Chunks
        </button>
      </div>
    </div>
  );
};

export default LandingPage;