import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  Anchor,
  Compass,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import "./login-pirate.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Login successful!", {
          position: "top-center",
        });
        navigate("/home");
      }
    } catch (err) {
      console.error("Login Error:", err);

      const errorMessage =
        err.response?.data?.message || "Login failed";

      toast.error(errorMessage, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-pirate-page">
      <div className="login-pirate-decoration login-decoration-one">
        ✦
      </div>
      <div className="login-pirate-decoration login-decoration-two">
        ✧
      </div>

      <section className="login-pirate-card">
        <header className="login-pirate-header">
          <div className="login-pirate-brand">
            <span className="login-pirate-anchor">
              <Anchor size={27} />
            </span>
            <div>
              <h2>VEDORA</h2>
              <p>INSTITUTE OF TECHNOLOGY</p>
            </div>
          </div>

          <span className="login-pirate-emblem">
            <Compass size={20} />
          </span>
        </header>

        <div className="login-pirate-content">
          <div className="login-pirate-logo">
            <img
              src="/media/images/TILOGO.png"
              alt="Vedora Institute logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <Anchor size={31} />
          </div>

          <p className="login-pirate-eyebrow">
            YOUR ACADEMIC VOYAGE BEGINS HERE
          </p>

          <h1>Welcome Aboard</h1>

          <p className="login-pirate-description">
            Sign in to access your student portal and discover your
            academic resources.
          </p>

          <form className="login-pirate-form" onSubmit={handleLogin}>
            <div className="login-pirate-field">
              <label htmlFor="login-email">Email Address</label>

              <div className="login-pirate-input-wrap">
                <Mail size={18} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-pirate-field">
              <label htmlFor="login-password">Password</label>

              <div className="login-pirate-input-wrap">
                <LockKeyhole size={18} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="login-pirate-password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-pirate-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="login-pirate-spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  <Anchor size={18} />
                  Sign In to Your Portal
                </>
              )}
            </button>
          </form>

          <div className="login-pirate-divider">
            <span />
            <Anchor size={15} />
            <span />
          </div>

          <div className="login-pirate-activation">
            <p>First time navigating with us?</p>
            <Link to="/activate">Activate Your Account ↗</Link>
          </div>

          <div className="login-pirate-security">
            <ShieldCheck size={16} />
            Secure access to your academic portal
          </div>
        </div>

        <footer className="login-pirate-footer">
          <span>✦</span>
          KNOWLEDGE IS YOUR TREASURE
          <span>✦</span>
        </footer>
      </section>

      <p className="login-pirate-copyright">
        © Vedora Institute of Technology
      </p>
    </main>
  );
};

export default LoginPage;