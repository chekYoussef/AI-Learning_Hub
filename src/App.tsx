// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionsPage from "./pages/QuestionsPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* add more routes here */}
      </Routes>
    </Router>
  );
};

export default App;
