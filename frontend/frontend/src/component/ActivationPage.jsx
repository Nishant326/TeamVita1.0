import React, { useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const ActivationPage = () => {
  const [formData, setFormData] = useState({
    roll_no: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = "http://localhost:3000/auth/activate";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActivation = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!", { position: "top-center" });
    }

    setLoading(true);

    try {
      // Axios call
      const response = await axios.post(
        API_URL,
        {
          roll_no: formData.roll_no,
          email: formData.email,
          dob: formData.dob,
          password: formData.password
        },
        {
          headers: { "Content-Type": "application/json" },
          // Usually activation doesn't need session cookies, but consistent usage is fine
          withCredentials: true 
        }
      );

      if (response.status === 200) {
        toast.success("Account Activated! Please Login.", { position: "top-center" });
        navigate("/login");
      }

    } catch (err) {
      console.error("Activation Error:", err);
      const errorMessage = err.response?.data?.message || "Activation failed";
      toast.error(errorMessage, { position: "bottom-center" });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700", color: "#06367aff" }}>
          Account Activation
        </h3>
        <p className="text-center text-muted small mb-4">
          Verify your identity to set up your password.
        </p>

        <form onSubmit={handleActivation}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-muted small">Roll Number</label>
              <input type="text" name="roll_no" className="form-control" placeholder="Ex: 210505" onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label text-muted small">Date of Birth</label>
              <input type="date" name="dob" className="form-control" onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small">Registered Email</label>
            <input type="email" name="email" className="form-control" placeholder="student@college.edu" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small">Create Password</label>
            <input type="password" name="password" className="form-control" placeholder="Min 6 chars" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" placeholder="Re-enter password" onChange={handleChange} required />
          </div>

          <button disabled={loading} className="btn btn-success w-100 mb-3">
            {loading ? "Activating..." : "Activate Account"}
          </button>

          <p className="text-center mb-0">
            Already activated? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ActivationPage;