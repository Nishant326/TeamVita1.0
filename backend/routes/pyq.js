
const express = require("express");
const router = express.Router();
const upload = require("../upload/pyqUpload");
const db = require("../DbConfig/db");

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const { title, subject, semester, branch, session_year, year } = req.body;

    if (!title || !subject || !semester || !branch || !session_year || !year) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "PDF not uploaded" });
    }

    const filePath = `/uploads/pyq/${req.file.filename}`;

    await db.query(
      `INSERT INTO pyq 
       (title, subject, semester, branch, session_year, year, file_path)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        subject.trim(),
        Number(semester),
        branch.trim(),
        Number(session_year),
        Number(year),
        filePath
      ]
    );

    res.status(201).json({ message: "PYQ created successfully" });
  } catch (err) {
    console.error("PYQ error:", err);
    res.status(500).json({ error: err.message });
  }
});



router.get("/:branchName/:semester", async (req, res) => {
  try {
    const { branchName, semester } = req.params;
    console.log(branchName,semester);

    // FIX: Use '?' placeholders and pass variables in an array as the second argument
    const [rows] = await db.query(
      "SELECT * FROM pyq WHERE branch = ? AND semester = ?", 
      [branchName, semester]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No pyq found" });
    }

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;