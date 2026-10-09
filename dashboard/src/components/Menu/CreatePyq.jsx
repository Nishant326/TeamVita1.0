import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Anchor,
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
  FileUp,
  GitBranch,
  Send,
  CheckCircle2,
} from "lucide-react";
import "./create-pyq-pirate.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const branches = [
  { code: "CSE", name: "COMPUTER SCIENCE ENGINEERING" },
  { code: "ECE", name: "ELECTRONIC AND COMMUNICATION ENGINEERING" },
  { code: "EEE", name: "ELECTRICAL ENGINEERING" },
  { code: "ME", name: "MECHANICAL ENGINEERING" },
  { code: "CE", name: "CIVIL ENGINEERING" },
];

const initialPyq = {
  title: "",
  subject: "",
  semester: "",
  branch: "",
  session_year: "",
  year: "",
  pdf: null,
};

const CreatePYQ = () => {
  const [pyq, setPyq] = useState(initialPyq);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPyq((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPyq((previous) => ({ ...previous, pdf: null }));
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setMessage({ type: "error", text: "Please select a valid PDF file." });
      e.target.value = "";
      setPyq((previous) => ({ ...previous, pdf: null }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "The PDF must be smaller than 10 MB.",
      });
      e.target.value = "";
      setPyq((previous) => ({ ...previous, pdf: null }));
      return;
    }

    setMessage({ type: "", text: "" });
    setPyq((previous) => ({ ...previous, pdf: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!pyq.pdf) {
      setMessage({
        type: "error",
        text: "Please upload the question paper PDF.",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", pyq.title.trim());
      formData.append("subject", pyq.subject.trim());
      formData.append("semester", pyq.semester);
      formData.append("branch", pyq.branch);
      formData.append("session_year", pyq.session_year.trim());
      formData.append("year", pyq.year.trim());
      formData.append("pdf", pyq.pdf);

      await axios.post(`${API_URL}/pyq`, formData);

      setMessage({
        type: "success",
        text: "Question paper added to the archives successfully!",
      });

      setPyq({ ...initialPyq });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("PYQ upload failed:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to upload the question paper. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cpyq-page">
      <div className="cpyq-background-mark" aria-hidden="true">
        ✦
      </div>

      <section className="cpyq-card">
        <header className="cpyq-header">
          <div className="cpyq-brand">
            <span className="cpyq-brand-icon">
              <Anchor size={22} />
            </span>
            <span>
              <strong>VEDORA</strong>
              <small>INSTITUTE OF TECHNOLOGY</small>
            </span>
          </div>

          <span className="cpyq-archive-label">
            <BookOpen size={14} />
            QUESTION ARCHIVES
          </span>
        </header>

        <div className="cpyq-heading">
          <div className="cpyq-heading-icon">
            <FileText size={28} />
          </div>
          <p className="cpyq-eyebrow">LEARN FROM THE VOYAGES BEFORE YOU</p>
          <h1>Upload Previous Year Questions</h1>
          <p className="cpyq-subtitle">
            Preserve past examination papers and help students prepare for
            their next academic adventure.
          </p>
        </div>

        {message.text && (
          <div
            className={`cpyq-alert ${
              message.type === "success"
                ? "cpyq-alert-success"
                : "cpyq-alert-error"
            }`}
            role="status"
          >
            {message.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <FileText size={18} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form className="cpyq-form" onSubmit={handleSubmit}>
          <div className="cpyq-field">
            <label htmlFor="cpyq-title">Question paper title</label>
            <input
              id="cpyq-title"
              type="text"
              name="title"
              placeholder="e.g. End Semester Examination"
              value={pyq.title}
              onChange={handleChange}
              maxLength={150}
              required
            />
          </div>

          <div className="cpyq-field">
            <label htmlFor="cpyq-subject">
              <BookOpen size={15} />
              Subject name
            </label>
            <input
              id="cpyq-subject"
              type="text"
              name="subject"
              placeholder="e.g. Database Management Systems"
              value={pyq.subject}
              onChange={handleChange}
              maxLength={120}
              required
            />
          </div>

          <div className="cpyq-form-row">
            <div className="cpyq-field">
              <label htmlFor="cpyq-semester">Semester</label>
              <select
                id="cpyq-semester"
                name="semester"
                value={pyq.semester}
                onChange={handleChange}
                required
              >
                <option value="">Choose semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                  <option key={semester} value={semester}>
                    Semester {semester}
                  </option>
                ))}
              </select>
            </div>

            <div className="cpyq-field">
              <label htmlFor="cpyq-branch">
                <GitBranch size={15} />
                Engineering branch
              </label>
              <select
                id="cpyq-branch"
                name="branch"
                value={pyq.branch}
                onChange={handleChange}
                required
              >
                <option value="">Choose branch</option>
                {branches.map((branch) => (
                  <option key={branch.code} value={branch.code}>
                    {branch.code} — {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="cpyq-form-row">
            <div className="cpyq-field">
              <label htmlFor="cpyq-session">
                <CalendarDays size={15} />
                Examination session
              </label>
              <input
                id="cpyq-session"
                type="text"
                name="session_year"
                placeholder="e.g. 2023-2024"
                value={pyq.session_year}
                onChange={handleChange}
                maxLength={30}
                required
              />
            </div>

            <div className="cpyq-field">
              <label htmlFor="cpyq-year">
                <Clock3 size={15} />
                Academic year / year of study
              </label>
              <input
                id="cpyq-year"
                type="text"
                name="year"
                placeholder="e.g. 2024 or 3rd Year"
                value={pyq.year}
                onChange={handleChange}
                maxLength={30}
                required
              />
            </div>
          </div>

          <div className="cpyq-field">
            <label htmlFor="cpyq-pdf">Question paper PDF</label>

            <label className="cpyq-upload" htmlFor="cpyq-pdf">
              <span className="cpyq-upload-icon">
                <FileUp size={25} />
              </span>

              <span className="cpyq-upload-copy">
                <strong>
                  {pyq.pdf ? pyq.pdf.name : "Choose your question paper"}
                </strong>
                <small>
                  {pyq.pdf
                    ? `${(pyq.pdf.size / (1024 * 1024)).toFixed(2)} MB · Ready to upload`
                    : "PDF format only · Maximum file size 10 MB"}
                </small>
              </span>

              <span className="cpyq-browse">Browse</span>
            </label>

            <input
              ref={fileInputRef}
              id="cpyq-pdf"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              required
              className="cpyq-file-input"
            />
          </div>

          <button
            className="cpyq-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="cpyq-spinner" />
                Uploading to archives...
              </>
            ) : (
              <>
                <Send size={18} />
                Upload Question Paper
              </>
            )}
          </button>
        </form>

        <footer className="cpyq-card-footer">
          <span>✦</span>
          Every past paper is a map to future success.
          <span>✦</span>
        </footer>
      </section>
    </main>
  );
};

export default CreatePYQ;