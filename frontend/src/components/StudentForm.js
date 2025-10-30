import React, { useState } from "react";

const StudentForm = ({ addStudent }) => {
  const [student, setStudent] = useState({ roll: "", name: "", marks: "" });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!student.roll || !student.name || !student.marks) return;

  // Automatically calculate grade
  const marks = parseInt(student.marks);
  let grade = "F";
  if (marks >= 90) grade = "A+";
  else if (marks >= 80) grade = "A";
  else if (marks >= 70) grade = "B";
  else if (marks >= 60) grade = "C";
  else if (marks >= 50) grade = "D";
  else grade = "F";

  addStudent({ ...student, grade });
  setStudent({ roll: "", name: "", marks: "" });
};


  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        name="roll"
        value={student.roll}
        onChange={handleChange}
        placeholder="Roll No"
      />
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="marks"
        value={student.marks}
        onChange={handleChange}
        placeholder="Marks"
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
