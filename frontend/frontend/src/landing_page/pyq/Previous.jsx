import "../home/style.css";
import React, { useState } from "react";

function Previous() {
  const [branch, setBranch] = useState("");
  const branches = ["CSE", "ECE", "EEE", "ME", "CE", "IT"];

  return (
    <section className=" mt-5">
      <h2 className="text-center mb-4" style={{ color: "#003366" }}>
        Previous Year Questions
      </h2>

      <div className="d-flex justify-content-center shadow-lg border-1 rounded-4 mx-auto mt-5" style={{ maxWidth: "400px" }} >
        <select
          className="form-select2"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          <option value="">-- Select Your Branch --</option>
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {branch && (
        <div className="text-center mt-4">
          <h5>Showing papers for: {branch}</h5>
          {/* You can fetch or display PDFs here */}
        </div>
      )}
    </section>
  );
}

export default Previous;
