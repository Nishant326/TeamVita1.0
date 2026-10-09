const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../DbConfig/db");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      console.log("👉 LOGIN TRY:", email, password);

      const [rows] = await db.query(
        "SELECT * FROM students WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        console.log("❌ USER NOT FOUND");
        return done(null, false, { message: "User not found" });
      }

      const student = rows[0];

      console.log("👉 FOUND USER:", student.email);
      console.log("👉 ACTIVATED:", student.is_activated);
      console.log("👉 DB PASSWORD:", student.password);

      if (!student.is_activated) {
        console.log("❌ ACCOUNT NOT ACTIVATED");
        return done(null, false, { message: "Account not activated" });
      }

      const match = await bcrypt.compare(password, student.password);
      console.log("👉 PASSWORD MATCH:", match);

      if (!match) {
        console.log("❌ WRONG PASSWORD");
        return done(null, false, { message: "Wrong password" });
      }

      console.log("✅ LOGIN SUCCESS");
      return done(null, student);
    }
  )
);

passport.serializeUser((student, done) => {
  done(null, student.id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await db.query(
    "SELECT * FROM students WHERE id = ?",
    [id]
  );
  done(null, rows[0]);
});

