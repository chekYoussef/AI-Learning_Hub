import React from "react";
import "../App.css";
import Login from "./Login";

const Navigation: React.FC = () => {
  return (
    <nav className="Nav">
      <h1>EDGE-AI</h1>
      <div className="nav-actions">
        <Login />
        <button type="button" className="btn-bd-primary">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
