
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  UserRound,
  Mail,
  CalendarDays,
  GraduationCap,
  Hash,
  IdCard,
  LogOut,
  Compass,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import "./profile-pirate.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
          signal: controller.signal,
        });

        const user = response.data?.user ?? response.data;

        if (!user || typeof user !== "object") {
          throw new Error("User information was not returned.");
        }

        setUserDetails(user);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error("Session expired. Please log in again.");
          navigate("/login", { replace: true });
          return;
        }

        console.error("Error fetching profile:", err);
        setError("We couldn't load your profile. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();

    return () => controller.abort();
  }, [navigate]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      toast.success("Logged out successfully.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
      setLoggingOut(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "Not provided";

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="pirate-profile-page">
        <div className="pirate-profile-state">
          <div className="pirate-profile-spinner" />
          <p>Opening your captain's log...</p>
        </div>
      </main>
    );
  }

  if (error || !userDetails) {
    return (
      <main className="pirate-profile-page">
        <div className="pirate-profile-state">
          <Compass size={40} />
          <h2>Profile unavailable</h2>
          <p>{error || "No student information was found."}</p>
          <button
            className="pirate-profile-retry"
            onClick={() => window.location.reload()}
          >
            <RotateCcw size={16} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  const name = userDetails.name || "Student";
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  const branch = userDetails.branch || "Not provided";
  const semester = userDetails.semester ?? "Not provided";

  const details = [
    {
      label: "Registration Number",
      value: userDetails.reg_no || "Not provided",
      icon: <IdCard size={19} />,
    },
    {
      label: "Class / Roll Number",
      value: userDetails.roll_no || "Not provided",
      icon: <Hash size={19} />,
    },
    {
      label: "Email Address",
      value: userDetails.email || "Not provided",
      icon: <Mail size={19} />,
    },
    {
      label: "Date of Birth",
      value: formatDate(userDetails.dob),
      icon: <CalendarDays size={19} />,
    },
    {
      label: "Engineering Branch",
      value: branch,
      icon: <GraduationCap size={19} />,
    },
    {
      label: "Current Semester",
      value: String(semester),
      icon: <Compass size={19} />,
    },
  ];

  return (
    <main className="pirate-profile-page">
      <div className="pirate-profile-shell">
        <header className="pirate-profile-heading">
          <div className="pirate-profile-emblem">
            <Compass size={27} />
          </div>
          <p className="pirate-profile-eyebrow">VEDORA STUDENT PORTAL</p>
          <h1>Your <span>Captain's Log</span></h1>
          <p>One place for your student identity and academic details.</p>
        </header>

        <section className="pirate-profile-card">
          <div className="pirate-profile-banner">
            <div className="pirate-profile-avatar">
              {initial}
            </div>

            <div className="pirate-profile-identity">
              <span className="pirate-profile-badge">
                <ShieldCheck size={14} />
                Registered Student
              </span>

              <h2>{name}</h2>
              <p>
                {branch} · Semester {semester}
              </p>
            </div>
          </div>

          <div className="pirate-profile-content">
            <div className="pirate-profile-section-title">
              <UserRound size={20} />
              <div>
                <h3>Student Information</h3>
                <p>Your registered academic details</p>
              </div>
            </div>

            <div className="pirate-profile-details">
              {details.map((item) => (
                <div className="pirate-profile-detail" key={item.label}>
                  <div className="pirate-profile-detail-icon">
                    {item.icon}
                  </div>

                  <div className="pirate-profile-detail-text">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="pirate-profile-footer">
              <div className="pirate-profile-security">
                <ShieldCheck size={18} />
                <span>Keep your account credentials private.</span>
              </div>

              <button
                type="button"
                className="pirate-profile-logout"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                <LogOut size={17} />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </section>

        <p className="pirate-profile-note">
          Navigate wisely. Learn boldly. Build your legacy.
        </p>
      </div>
    </main>
  );
};

export default Profile;
