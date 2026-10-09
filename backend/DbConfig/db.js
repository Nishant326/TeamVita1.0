require("dotenv").config();

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection once
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("DB successfully connected");
    connection.release();
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
})();

module.exports = db;
