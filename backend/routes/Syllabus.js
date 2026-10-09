
// CREATE SYLLABUS
const express = require("express");
const router = express.Router();
const upload = require("../upload/syllabusUpload");
const db = require("../DbConfig/db"); // mysql pool

// CREATE SYLLABUS
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "PDF not uploaded" });
    }

    const { title, semester, year, branch } = req.body;

    if (!title || !semester || !year || !branch) {
      return res.status(400).json({
        error: "Missing fields: title, semester, year, or branch",
      });
    }

    const pdfPath = `/uploads/syllabus/${req.file.filename}`;

    const [result] = await db.query(
      `INSERT INTO syllabus 
       (title, semester, year, branch, pdf_path) 
       VALUES (?, ?, ?, ?, ?)`,
      [title.trim(), semester.trim(), year, branch.trim(), pdfPath]
    );

    res.status(201).json({
      message: "Syllabus added successfully",
      syllabusId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// GET SYLLABUS BY branch
router.get("/:branchName", async (req, res) => {
  try {
    const { branchName } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM syllabus WHERE branch = ? ORDER BY created_at DESC",
      [branchName]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No syllabus found for this branch" });
    }

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching syllabus:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;