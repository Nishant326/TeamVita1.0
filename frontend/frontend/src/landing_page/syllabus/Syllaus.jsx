import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "motion/react";

export default function Syllabus() {
  const { branchName } = useParams();
  const [syllabusData, setSyllabusData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/syllabus/${branchName}`).then((res) => {
      setSyllabusData(res.data);
      console.log(res.data);
    });
  }, []);

  return syllabusData.map((item) => {
    return (
      <div className="container d-flex justify-content-center  mt-3">
        <motion.div
          className="p-4 rounded-4 bg-white"
          whileHover={{
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
          style={{
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <h3 className="fw-bold text-dark mb-2">{item.title}</h3>

          <p className="text-secondary mb-4">
            Download the complete syllabus PDF for {item.branch}.
          </p>

          {/* PDF Card */}
          <div
            className="p-3 border rounded-3 d-flex justify-content-between align-items-center"
            style={{ background: "#f8f9fa" }}
          >
            <div>
              <h6 className="mb-1 fw-semibold">Syllabus PDF</h6>
              <small className="text-muted">Click to View</small>
            </div>

            <a
              href={`http://localhost:3000${item.pdf_path}`}
              target="_blank"
              download
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <i className="bi bi-file-earmark-arrow-down"></i>
              View
            </a>
          </div>
        </motion.div>
      </div>
    );
  });
}
