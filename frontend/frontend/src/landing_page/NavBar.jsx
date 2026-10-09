
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Anchor,
  Menu,
  X,
  Bell,
  UserRound,
  Compass,
} from "lucide-react";
import "./pirate-layout.css";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "About", path: "/about" },
  { label: "Notices", path: "/notice" },
  { label: "Study Materials", path: "/study_materials" },
  { label: "Toppers", path: "/topper" },
];

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasNewNotice, setHasNewNotice] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);

    if (location.pathname === "/notice") {
      setHasNewNotice(false);
      localStorage.setItem("lastViewedNotices", String(Date.now()));
    }
  }, [location.pathname]);

  useEffect(() => {
    let cancelled = false;

    async function checkNotices() {
      try {
        const response = await fetch(`${API_URL}/notice`);
        if (!response.ok) return;

        const result = await response.json();
        const notices = Array.isArray(result)
          ? result
          : result.notices || result.data || [];

        const latestTime = notices.reduce((latest, notice) => {
          const date = new Date(
            notice.created_at || notice.createdAt || 0
          ).getTime();

          return Number.isFinite(date)
            ? Math.max(latest, date)
            : latest;
        }, 0);

        const lastViewed = Number(
          localStorage.getItem("lastViewedNotices") || 0
        );

        if (!cancelled) {
          setHasNewNotice(latestTime > lastViewed && latestTime > 0);
        }
      } catch (error) {
        console.error("Unable to check notices:", error);
      }
    }

    checkNotices();

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  return (
    <header className="pirate-navbar">
      <div className="pirate-nav-container">
        <Link
          to="/home"
          className="pirate-brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="pirate-brand-icon">
            <Anchor size={27} />
          </span>

          <span className="pirate-brand-text">
            <strong>VEDORA</strong>
            <small>INSTITUTE OF TECHNOLOGY</small>
          </span>
        </Link>

        <button
          type="button"
          className="pirate-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav
          className={`pirate-navbar-collapse ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <div className="pirate-nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/home"}
                className={({ isActive }) =>
                  `pirate-nav-link ${isActive ? "active-link" : ""}`
                }
              >
                {item.label}

                {item.path === "/notice" && hasNewNotice && (
                  <span
                    className="pirate-notice-dot"
                    aria-label="New notices"
                  />
                )}
              </NavLink>
            ))}
          </div>

          <div className="pirate-nav-actions">
            <span className="pirate-nav-divider" />

            <Link
              to="/profile"
              className={`pirate-profile-button ${
                location.pathname.startsWith("/profile")
                  ? "active-link"
                  : ""
              }`}
            >
              <UserRound size={17} />
              <span>My Profile</span>
            </Link>

            <span className="pirate-compass">
              <Compass size={24} />
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
