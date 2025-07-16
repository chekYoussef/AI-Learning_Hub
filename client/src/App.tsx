// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionsPage from "./pages/QuestionsPage";
import Home from "./pages/Home";
import RoadMap from "./pages/RoadMap";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("localUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetch("http://localhost:5050/api", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            `Backend error: ${res.status} - ${JSON.stringify(errorData)}`
          );
        }
        return res.text();
      })
      .then((data) => console.log("Backend response:", data))
      .catch((err) => console.error("Detailed fetch error:", err.message));
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/RoadMap" element={<RoadMap />} />
      </Routes>
    </Router>
  );
};

export default App;
