const pool = require("../config/db");

// Helper: check karta hai ke sab zaroori fields sahi hain ya nahi
const validateStudent = (body) => {
  const { name, roll_number, email, course, semester } = body;

  if (!name || !roll_number || !email || !course || !semester) {
    return "All fields are required";
  }
  if (Number(semester) < 1 || Number(semester) > 12) {
    return "Semester must be between 1 and 12";
  }
  return null; // null ka matlab: koi error nahi
};

// 1) Add student  ->  POST /api/students
const createStudent = async (req, res) => {
  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ message: error });

  const { name, roll_number, email, course, semester } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO students (name, roll_number, email, course, semester)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, roll_number, email, course, semester]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // 23505 = UNIQUE rule toot gaya (roll number ya email pehle se hai)
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "Roll number or email already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 2) Get all students  ->  GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 3) Get one student  ->  GET /api/students/:id
const getStudentById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ message: "Invalid student id" });

  try {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 4) Update student  ->  PUT /api/students/:id
const updateStudent = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ message: "Invalid student id" });

  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ message: error });

  const { name, roll_number, email, course, semester } = req.body;

  try {
    const result = await pool.query(
      `UPDATE students
       SET name = $1, roll_number = $2, email = $3, course = $4, semester = $5
       WHERE id = $6
       RETURNING *`,
      [name, roll_number, email, course, semester, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "Roll number or email already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 5) Delete student  ->  DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ message: "Invalid student id" });

  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};