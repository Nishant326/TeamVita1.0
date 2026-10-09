import { useEffect, useState } from "react";
import axios from "axios";
import {
  Trophy,
  Award,
  Medal,
  Crown,
  Compass,
  RotateCcw,
} from "lucide-react";
import "./topper-pirate.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

function MainTopper() {
  const [topperData, setTopperData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchToppers() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`${API_URL}/topper`, {
          signal: controller.signal,
        });

        const data = response.data;
        const items = Array.isArray(data)
          ? data
          : data?.toppers || data?.data || [];

        setTopperData(Array.isArray(items) ? items : []);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError(
            err.response?.data?.message ||
              "Unable to load the academic toppers."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchToppers();

    return () => controller.abort();
  }, []);

  const getImageUrl = (topper) => {
    const image =
      topper.file_path ||
      topper.filePath ||
      topper.img ||
      topper.image;

    if (!image) return "";

    if (/^https?:\/\//i.test(image)) return image;

    return `${API_URL}/${image.replace(/^\/+/, "")}`;
  };

  const getRank = (topper, index) =>
    Number(topper.rankNum ?? topper.rank ?? index + 1);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown size={17} />;
    if (rank === 2) return <Medal size={17} />;
    if (rank === 3) return <Trophy size={17} />;
    return <Award size={17} />;
  };

  const getRankClass = (rank) => {
    if (rank === 1) return "rank-gold";
    if (rank === 2) return "rank-silver";
    if (rank === 3) return "rank-bronze";
    return "rank-default";
  };

  return (
    <main className="pirate-toppers-page">
      <div className="pirate-toppers-shell">
        <header className="pirate-toppers-heading">
          <div className="pirate-toppers-emblem">
            <Trophy size={30} />
          </div>

          <p className="pirate-toppers-eyebrow">
            THE HALL OF EXCELLENCE
          </p>

          <h1>
            Academic <span>Treasures</span>
          </h1>

          <p className="pirate-toppers-subtitle">
            Celebrating the brilliant minds navigating their way
            toward academic success at Vedora Institute of Technology.
          </p>

          <div className="pirate-toppers-divider">
            <span />
            <Compass size={17} />
            <span />
          </div>
        </header>

        {loading ? (
          <div className="pirate-toppers-state">
            <div className="pirate-toppers-spinner" />
            <p>Opening the Hall of Excellence...</p>
          </div>
        ) : error ? (
          <div className="pirate-toppers-state">
            <Trophy size={35} />
            <h2>Could not load the toppers</h2>
            <p>{error}</p>
            <button
              className="pirate-toppers-retry"
              onClick={() => window.location.reload()}
            >
              <RotateCcw size={16} /> Try again
            </button>
          </div>
        ) : topperData.length === 0 ? (
          <div className="pirate-toppers-state">
            <Award size={40} />
            <h2>No toppers announced yet</h2>
            <p>Academic achievements will appear here when available.</p>
          </div>
        ) : (
          <section className="pirate-toppers-grid">
            {topperData.map((topper, index) => {
              const rank = getRank(topper, index);
              const imageUrl = getImageUrl(topper);
              const name = topper.name || topper.namе || "Student";
              const percentage =
                topper.percentage ?? topper.percentagе;

              return (
                <article
                  className="pirate-topper-card"
                  key={topper._id || topper.id || index}
                >
                  <div className="pirate-topper-image-wrap">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={name}
                        className="pirate-topper-image"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="pirate-topper-image-placeholder">
                        <Award size={48} />
                      </div>
                    )}

                    <div
                      className={`pirate-topper-rank ${getRankClass(rank)}`}
                    >
                      {getRankIcon(rank)}
                      <span>Rank {rank}</span>
                    </div>
                  </div>

                  <div className="pirate-topper-body">
                    <p className="pirate-topper-label">
                      {rank === 1
                        ? "CAPTAIN OF THE CLASS"
                        : rank === 2
                          ? "FIRST MATE"
                          : rank === 3
                            ? "BRONZE ACHIEVER"
                            : "HONOUR ROLL"}
                    </p>

                    <h2>{name}</h2>

                    <p className="pirate-topper-branch">
                      {topper.branch || "Engineering"}
                    </p>

                    <p className="pirate-topper-semester">
                      Semester {topper.semester ?? "—"}
                    </p>

                    <div className="pirate-topper-score">
                      <Award size={22} />
                      <div>
                        <span>Academic Score</span>
                        <strong>
                          {percentage != null
                            ? `${String(percentage).replace(/%$/, "")}%`
                            : "Not provided"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default MainTopper;