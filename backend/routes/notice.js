const express = require("express");
const router = express.Router();
// const Notice = require("../model/Notice");
const upload = require("../upload/noticeUpload");
const db = require("../DbConfig/db")
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "PDF not uploaded" });
    }

    const pdfPath = `/uploads/notices/${req.file.filename}`;

    await db.query(
      "INSERT INTO notices (title, description, pdf_path) VALUES (?, ?, ?)",
      [title, description, pdfPath]
    );

    res.status(201).json({
      message: "Notice created successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM notices ORDER BY created_at DESC"
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No notices found" });
    }

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;