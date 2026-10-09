import { useEffect, useState } from "react";
import axios from "axios";
import {
  Anchor,
  Bell,
  CalendarDays,
  Download,
  Eye,
  FileText,
  LoaderCircle,
  RefreshCw,
  ScrollText,
} from "lucide-react";

import "./style2.css";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

function Hero() {
  const [noticeData, setNoticeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${BASE_URL}/notice`);

        if (!Array.isArray(response.data)) {
          throw new Error("Unexpected notice response format.");
        }

        if (!cancelled) {
          setNoticeData(response.data);
        }
      } catch (err) {
        console.error("Error fetching notices:", err);

        if (!cancelled) {
          setError(
            "The captain's dispatches could not be retrieved. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchNotices();

    return () => {
      cancelled = true;
    };
  }, []);

  const deriveCategory = (title = "") => {
    const value = title.toLowerCase();

    if (
      value.includes("exam") ||
      value.includes("schedule") ||
      value.includes("routine")
    ) {
      return "Examination";
    }

    if (
      value.includes("holiday") ||
      value.includes("closed") ||
      value.includes("vacation") ||
      value.includes("jayanti") ||
      value.includes("puja")
    ) {
      return "Holiday";
    }

    if (value.includes("result") || value.includes("marks")) {
      return "Results";
    }

    if (
      value.includes("scholarship") ||
      value.includes("form") ||
      value.includes("admission")
    ) {
      return "Administration";
    }

    return "General Notice";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getPdfUrl = (pdfPath) => {
    if (
      typeof pdfPath !== "string" ||
      !pdfPath.trim()
    ) {
      return null;
    }

    // Support absolute URLs as well as backend-relative file paths.
    if (/^https?:\/\//i.test(pdfPath)) {
      return pdfPath;
    }

    return `${BASE_URL.replace(/\/+$/, "")}/${pdfPath
      .replace(/^\/+/, "")}`;
  };

  return (
    <main className="bottle-notices">
      {/* Page introduction */}
      <section className="bottle-hero">
        <div className="bottle-hero-overlay" />

        <div className="bottle-hero-content">
          <span className="bottle-eyebrow">
            <Anchor size={17} />
            THE CAPTAIN'S DISPATCHES
          </span>

          <h1>Academy Announcements</h1>

          <p>
            Important announcements from the academy, delivered
            across the seven seas. Open a bottle and discover
            what's happening.
          </p>

          <a href="#bottle-list" className="bottle-hero-button">
            <ScrollText size={18} />
            Read the Dispatches
          </a>
        </div>
      </section>

      {/* Notice listing */}
      <section className="bottle-list-section" id="bottle-list">
        <div className="bottle-container">
          <div className="bottle-section-heading">
            <div>
              <span className="bottle-section-kicker">
                <Bell size={16} />
                FROM THE CAPTAIN'S DESK
              </span>

              <h2>Latest Dispatches</h2>

              <p>
                Stay informed about examinations, holidays,
                results and academy announcements.
              </p>
            </div>

            {!loading && !error && (
              <span className="bottle-count">
                {noticeData.length}{" "}
                {noticeData.length === 1 ? "dispatch" : "dispatches"}
              </span>
            )}
          </div>

          {loading && (
            <div className="bottle-state" role="status">
              <LoaderCircle
                className="bottle-spinner"
                size={35}
              />
              <h3>Searching the seas...</h3>
              <p>The captain's dispatches are on their way.</p>
            </div>
          )}

          {!loading && error && (
            <div className="bottle-state bottle-error" role="alert">
              <Bell size={34} />
              <h3>Dispatch unavailable</h3>
              <p>{error}</p>

              <button
                type="button"
                className="bottle-retry-button"
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={16} />
                Reload page
              </button>
            </div>
          )}

          {!loading && !error && noticeData.length === 0 && (
            <div className="bottle-state">
              <ScrollText size={38} />
              <h3>No messages have arrived</h3>
              <p>
                The sea is quiet for now. Check again later
                for new academy announcements.
              </p>
            </div>
          )}

          {!loading && !error && noticeData.length > 0 && (
            <div className="bottle-grid">
              {noticeData.map((notice, index) => {
                const category = deriveCategory(notice.title);
                const pdfUrl = getPdfUrl(notice.pdf_path);

                return (
                  <article
                    className="bottle-card"
                    key={
                      notice.id ??
                      notice._id ??
                      `${notice.title}-${index}`
                    }
                  >
                    <div className="bottle-card-top">
                      <div className="bottle-icon">
                        <FileText size={25} />
                      </div>

                      <span
                        className={`bottle-category bottle-category-${category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {category}
                      </span>
                    </div>

                    <div className="bottle-card-content">
                      <span className="bottle-card-label">
                        ACADEMY ANNOUNCEMENT
                      </span>

                      <h3>{notice.title || "Untitled dispatch"}</h3>

                      <p className="bottle-date">
                        <CalendarDays size={16} />
                        {formatDate(
                          notice.created_at ?? notice.createdAt
                        )}
                      </p>
                    </div>

                    <div className="bottle-card-actions">
                      {pdfUrl ? (
                        <>
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bottle-action bottle-action-outline"
                          >
                            <Eye size={17} />
                            View
                          </a>

                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="bottle-action bottle-action-primary"
                          >
                            <Download size={17} />
                            Download
                          </a>
                        </>
                      ) : (
                        <p className="bottle-missing-pdf">
                          No document attached to this dispatch.
                        </p>
                      )}
                    </div>

                    <div
                      className="bottle-card-decoration"
                      aria-hidden="true"
                    />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Hero;