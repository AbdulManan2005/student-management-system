require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const studentRoutes = require("./routers/studentRoutes");
const app = express();

app.use(cors());          // frontend ko backend se baat karne ki ijazat
app.use(express.json());  // request mein aane wala JSON parhne ke liye
app.use("/api/students", studentRoutes);

// Check karne ke liye ke server chal raha hai
app.get("/", (req, res) => {
  res.send("Student Management API is running");
});

// Temporary route: sirf database connection check karne ke liye
app.get("/api/db-test", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});