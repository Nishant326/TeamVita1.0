
import { useRef, useState } from "react";
import axios from "axios";
import {
  Anchor,
  FileText,
  Send,
  FileUp,
  GraduationCap,
  BookOpen,
  Layers,
  CheckCircle2,
} from "lucide-react";
import "./create-notes-pirate.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialNotes = {
  title: "",
  semester: "",
  branch: "",
  subject: "",
  pdf: null,
  unit: "",
};

const branches = [
  { code: "CSE", name: "Computer Science Engineering" },
  { code: "ECE", name: "Electronics and Communication Engineering" },
  { code: "EEE", name: "Electrical Engineering" },
  { code: "ME", name: "Mechanical Engineering" },
  { code: "CE", name: "Civil Engineering" },
];

export default function CreateNotes() {
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const pdfInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNotes((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a valid PDF file.");
      e.target.value = "";
      setNotes((prev) => ({ ...prev, pdf: null }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("PDF size must be 10 MB or less.");
      e.target.value = "";
      setNotes((prev) => ({ ...prev, pdf: null }));
      return;
    }

    setNotes((prev) => ({
      ...prev,
      pdf: file,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!notes.pdf) {
      setError("Please upload a notes PDF before submitting.");
      return;
    }

    const formData = new FormData();

    formData.append("title", notes.title.trim());
    formData.append("subject", notes.subject.trim());
    formData.append("semester", notes.semester);
    formData.append("branch", notes.branch);
    formData.append("unit", notes.unit.trim());
    formData.append("pdf", notes.pdf);

    try {
      setLoading(true);

      await axios.post(`${API_URL}/notes`, formData);

      setSuccess("Study notes created successfully!");
      setNotes({ ...initialNotes });

      if (pdfInputRef.current) {
        pdfInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Create notes error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create notes. Please check the server and try again."
      );
    } finally {
      setLoading(false);
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
            <h1>Knowledge Archives</h1>
            <p>
              Add study resources and help every student navigate their
              academic journey.
            </p>
          </div>
        </header>

        <div className="cn-section-title">
          <span className="cn-section-icon">
            <BookOpen size={21} />
          </span>

          <div>
            <h2>Create Study Notes</h2>
            <p>Enter the resource details and attach its PDF.</p>
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
          <div className="cn-field cn-full">
            <label htmlFor="notes-title">
              <FileText size={17} />
              Notes Title
            </label>

            <input
              id="notes-title"
              name="title"
              type="text"
              placeholder="e.g. Database Management System Notes"
              value={notes.title}
              onChange={handleChange}
              maxLength={200}
              required
            />
          </div>

          <div className="cn-field">
            <label htmlFor="semester">
              <GraduationCap size={17} />
              Semester
            </label>

            <select
              id="semester"
              name="semester"
              value={notes.semester}
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

          <div className="cn-field">
            <label htmlFor="branch">
              <GraduationCap size={17} />
              Engineering Branch
            </label>

            <select
              id="branch"
              name="branch"
              value={notes.branch}
              onChange={handleChange}
              required
            >
              <option value="">Choose branch</option>
              {branches.map((branch) => (
                <option key={branch.code} value={branch.code}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="cn-field">
            <label htmlFor="subject">
              <BookOpen size={17} />
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Enter subject name"
              value={notes.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cn-field">
            <label htmlFor="unit">
              <Layers size={17} />
              Unit
            </label>

            <input
              id="unit"
              name="unit"
              type="text"
              placeholder="e.g. Unit 1"
              value={notes.unit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cn-field cn-full">
            <label htmlFor="notes-pdf">
              <FileUp size={17} />
              Upload Notes PDF
            </label>

            <div className="cn-upload-area">
              <FileUp size={32} />

              <strong>
                {notes.pdf
                  ? notes.pdf.name
                  : "Choose your study material PDF"}
              </strong>

              <span>PDF format · Maximum 10 MB</span>

              <input
                ref={pdfInputRef}
                id="notes-pdf"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <div className="cn-guidance cn-full">
            <Anchor size={17} />
            <span>
              Check the branch, semester, subject, and unit before
              publishing.
            </span>
          </div>

          <button
            className="cn-submit cn-full"
            type="submit"
            disabled={loading}
          >
            <Send size={18} />
            {loading ? "Publishing Notes..." : "Publish Study Notes"}
          </button>
        </form>

        <footer className="cn-card-footer">
          <Anchor size={15} />
          <span>Knowledge is the compass to every destination.</span>
        </footer>
      </section>
    </main>
  );
}
