import React from "react";
import "../App.css"; // or create HomeSection.css if separating styles
import { Link } from "react-router-dom";

const HomeSection: React.FC = () => {
  return (
    <section className="home">
      <h2>
        Welcome User, Ready to Build
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
