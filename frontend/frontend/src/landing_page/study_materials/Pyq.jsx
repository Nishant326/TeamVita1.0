import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ScrollText,
  FileText,
  Download,
  ExternalLink,
  Compass,
  RotateCcw,
} from "lucide-react";
import "./resources-pirate.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

function Pyq() {
  const { branchName, branch, semester } = useParams();
  const selectedBranch = branchName || branch || "";
  const [pyqData, setPyqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPyqs() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `${API_URL}/pyq/${encodeURIComponent(selectedBranch)}/${encodeURIComponent(semester || "")}`,
          { signal: controller.signal }
        );

        const data = response.data;
        const items = Array.isArray(data)
          ? data
          : data?.pyqs || data?.papers || data?.data || [];

        setPyqData(Array.isArray(items) ? items : []);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError(
            err.response?.data?.message ||
              "Unable to load question papers. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPyqs();
    return () => controller.abort();
  }, [selectedBranch, semester]);

  const getPdfUrl = (path) => {
    if (!path) return "";

    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    return `${API_URL}/${path.replace(/^\/+/, "")}`;
  };

  return (
    <main className="pirate-resources-page">
      <div className="pirate-resources-shell">
        <header className="pirate-resources-heading">
          <div className="pirate-resources-emblem">
            <Compass size={28} />
          </div>
          <p className="pirate-resources-eyebrow">
            VEDORA EXAMINATION VAULT
          </p>
          <h1>Previous Year <span>Questions</span></h1>
          <p>
            {selectedBranch} · Semester {semester}
          </p>
        </header>

        {loading ? (
          <div className="pirate-resource-state">
            <div className="pirate-spinner" />
            <p>Retrieving papers from the examination vault...</p>
          </div>
        ) : error ? (
          <div className="pirate-resource-state">
            <p>{error}</p>
            <button
              className="pirate-retry-btn"
              onClick={() => window.location.reload()}
            >
              <RotateCcw size={16} /> Try again
            </button>
          </div>
        ) : pyqData.length === 0 ? (
          <div className="pirate-resource-state">
            <ScrollText size={42} />
            <h2>No question papers found</h2>
            <p>Try another semester or check back later.</p>
          </div>
        ) : (
          <div className="pirate-pyq-list">
            {pyqData.map((paper, index) => {
              const pdfUrl = getPdfUrl(
                paper.file_path || paper.filePath || paper.pdf_path
              );

              return (
                <article
                  className="pirate-pyq-row"
                  key={paper._id || paper.id || `${paper.title}-${index}`}
                >
                  <div className="pirate-pyq-year">
                    <FileText size={23} />
                    <span>{paper.year || "PYQ"}</span>
                  </div>

                  <div className="pirate-pyq-info">
                    <h2>{paper.subject || "Question Paper"}</h2>
                    <p>
                      {paper.title || paper.type || "Previous Year Paper"}
                    </p>
                  </div>

                  <div className="pirate-pyq-action">
                    {pdfUrl ? (
                      <>
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pirate-document-primary"
                        >
                          <ExternalLink size={16} /> View Paper
                        </a>
                        <a
                          href={pdfUrl}
                          download
                          className="pirate-document-secondary"
                          aria-label={`Download ${paper.subject || "question paper"}`}
                        >
                          <Download size={17} />
                        </a>
                      </>
                    ) : (
                      <span className="pirate-document-unavailable">
                        PDF unavailable
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Pyq;