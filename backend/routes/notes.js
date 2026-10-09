const express = require("express");
const router = express.Router();
const upload = require("../upload/notesUpload");
const db = require("../DbConfig/db");

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const { title, subject, semester, branch, unit } = req.body;

    if (!title || !subject || !semester || !branch || !unit) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "PDF not uploaded" });
    }

    const filePath = `/uploads/notes/${req.file.filename}`;

    await db.query(
      `INSERT INTO notes 
       (title, subject, semester, branch, file_path,unit) 
       VALUES (?, ?, ?, ?, ?,?)`,
      [title.trim(), subject.trim(), semester, branch.trim(), filePath,unit]
    );

    res.status(201).json({
      message: "Notes created successfully",
    });
  } catch (err) {
    console.error("Notes error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:branchName/:semester", async (req, res) => {
  try {
    const { branchName, semester } = req.params;
    console.log(branchName,semester);

    // FIX: Use '?' placeholders and pass variables in an array as the second argument
    const [rows] = await db.query(
      "SELECT * FROM notes WHERE branch = ? AND semester = ?", 
      [branchName, semester]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;