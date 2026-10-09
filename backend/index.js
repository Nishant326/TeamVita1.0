require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const syllabusRouter = require("./routes/Syllabus");
const noticeRouter = require("./routes/notice");
const notesRouter = require("./routes/notes");
const pyqRouter = require("./routes/pyq");
const topperRouter = require("./routes/topper");
const authRouter = require("./routes/auth");
const app = express();
const port = 3000;

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    // frontend URL
    credentials: true, // allow cookies
  })
);

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30 * 60 * 10000000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🔥 SERVE UPLOADS (ABSOLUTE PATH – VERY IMPORTANT)
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "uploads"))
// );
app.get(/^\/uploads\/(.+)/, (req, res) => {
  const relativePath = req.params[0]; // everything after /uploads/
  const filePath = path.join(__dirname, "uploads", relativePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("PDF send error:", err.message);
      res.status(404).send("File not found");
    }
  });
});


app.use("/syllabus", syllabusRouter);
app.use("/notice", noticeRouter);
app.use("/notes", notesRouter);
app.use("/pyq", pyqRouter);
app.use("/topper", topperRouter);
app.use("/auth", authRouter);



// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
