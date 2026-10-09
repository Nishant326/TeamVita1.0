import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Anchor,
  CalendarDays,
  FileText,
  FileUp,
  Send,
  GraduationCap,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import "./create-syllabus-pirate.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const branches = [
  "COMPUTER SCIENCE ENGINEERING",
  "MECHANICAL ENGINEERING",
  "ELECTRICAL ENGINEERING",
  "CIVIL ENGINEERING",
  "ELECTRICAL AND COMMUNICATION ENGINEERING",
];

const initialSyllabus = {
  title: "",
  semester: "",
  year: "",
  branch: "",
  pdf: null,
};

const CreateSyllabus = () => {
  const [syllabus, setSyllabus] = useState(initialSyllabus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSyllabus((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setSyllabus((previous) => ({ ...previous, pdf: null }));
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setMessage({ type: "error", text: "Please select a valid PDF file." });
      e.target.value = "";
      setSyllabus((previous) => ({ ...previous, pdf: null }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "The PDF must be smaller than 10 MB.",
      });
      e.target.value = "";
      setSyllabus((previous) => ({ ...previous, pdf: null }));
      return;
    }

    setMessage({ type: "", text: "" });
    setSyllabus((previous) => ({ ...previous, pdf: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!syllabus.pdf) {
      setMessage({ type: "error", text: "Please upload the syllabus PDF." });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", syllabus.title.trim());
      formData.append("semester", syllabus.semester);
      formData.append("year", syllabus.year.trim());
      formData.append("branch", syllabus.branch);
      formData.append("pdf", syllabus.pdf);

      await axios.post(`${API_URL}/syllabus`, formData);

      setMessage({
        type: "success",
        text: "Syllabus added to the archives successfully!",
      });

      setSyllabus({ ...initialSyllabus });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Syllabus upload failed:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Could not create the syllabus. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="csyl-page">
      <div className="csyl-background-mark" aria-hidden="true">
        ✦
      </div>

      <section className="csyl-card">
        <header className="csyl-header">
          <div className="csyl-brand">
            <span className="csyl-brand-icon">
              <Anchor size={22} />
            </span>
            <span>
              <strong>VEDORA</strong>
              <small>INSTITUTE OF TECHNOLOGY</small>
            </span>
          </div>

          <span className="csyl-archive-label">
            <BookOpen size={14} /> ACADEMIC ARCHIVES
          </span>
        </header>

        <div className="csyl-heading">
          <div className="csyl-heading-icon">
            <FileText size={28} />
          </div>
          <p className="csyl-eyebrow">CHART YOUR ACADEMIC JOURNEY</p>
          <h1>Create New Syllabus</h1>
          <p className="csyl-subtitle">
            Add a syllabus document to the institute&apos;s knowledge archive.
          </p>
        </div>

        {message.text && (
          <div
            className={`csyl-alert ${
              message.type === "success" ? "csyl-alert-success" : "csyl-alert-error"
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

        <form className="csyl-form" onSubmit={handleSubmit}>
          <div className="csyl-field">
            <label htmlFor="csyl-title">Syllabus title</label>
            <input
              id="csyl-title"
              type="text"
              name="title"
              placeholder="e.g. Data Structures and Algorithms"
              value={syllabus.title}
              onChange={handleChange}
              required
              maxLength={150}
            />
          </div>

          <div className="csyl-field">
            <label htmlFor="csyl-branch">Engineering branch</label>
            <select
              id="csyl-branch"
              name="branch"
              value={syllabus.branch}
              onChange={handleChange}
              required
            >
              <option value="">Choose your branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div className="csyl-form-row">
            <div className="csyl-field">
              <label htmlFor="csyl-semester">Semester</label>
              <select
                id="csyl-semester"
                name="semester"
                value={syllabus.semester}
                onChange={handleChange}
                required
              >
                <option value="">Select semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                  <option key={semester} value={semester}>
                    Semester {semester}
                  </option>
                ))}
              </select>
            </div>

            <div className="csyl-field">
              <label htmlFor="csyl-year">
                <CalendarDays size={15} /> Academic year
              </label>
              <input
                id="csyl-year"
                type="text"
                name="year"
                placeholder="e.g. 2026-27"
                value={syllabus.year}
                onChange={handleChange}
                required
                maxLength={20}
              />
            </div>
          </div>

          <div className="csyl-field">
            <label htmlFor="csyl-pdf">Syllabus document</label>
            <label className="csyl-upload" htmlFor="csyl-pdf">
              <span className="csyl-upload-icon">
                <FileUp size={25} />
              </span>
              <span className="csyl-upload-copy">
                <strong>
                  {syllabus.pdf ? syllabus.pdf.name : "Choose your PDF"}
                </strong>
                <small>
                  {syllabus.pdf
                    ? `${(syllabus.pdf.size / (1024 * 1024)).toFixed(2)} MB · Ready to upload`
                    : "PDF format only · Maximum file size 10 MB"}
                </small>
              </span>
              <span className="csyl-browse">Browse</span>
            </label>
            <input
              ref={fileInputRef}
              id="csyl-pdf"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              required
              className="csyl-file-input"
            />
          </div>

          <button className="csyl-submit" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="csyl-spinner" />
                Adding to archives...
              </>
            ) : (
              <>
                <Send size={18} />
                Create Syllabus
              </>
            )}
          </button>
        </form>

        <footer className="csyl-card-footer">
          <span>✦</span>
          Preserve knowledge. Empower the next generation.
          <span>✦</span>
        </footer>
      </section>
    </main>
  );
};

export default CreateSyllabus;