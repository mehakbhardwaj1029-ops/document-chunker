import { useState } from "react";
import { handleUpload } from "../api";
import { FiCopy, FiCheck } from "react-icons/fi";
import "./LandingPage.css";

const LandingPage = () => {

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showApi, setShowApi] = useState(false);

  // tracks which API was copied
  const [copiedApi, setCopiedApi] = useState<string | null>(null);

  const API_LINK =
    "https://document-chunker.onrender.com/chat/chunk/api";

  const MESSAGE_API_LINK =
    "https://document-chunker.onrender.com/chat/chunk/message/api";

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
      return;
    }

    await handleUpload(file);
  };

  const copyApi = async (link: string) => {

    try {

      await navigator.clipboard.writeText(link);

      setCopiedApi(link);

      setTimeout(() => {
        setCopiedApi(null);
      }, 1200);

    } catch (error) {
      console.error("Copy failed");
    }
  };

  return (
    <div className="main">

      {/* TOP BAR */}
      <div className="top-bar">

        <div className="logo">
          Chat Chunker
        </div>

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
              Chunking APIs
            </h2>

            {/* WORD CHUNKING */}
            <div className="api-section">

              <p className="api-label">
                Word Chunking API
              </p>

              <div className="api-box">

                <span className="api-link">
                  {API_LINK}
                </span>

                <button
                  className={`copy-btn ${
                    copiedApi === API_LINK ? "copied" : ""
                  }`}
                  onClick={() => copyApi(API_LINK)}
                >
                  {
                    copiedApi === API_LINK
                      ? <FiCheck />
                      : <FiCopy />
                  }
                </button>

              </div>
            </div>

            {/* MESSAGE CHUNKING */}
            <div className="api-section">

              <p className="api-label">
                Message Chunking API
              </p>

              <div className="api-box">

                <span className="api-link">
                  {MESSAGE_API_LINK}
                </span>

                <button
                  className={`copy-btn ${
                    copiedApi === MESSAGE_API_LINK ? "copied" : ""
                  }`}
                  onClick={() => copyApi(MESSAGE_API_LINK)}
                >
                  {
                    copiedApi === MESSAGE_API_LINK
                      ? <FiCheck />
                      : <FiCopy />
                  }
                </button>

              </div>
            </div>

            <p className="api-note">
              Use these APIs to generate chunks from uploaded chat files.
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

          {
            file ? (

              <p className="file-name">
                📄 {file.name}
              </p>

            ) : (

              <p className="drop-text">
                Drag & Drop your file here
                <br />
                or click to upload
              </p>
            )
          }

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

        {/* UPLOAD BUTTON */}
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