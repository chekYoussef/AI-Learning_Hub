// src/components/Navigation.tsx
import React from "react";
import "../App.css";
import Login from "./Login";

interface NavigationProps {
  user: any;
  setUser: (user: any) => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, setUser }) => {
  return (
    <nav className="Nav">
      <h1>EDGE-AI</h1>
      <div className="nav-actions">
        <Login user={user} setUser={setUser} />
        <button type="button" className="btn-bd-primary">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
