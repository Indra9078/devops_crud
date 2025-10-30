import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(saved);
  }, []);

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add new student
  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  // Delete student
  const deleteStudent = (roll) => {
    setStudents(students.filter((s) => s.roll !== roll));
  };

  // Edit student
  const editStudent = (updated) => {
    setStudents(students.map((s) => (s.roll === updated.roll ? updated : s)));
  };

  // Search filter
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort students by marks
  const sortedStudents = [...filteredStudents].sort((a, b) =>
    sortOrder === "asc" ? a.marks - b.marks : b.marks - a.marks
  );

  // Toggle sort order
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="app">
      <h1>🎓 Student Score Management Web</h1>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by Roll No or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={toggleSort}>
          Sort by Marks ({sortOrder === "asc" ? "↑" : "↓"})
        </button>
      </div>

      <StudentForm addStudent={addStudent} />
      <StudentTable
        students={sortedStudents}
        onDelete={deleteStudent}
        onEdit={editStudent}
      />
    </div>
  );
}

export default App;
