import { useEffect, useState } from "react";
import {
  Users,
  BellRing,
  BookOpen,
  FileText,
  TrendingUp,
  TrendingDown,
  Anchor,
  RefreshCw,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import "./admin-dashboard-pirate.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function StatCard({ title, value, icon: Icon, detail, trend = "up" }) {
  return (
    <article className="adash-stat-card">
      <div className="adash-stat-top">
        <span className="adash-stat-label">{title}</span>
        <span className="adash-stat-icon">
          <Icon size={22} />
        </span>
      </div>

      <div className="adash-stat-value">{value}</div>

      <div className="adash-stat-bottom">
        {trend === "down" ? (
          <TrendingDown size={16} />
        ) : (
          <TrendingUp size={16} />
        )}
        <span>{detail}</span>
      </div>
    </article>
  );
}

function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(null);
  const [studentError, setStudentError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchStudentCount = async () => {
    setRefreshing(true);
    setStudentError("");

    try {
      const response = await axios.get(`${API_URL}/api/students/count`);
      const count = response.data?.count;

      if (count === undefined || count === null) {
        throw new Error("The server response did not contain a student count.");
      }

      setTotalStudents(count);
    } catch (error) {
      console.error("Failed to fetch student count:", error);
      setStudentError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load the student count."
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudentCount();
  }, []);

  return (
    <main className="adash-page">
      <div className="adash-container">
        <header className="adash-welcome">
          <div className="adash-welcome-copy">
            <div className="adash-eyebrow">
              <Anchor size={15} />
              THE CAPTAIN'S COMMAND DECK
            </div>

            <h1>Dashboard Overview</h1>

            <p>
              Welcome aboard, Captain. Here's an overview of your institute's
              academic archives.
            </p>
          </div>

          <div className="adash-crest">
            <GraduationCap size={34} />
            <span>VEDORA</span>
            <small>INSTITUTE OF TECHNOLOGY</small>
          </div>
        </header>

        <section className="adash-status-bar">
          <div className="adash-status-left">
            <span className="adash-status-dot" />
            <span>Student statistics</span>
            <span className="adash-status-divider">/</span>
            <span className="adash-muted">Connected to archive server</span>
          </div>

          <button
            type="button"
            className="adash-refresh"
            onClick={fetchStudentCount}
            disabled={refreshing}
          >
            <RefreshCw
              size={15}
              className={refreshing ? "adash-spinning" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </section>

        {studentError && (
          <div className="adash-error" role="alert">
            <div>
              <strong>Student count unavailable</strong>
              <p>{studentError}</p>
            </div>
            <button
              type="button"
              onClick={fetchStudentCount}
              disabled={refreshing}
            >
              Try again
            </button>
          </div>
        )}

        <section className="adash-stats-grid" aria-label="Institute statistics">
          <StatCard
            title="Total Students"
            value={totalStudents === null ? "—" : totalStudents}
            icon={Users}
            detail={studentError ? "Unable to load" : "Live API count"}
          />

          <StatCard
            title="Notice Archive"
            value="156"
            icon={BellRing}
            detail="Sample figure"
          />

          <StatCard
            title="Syllabus Files"
            value="42"
            icon={BookOpen}
            detail="Sample figure"
          />

          <StatCard
            title="Study Notes"
            value="1,024"
            icon={FileText}
            detail="Sample figure"
          />
        </section>

        <section className="adash-lower-grid">
          <article className="adash-panel">
            <div className="adash-panel-heading">
              <div className="adash-panel-icon">
                <Anchor size={20} />
              </div>
              <div>
                <h2>Captain's Log</h2>
                <p>Your administrative overview</p>
              </div>
            </div>

            <div className="adash-log-entry">
              <span className="adash-log-marker" />
              <div>
                <strong>Student directory</strong>
                <p>
                  {totalStudents === null
                    ? "Waiting for the student count from the server."
                    : `The server reports ${totalStudents} students.`}
                </p>
              </div>
            </div>

            <div className="adash-log-entry">
              <span className="adash-log-marker" />
              <div>
                <strong>Academic archives</strong>
                <p>
                  Manage notices, syllabus documents, notes, and previous-year
                  question papers from your admin tools.
                </p>
              </div>
            </div>
          </article>

          <article className="adash-panel adash-security-panel">
            <div className="adash-security-icon">
              <ShieldCheck size={28} />
            </div>
            <p className="adash-eyebrow">ADMIN CONTROL</p>
            <h2>Keep the archives shipshape.</h2>
            <p className="adash-security-description">
              Keep academic resources organized and make sure students can
              access the latest learning materials.
            </p>
            <div className="adash-security-footer">
              <span className="adash-status-dot" />
              Student count endpoint configured
            </div>
          </article>
        </section>

        <footer className="adash-footer">
          <span>✦</span>
          VEDORA INSTITUTE OF TECHNOLOGY
          <span className="adash-footer-divider">·</span>
          KNOWLEDGE IS YOUR TREASURE
          <span>✦</span>
        </footer>
      </div>
    </main>
  );
}

export default AdminDashboard;