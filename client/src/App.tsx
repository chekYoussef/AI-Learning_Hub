// src/App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionsPage from "./pages/QuestionsPage";
import Home from "./pages/Home";
import RoadMap from "./pages/RoadMap";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";

const App: React.FC = () => {
  const [user, setUser] = useState<{
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
  } | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route
          path="/Dashboard"
          element={<Dashboard user={user} setUser={setUser} />}
        />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/RoadMap" element={<RoadMap />} />
      </Routes>
    </Router>
  );
};

export default App;
