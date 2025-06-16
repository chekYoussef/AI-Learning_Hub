import React from "react";
import "../App.css";

const Navigation: React.FC = () => {
  return (
    <nav className="Nav">
      <h1>EDGE-AI</h1>
      <div className="nav-actions">
        <a href="#login">Login</a>
        <button type="button" className="btn-bd-primary">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
