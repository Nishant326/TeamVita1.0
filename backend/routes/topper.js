const express = require("express");
const router = express.Router();
// Make sure this points to the multer config file we fixed in the previous step
const upload = require("../upload/topperupload"); 
const db = require("../DbConfig/db");

// ROUTE: Create New Topper
// 'image' must match the key name in your Frontend FormData
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // 1. Destructure the specific fields for Toppers
    const { name, branch, semester, rankNum, year,percentage } = req.body;

    // 2. Validate required text fields
    if (!name || !branch || !semester || !rankNum || !year || !percentage) {
      return res.status(400).json({ error: "All fields (name, branch, semester, rank, year) are required" });
    }

    // 3. Validate File Upload
    if (!req.file) {
      return res.status(400).json({ error: "Topper photo not uploaded" });
    }

    // 4. Construct File Path (matches your multer destination)
    const filePath = `/uploads/toppers/${req.file.filename}`;

    // 5. Insert into Database
    // Assuming table name is 'toppers' based on your context
    await db.query(
      `INSERT INTO toppers 
       (name, branch, semester, rankNum, year, file_path, percentage)
       VALUES (?, ?, ?, ?, ?, ?,?)`,
      [
        name.trim(),
        branch.trim(),
        Number(semester),
        Number(rankNum),
        Number(year),
        filePath,
        Number(percentage)
      ]
    );

    res.status(201).json({ message: "Topper added successfully" });
  } catch (err) {
    console.error("Topper Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ROUTE: Get Toppers by Branch & Semester
router.get("/", async (req, res) => {
  try {
    
    // Select from 'toppers' table
    const [rows] = await db.query(
      "SELECT * FROM toppers ORDER BY created_at DESC"
    );

    if (rows.length === 0) {    
      return res.status(404).json({ message: "No toppers found for this semester" });
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;