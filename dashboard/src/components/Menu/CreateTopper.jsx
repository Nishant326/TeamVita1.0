
import { useState, useRef } from "react";
import { FileText, Send, FileUp, Anchor, Trophy } from "lucide-react";
import axios from "axios";
import "./create-topper-pirate.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialTopper = {
  name: "",
  branch: "",
  semester: "",
  year: "",
  rankNum: "",
  percentage: "",
  image: null,
};

const branches = [
  { code: "CSE", name: "Computer Science Engineering" },
  { code: "ECE", name: "Electronics and Communication Engineering" },
  { code: "EEE", name: "Electrical Engineering" },
  { code: "ME", name: "Mechanical Engineering" },
  { code: "CE", name: "Civil Engineering" },
];

const years = ["2023", "2024", "2025", "2026", "2027", "2028", "2029"];

export default function CreateTopper() {
  const [topper, setTopper] = useState(initialTopper);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const photoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopper((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please upload a JPEG or PNG image.");
      e.target.value = "";
      setTopper((prev) => ({ ...prev, image: null }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      e.target.value = "";
      setTopper((prev) => ({ ...prev, image: null }));
      return;
    }

    setTopper((prev) => ({ ...prev, image: file }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!topper.image) {
      setError("Please select a topper photo.");
      return;
    }

    const percentage = Number(topper.percentage);

    if (percentage < 0 || percentage > 100) {
      setError("Percentage must be between 0 and 100.");
      return;
    }

    const formData = new FormData();
    formData.append("name", topper.name.trim());
    formData.append("branch", topper.branch);
    formData.append("semester", topper.semester);
    formData.append("year", topper.year);
    formData.append("rankNum", topper.rankNum);
    formData.append("percentage", topper.percentage);
    formData.append("image", topper.image);

    try {
      setLoading(true);

      await axios.post(`${API_URL}/topper`, formData);

      setSuccess("Topper created successfully!");
      setTopper({ ...initialTopper });

      if (photoRef.current) {
        photoRef.current.value = "";
      }
    } catch (err) {
      console.error("Topper creation failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create topper. Check your backend and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ct-page">
      <section className="ct-card">
        <header className="ct-header">
          <div className="ct-emblem">
            <Anchor size={28} />
          </div>
          <div>
            <span className="ct-eyebrow">
              VEDORA INSTITUTE OF TECHNOLOGY
            </span>
            <h1>Honor the Achievers</h1>
            <p>Add a student to the academic Hall of Fame.</p>
          </div>
          <Trophy className="ct-trophy" size={38} />
        </header>

        <div className="ct-section-heading">
          <FileText size={21} />
          <div>
            <h2>Create Topper Record</h2>
            <p>Enter the student's academic details.</p>
          </div>
        </div>

        {error && <div className="ct-alert ct-error">{error}</div>}
        {success && <div className="ct-alert ct-success">{success}</div>}

        <form className="ct-form" onSubmit={handleSubmit}>
          <div className="ct-field ct-full">
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter topper name"
              value={topper.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ct-field">
            <label htmlFor="branch">Engineering Branch</label>
            <select
              id="branch"
              name="branch"
              value={topper.branch}
              onChange={handleChange}
              required
            >
              <option value="">Choose branch</option>
              {branches.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="ct-field">
            <label htmlFor="semester">Semester</label>
            <select
              id="semester"
              name="semester"
              value={topper.semester}
              onChange={handleChange}
              required
            >
              <option value="">Choose semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>

          <div className="ct-field">
            <label htmlFor="year">Academic Year</label>
            <select
              id="year"
              name="year"
              value={topper.year}
              onChange={handleChange}
              required
            >
              <option value="">Choose year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="ct-field">
            <label htmlFor="rankNum">Rank</label>
            <input
              id="rankNum"
              name="rankNum"
              type="number"
              min="1"
              placeholder="Enter rank"
              value={topper.rankNum}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ct-field">
            <label htmlFor="percentage">Percentage (%)</label>
            <input
              id="percentage"
              name="percentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="Enter percentage"
              value={topper.percentage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ct-field ct-full">
            <label htmlFor="photoInput">
              <FileUp size={18} /> Upload Topper Photo
            </label>
            <div className="ct-upload">
              <input
                ref={photoRef}
                id="photoInput"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                required
              />
              <small>JPEG or PNG · Maximum 5 MB</small>
              {topper.image && (
                <p className="ct-file-name">{topper.image.name}</p>
              )}
            </div>
          </div>

          <button
            className="ct-submit ct-full"
            type="submit"
            disabled={loading}
          >
            <Send size={18} />
            {loading ? "Publishing..." : "Create Topper"}
          </button>
        </form>

        <footer className="ct-footer">
          <Anchor size={15} />
          Excellence deserves recognition.
        </footer>
      </section>
    </main>
  );
}
