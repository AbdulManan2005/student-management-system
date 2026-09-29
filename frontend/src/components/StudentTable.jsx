function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">No students yet</p>
        <p className="empty-state-text">
          Add your first student using the form on the left.
        </p>
      </div>
    );
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Roll No</th>
          <th>Course</th>
          <th>Semester</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>
              <div className="student-cell">
                <span className="avatar">{getInitials(student.name)}</span>
                <div>
                  <div className="student-name">{student.name}</div>
                  <div className="student-email">{student.email}</div>
                </div>
              </div>
            </td>
            <td>{student.roll_number}</td>
            <td>{student.course}</td>
            <td>
              <span className="semester-pill">Sem {student.semester}</span>
            </td>
            <td>
              <div className="row-actions">
                <button className="btn-ghost" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button
                  className="btn-ghost btn-danger"
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;