const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",          // change if needed
  database: "hospital_db" // change if needed
});

db.connect(err => {
  if (err) {
    console.error("DB CONNECTION FAILED:", err);
    return;
  }
  console.log("MySQL connected");
});

app.post("/register", (req, res) => {
  const { name, dob, age, phone, email, abha_link } = req.body;

  const sql = `
    INSERT INTO patients
    (name, dob, age, phone, email, abha_link)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, dob, age, phone, email, abha_link],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({
          error: "Database insert failed"
        });
      }

      res.json({
        message: "Patient registered successfully",
        id: result.insertId
      });
    }
  );
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
