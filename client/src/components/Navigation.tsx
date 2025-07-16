// src/components/Navigation.tsx
import React from "react";
import "../App.css";
import Login from "./Login";

const Navigation: React.FC = () => {
  return (
    <nav className="Nav">
      <h1>EDGE-AI</h1>
      <div className="nav-actions">
        <Login />
      </div>
    </nav>
  );
};

export default Navigation;
