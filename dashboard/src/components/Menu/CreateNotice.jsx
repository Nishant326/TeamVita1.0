
import { useRef, useState } from "react";
import axios from "axios";
import {
  Anchor,
  FileText,
  Send,
  FileUp,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import "./create-notice-pirate.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialNotice = {
  title: "",
  description: "",
  pdf: null,
};

export default function CreateNotice() {
  const [notice, setNotice] = useState(initialNotice);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNotice((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      event.target.value = "";
      setNotice((previous) => ({ ...previous, pdf: null }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("The PDF must be 10 MB or smaller.");
      event.target.value = "";
      setNotice((previous) => ({ ...previous, pdf: null }));
      return;
    }

    setNotice((previous) => ({ ...previous, pdf: file }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!notice.pdf) {
      setError("Please upload a PDF before publishing the notice.");
      return;
    }

    const formData = new FormData();
    formData.append("title", notice.title.trim());
    formData.append("description", notice.description.trim());
    formData.append("pdf", notice.pdf);

    try {
      setSubmitting(true);

      await axios.post(`${API_URL}/notice`, formData);

      setSuccess("Notice published successfully!");
      setNotice({ ...initialNotice });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Create notice error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to publish the notice. Check your backend and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="cn-page">
      <div className="cn-decoration cn-decoration-one" />
      <div className="cn-decoration cn-decoration-two" />

      <section className="cn-card">
        <header className="cn-header">
          <div className="cn-emblem">
            <Anchor size={28} />
          </div>

          <div className="cn-header-content">
            <span className="cn-eyebrow">
              VEDORA INSTITUTE OF TECHNOLOGY
            </span>
            <h1>Captain's Bulletin</h1>
            <p>
              Share important announcements with the entire campus.
            </p>
          </div>
        </header>

        <div className="cn-section-title">
          <span className="cn-section-icon">
            <FileText size={21} />
          </span>
          <div>
            <h2>Create a New Notice</h2>
            <p>Fill in the announcement details below.</p>
          </div>
        </div>

        {error && (
          <div className="cn-alert cn-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="cn-alert cn-success" role="status">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        <form className="cn-form" onSubmit={handleSubmit}>
          <div className="cn-field">
            <label htmlFor="notice-title">Notice Title</label>
            <input
              id="notice-title"
              type="text"
              name="title"
              placeholder="Enter announcement title"
              value={notice.title}
              onChange={handleChange}
              maxLength={200}
              required
            />
          </div>

          <div className="cn-field">
            <label htmlFor="notice-description">
              Description
            </label>
            <textarea
              id="notice-description"
              name="description"
              placeholder="Write the important details here..."
              value={notice.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="cn-field">
            <label htmlFor="notice-pdf">
              <FileUp size={17} />
              Attach Notice PDF
            </label>

            <div className="cn-upload-area">
              <FileUp size={31} />

              <strong>
                {notice.pdf
                  ? notice.pdf.name
                  : "Choose your notice document"}
              </strong>

              <span>PDF format · Maximum 10 MB</span>

              <input
                ref={fileInputRef}
                id="notice-pdf"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <div className="cn-guidance">
            <CalendarDays size={17} />
            <span>
              Review your announcement before publishing it.
            </span>
          </div>

          <button
            className="cn-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              "Publishing Notice..."
            ) : (
              <>
                <Send size={18} />
                Publish Notice
              </>
            )}
          </button>
        </form>

        <footer className="cn-card-footer">
          <Anchor size={15} />
          <span>Keep every member of the crew informed.</span>
        </footer>
      </section>
    </main>
  );
}
