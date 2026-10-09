const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const db = require("../DbConfig/db");

const router = express.Router();

router.post("/activate", async (req, res) => {
  const { roll_no, email, dob, password } = req.body;

  // Normalize date (YYYY-MM-DD)
  const normalizedDob = new Date(dob).toISOString().slice(0, 10);
  console.log(normalizedDob, roll_no, email, dob, password);

  const [rows] = await db.query(
    `SELECT * FROM students 
     WHERE roll_no = ? 
       AND email = ? 
       AND DATE(dob) = ?`,
    [roll_no, email, normalizedDob]
  );

  if (rows.length === 0) {
    return res.status(400).json({
      message: "Details not matched",
    });
  }

  const hash = await bcrypt.hash(password, 12);

  await db.query(
    "UPDATE students SET password=?, is_activated=true WHERE roll_no=?",
    [hash, roll_no]
  );

  res.json({ message: "Account activated" });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Login failed",
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ authenticated: false });
  }

  res.json({
    authenticated: true,
    user: {
      id: req.user.id,
      roll_no: req.user.roll_no,
      branch: req.user.branch,
      name: req.user.name,
      email: req.user.email,
      class_id: req.user.class_id,
      dob: req.user.dob,
      semester: req.user.semester
    },
  });
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // default session cookie name
      res.json({ message: "Logged out successfully" });
    });
  });
});



module.exports = router;
