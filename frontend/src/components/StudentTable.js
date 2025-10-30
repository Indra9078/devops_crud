import React, { useState } from "react";

const StudentTable = ({ students, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ roll: "", name: "", marks: "" });

  const handleEdit = (student) => {
    setEditing(student.roll);
    setEditData(student);
  };

  const handleSave = () => {
  const marks = parseInt(editData.marks);
  let grade = "F";
  if (marks >= 90) grade = "A+";
  else if (marks >= 80) grade = "A";
  else if (marks >= 70) grade = "B";
  else if (marks >= 60) grade = "C";
  else if (marks >= 50) grade = "D";
  else grade = "F";

  onEdit({ ...editData, grade }); // send updated grade
  setEditing(null);
};


  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <table className="student-table">
      <thead>
  <tr>
    <th>Roll No</th>
    <th>Name</th>
    <th>Marks</th>
    <th>Grade</th>  
    <th>Actions</th>
  </tr>
</thead>

      <tbody>
        {students.map((student) =>
          editing === student.roll ? (
            <tr key={student.roll}>
              <td>{student.roll}</td>
              <td>
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  name="marks"
                  value={editData.marks}
                  onChange={handleChange}
                />
              </td>
              <td>
                <button onClick={handleSave}>Save</button>
              </td>
            </tr>
          ) : (
            <tr key={student.roll}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>{student.marks}</td>
              <td>{student.grade}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => onDelete(student.roll)}>Delete</button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;
