import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BookOpen,
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

function Notes() {
  const { branchName, branch, semester } = useParams();
  const selectedBranch = branchName || branch || "";
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchNotes() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `${API_URL}/notes/${encodeURIComponent(selectedBranch)}/${encodeURIComponent(semester || "")}`,
          { signal: controller.signal }
        );

        const data = response.data;
        const items = Array.isArray(data)
          ? data
          : data?.notes || data?.data || [];

        setNotesData(Array.isArray(items) ? items : []);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError(
            err.response?.data?.message ||
              "Unable to load notes. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchNotes();
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
            VEDORA KNOWLEDGE ARCHIVE
          </p>
          <h1>Lecture <span>Notes</span></h1>
          <p>
            {selectedBranch} · Semester {semester}
          </p>
        </header>

        {loading ? (
          <div className="pirate-resource-state">
            <div className="pirate-spinner" />
            <p>Searching the knowledge archive...</p>
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
        ) : notesData.length === 0 ? (
          <div className="pirate-resource-state">
            <BookOpen size={42} />
            <h2>No notes found yet</h2>
            <p>There are no notes available for this selection.</p>
          </div>
        ) : (
          <div className="pirate-resource-grid">
            {notesData.map((note, index) => {
              const pdfUrl = getPdfUrl(
                note.file_path || note.filePath || note.pdf_path
              );

              return (
                <article
                  className="pirate-document-card"
                  key={note._id || note.id || `${note.title}-${index}`}
                >
                  <div className="pirate-document-top">
                    <div className="pirate-document-icon">
                      <FileText size={25} />
                    </div>
                    <span className="pirate-document-unit">
                      {note.unit || "Study Material"}
                    </span>
                  </div>

                  <p className="pirate-document-subject">
                    {note.subject || selectedBranch}
                  </p>
                  <h2>{note.title || "Lecture Notes"}</h2>
                  {note.author && (
                    <p className="pirate-document-author">
                      Prepared by {note.author}
                    </p>
                  )}

                  <div className="pirate-document-actions">
                    {pdfUrl ? (
                      <>
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pirate-document-primary"
                        >
                          <ExternalLink size={16} /> View PDF
                        </a>
                        <a
                          href={pdfUrl}
                          download
                          className="pirate-document-secondary"
                          aria-label={`Download ${note.title || "notes"}`}
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

export default Notes;