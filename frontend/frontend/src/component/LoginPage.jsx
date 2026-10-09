import React, { useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = "http://localhost:3000/auth/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Axios call
      const response = await axios.post(
        API_URL,
        { email, password }, // Data payload (no JSON.stringify needed)
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // IMPORTANT: Enables cookies for Passport.js session
        }
      );

      // If code reaches here, status is 2xx (Success)
      if (response.status === 200) {
        toast.success("Login Successful!", { position: "top-center" });
        navigate("/home");
      }

    } catch (err) {
      // Axios throws error for 4xx/5xx responses
      console.error("Login Error:", err);
      
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage, { position: "bottom-center" });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "420px" }}>
        <h3 className="text-center mb-3" style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700", color: "#06367aff" }}>
          <img src="public/media/images/TILOGO.png" alt="" style={{ height: "35px", width: "35px", marginRight: "10px" }} />
          Student Login
        </h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-muted">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Password</label>
            <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button disabled={loading} className="btn btn-outline-primary w-100">
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-3">
            <p className="text-muted small mb-1">First time here?</p>
            <Link to="/activate" style={{ textDecoration: "none", fontWeight: "600" }}>Activate Your Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;