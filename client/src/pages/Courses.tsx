import DashNav from "../components/DashNav";
import "../styles/Courses.css";
import React, { useState, useEffect } from "react";

interface Course {
  _id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  image: string;
}

const categories = [
  "All",
  "Web",
  "Programming",
  "Data",
  "Design",
  "Marketing & PR",
  "Entrepreneurship",
  "Project Management",
  "Finance",
  "Soft Skills",
];

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="courses-section">
      <DashNav />
      <div className="courses-header">
        <h2>Courses</h2>
        <p>Discover and create new courses at the Edge Center</p>
        <button className="new-course-btn">
          <i
            className="bi bi-plus"
            style={{ color: "white", marginRight: "5px", fontSize: "auto" }}
          ></i>
          New Courses
        </button>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div className="course-card" key={course._id}>
              <a href={course.link} target="_blank" rel="noreferrer">
                <img
                  src={`../images/${course.image}`}
                  alt={course.title}
                  className="course-image"
                />
              </a>
              <h4>{course.title}</h4>
              <p>{course.description}</p>

              <button className="course-category">{course.category}</button>
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
