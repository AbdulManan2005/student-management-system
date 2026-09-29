import { useState, useEffect } from "react";

// props: onSubmit (function jo data leke backend call karega), editingStudent (agar edit ho raha hai)
function StudentForm({ onSubmit, editingStudent, onCancelEdit }) {
  const emptyForm = {
    name: "",
    roll_number: "",
    email: "",
    course: "",
    semester: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  // Jab editingStudent set ho (Edit button dabaya gaya), form us data se bhar do
  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData(emptyForm);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onSubmit(formData);
      setFormData(emptyForm);
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="roll_number"
        placeholder="Roll Number"
        value={formData.roll_number}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="semester"
        placeholder="Semester (1-12)"
        min="1"
        max="12"
        value={formData.semester}
        onChange={handleChange}
        required
      />

      <div className="form-buttons">
        <button type="submit">{editingStudent ? "Update" : "Add"}</button>
        {editingStudent && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;