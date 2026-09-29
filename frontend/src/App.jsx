import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api/studentApi";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Page load hote hi sab students mangwao
  const loadStudents = async () => {
    const res = await getAllStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Form submit hone par: agar edit mode hai to update, warna naya add
  const handleFormSubmit = async (formData) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, formData);
      setEditingStudent(null);
    } else {
      await createStudent(formData);
    }
    await loadStudents(); // list ko taza karo
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    await deleteStudent(id);
    await loadStudents();
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Student Management System</h1>
        <p className="app-subtitle">
          Add, update, and track student records in one place.
        </p>
      </header>

      <div className="app-layout">
        <aside className="form-panel">
          <StudentForm
            onSubmit={handleFormSubmit}
            editingStudent={editingStudent}
            onCancelEdit={handleCancelEdit}
          />
        </aside>

        <main className="table-panel">
          <div className="table-panel-header">
            <span className="student-count">
              {students.length} {students.length === 1 ? "student" : "students"}
            </span>
          </div>
          <StudentTable
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}

export default App;