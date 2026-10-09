import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  GitBranch,
  CalendarDays,
  ArrowRight,
  RotateCcw,
  ScrollText,
  Compass,
  Anchor,
} from "lucide-react";
import "./notes-pirate.css";

function NotesSection() {
  const [formData, setFormData] = useState({
    branch: "",
    semester: "",
  });

  const [showResources, setShowResources] = useState(false);
  const [error, setError] = useState("");

  const branches = [
    { code: "CSE", name: "Computer Science Engineering" },
    { code: "ECE", name: "Electronics and Communication Engineering" },
    { code: "EEE", name: "Electrical Engineering" },
    { code: "ME", name: "Mechanical Engineering" },
    { code: "CE", name: "Civil Engineering" },
  ];

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.branch || !formData.semester) {
      setError("Choose your branch and semester before setting sail.");
      return;
    }

    setShowResources(true);
  };

  const handleReset = () => {
    setShowResources(false);
    setFormData({ branch: "", semester: "" });
    setError("");
  };

  const branchName =
    branches.find((branch) => branch.code === formData.branch)?.name ||
    formData.branch;

  return (
    <main className="pirate-notes-page">
      <div className="pirate-notes-shell">
        <header className="notes-heading">
          <div className="notes-heading-icon">
            <Compass size={27} />
          </div>

          <p className="notes-eyebrow">VEDORA KNOWLEDGE ARCHIVE</p>
          <h1>
            Chart Your <span>Learning Voyage</span>
          </h1>
          <p className="notes-subtitle">
            Choose your engineering branch and semester to discover
            lecture notes and previous-year question papers.
          </p>
        </header>

        {!showResources ? (
          <section className="notes-selection-card">
            <div className="notes-card-top">
              <ScrollText size={29} />
              <div>
                <h2>Choose Your Destination</h2>
                <p>Two quick selections unlock your study resources.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="notes-field">
                <label htmlFor="branch">
                  <GitBranch size={17} />
                  Engineering Branch
                </label>

                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChanges}
                >
                  <option value="">-- Choose Your Branch --</option>
                  {branches.map((branch) => (
                    <option key={branch.code} value={branch.code}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="notes-field">
                <label htmlFor="semester">
                  <CalendarDays size={17} />
                  Semester
                </label>

                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChanges}
                >
                  <option value="">-- Choose Your Semester --</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                    <option key={semester} value={semester}>
                      Semester {semester}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="notes-error" role="alert">
                  {error}
                </p>
              )}

              <button className="notes-submit-btn" type="submit">
                Discover Resources
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="notes-card-footer">
              <Anchor size={15} />
              Your next great discovery begins here.
            </div>
          </section>
        ) : (
          <section className="notes-results">
            <div className="notes-results-header">
              <div>
                <p className="notes-eyebrow">YOUR SELECTED DESTINATION</p>
                <h2>{formData.branch} Expedition</h2>
                <p className="notes-selected-detail">
                  {branchName} · Semester {formData.semester}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="notes-change-btn"
              >
                <RotateCcw size={16} />
                Change
              </button>
            </div>

            <div className="notes-resource-grid">
              <article className="notes-resource-card">
                <div className="notes-resource-icon notes-icon-blue">
                  <BookOpen size={30} />
                </div>

                <p className="notes-resource-tag">RESOURCE 01</p>
                <h3>Lecture Notes</h3>
                <p>
                  Explore chapter-wise study notes and learning materials
                  for your semester.
                </p>

                <Link
                  to={`/notes/${formData.branch}/${formData.semester}`}
                  className="notes-resource-link"
                >
                  Explore Notes
                  <ArrowRight size={17} />
                </Link>
              </article>

              <article className="notes-resource-card">
                <div className="notes-resource-icon notes-icon-red">
                  <ScrollText size={30} />
                </div>

                <p className="notes-resource-tag">RESOURCE 02</p>
                <h3>Previous Year Papers</h3>
                <p>
                  Prepare for examinations with previous-year question
                  papers and practice resources.
                </p>

                <Link
                  to={`/pyq/${formData.branch}/${formData.semester}`}
                  className="notes-resource-link"
                >
                  Explore PYQs
                  <ArrowRight size={17} />
                </Link>
              </article>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default NotesSection;