
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Anchor, Eye, EyeOff, ShieldCheck } from "lucide-react";
import "./activation-pirate.css";

const ActivationPage = () => {
  const [formData, setFormData] = useState({
    roll_no: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const API_URL =
    `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/activate`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleActivation = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!", {
        position: "top-center",
      });
    }

    setLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          roll_no: formData.roll_no,
          email: formData.email,
          dob: formData.dob,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Account Activated! Please Login.", {
          position: "top-center",
        });
        navigate("/login");
      }
    } catch (err) {
      console.error("Activation Error:", err);

      const errorMessage =
        err.response?.data?.message || "Activation failed";

      toast.error(errorMessage, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="activation-pirate-page">
      <div className="activation-pirate-stars" aria-hidden="true" />

      <section className="activation-pirate-card">
        <Link to="/login" className="activation-pirate-back">
          ← Back to Login
        </Link>

        <div className="activation-pirate-brand">
          <div className="activation-pirate-emblem">
            <Anchor size={27} />
          </div>

          <div>
            <span className="activation-pirate-brand-name">
              VEDORA
            </span>
            <span className="activation-pirate-brand-subtitle">
              INSTITUTE OF TECHNOLOGY
            </span>
          </div>
        </div>

        <div className="activation-pirate-heading">
          <span className="activation-pirate-eyebrow">
            YOUR JOURNEY BEGINS HERE
          </span>

          <h1>Activate Your Account</h1>

          <p>
            Verify your identity and set sail with your student account.
          </p>
        </div>

        <div className="activation-pirate-notice">
          <ShieldCheck size={21} />
          <span>
            Use the details registered with your institute to verify
            your identity.
          </span>
        </div>

        <form onSubmit={handleActivation}>
          <div className="activation-pirate-row">
            <div className="activation-pirate-field">
              <label htmlFor="activation-roll">Roll Number</label>
              <input
                id="activation-roll"
                type="text"
                name="roll_no"
                placeholder="Enter roll number"
                value={formData.roll_no}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            <div className="activation-pirate-field">
              <label htmlFor="activation-dob">Date of Birth</label>
              <input
                id="activation-dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="activation-pirate-field">
            <label htmlFor="activation-email">Registered Email</label>
            <input
              id="activation-email"
              type="email"
              name="email"
              placeholder="student@college.edu"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="activation-pirate-field">
            <label htmlFor="activation-password">Create Password</label>
            <div className="activation-pirate-password">
              <input
                id="activation-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
              />

              <button
                type="button"
                className="activation-pirate-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div className="activation-pirate-field">
            <label htmlFor="activation-confirm-password">
              Confirm Password
            </label>

            <div className="activation-pirate-password">
              <input
                id="activation-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
              />

              <button
                type="button"
                className="activation-pirate-eye"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="activation-pirate-submit"
            disabled={loading}
          >
            {loading ? "Activating Account..." : "Activate Account"}
            {!loading && <Anchor size={18} />}
          </button>
        </form>

        <p className="activation-pirate-login">
          Already activated? <Link to="/login">Login here</Link>
        </p>

        <div className="activation-pirate-footer">
          <span>✦</span> KNOWLEDGE IS YOUR TREASURE <span>✦</span>
        </div>
      </section>
    </main>
  );
};

export default ActivationPage