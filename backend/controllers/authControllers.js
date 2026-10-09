require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require("../DbConfig/db");

exports.loginStudent = (req, res) => {
  const { roll_no, password } = req.body;

  if (!roll_no || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const db = connectDB();

  const sql = "SELECT * FROM students WHERE roll_no = ?";
  db.query(sql, [roll_no], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(401).json({ message: "Student not found" });
    }

    const student = result[0];
    const match = await bcrypt.compare(password, student.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // First login check
    if (!student.is_password_changed) {
      return res.json({
        firstLogin: true,
        studentId: student.id
      });
    }

    const token = jwt.sign(
      { id: student.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  });
};
