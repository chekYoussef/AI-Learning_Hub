import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomeSection: React.FC = () => {
  const { user } = useAuth();
  return (
    <section className="home">
      <h2>
        Welcome {user?.name}, Ready to Build
        <br />
        Something Amazing?
      </h2>
      <p>
        Track your progress, get instant feedback, and grow your skills with
        EDGE AI
      </p>
      <Link to="/questions">
        <button type="button" className="btn-start">
          Get Started
        </button>
      </Link>
    </section>
  );
};

export default HomeSection;
