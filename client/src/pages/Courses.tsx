import DashNav from "../components/DashNav";
import "../styles/Courses.css";
import React, { useState } from "react";
// Sample data
const courseData = [
  { id: 1, title: "HTML Basics", category: "Web" },
  { id: 2, title: "CSS Design", category: "Web" },
  { id: 3, title: "React 101", category: "Programming" },
  { id: 4, title: "Data Analysis", category: "Data" },
  { id: 5, title: "Figma Design", category: "Design" },
];

// List of categories
const categories = ["All", "Web", "Programming", "Data", "Design"];
const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses =
    selectedCategory === "All"
      ? courseData
      : courseData.filter((course) => course.category === selectedCategory);

  return (
    <div>
      {/* Navigation */}
      <DashNav />
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "10px 20px",
              backgroundColor:
                selectedCategory === category ? "#0b93f5" : "#ccc",
              color: selectedCategory === category ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Course Display */}
      <div>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <h4>{course.title}</h4>
              <p>Category: {course.category}</p>
            </div>
          ))
        ) : (
          <p>No courses found in this category.</p>
        )}
      </div>
    </div>
  );
};
export default Courses;
