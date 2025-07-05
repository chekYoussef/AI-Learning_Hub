import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/QuestionsPage.css";

const QuestionsPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [credits, setCredits] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && purpose === "Learning") {
      // Skip step 2 and go directly to dashboard
      navigate("/Dashboard");
    } else if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log({ purpose, credits });
    alert("Form submitted!");
    navigate("/Dashboard");
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const isLastStep = (step === 2 && purpose === "Learning") || step === 3;

  const transitionSettings = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="questions-container">
      <h1 className="title">Let’s Get Started</h1>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            {...transitionSettings}
            className="question-block"
          >
            <h2>What brings you here at EDGE?</h2>
            <div className="custom-radio-group">
              <input
                type="radio"
                id="internship"
                name="purpose"
                value="Internship"
                checked={purpose === "Internship"}
                onChange={(e) => setPurpose(e.target.value)}
                hidden
              />
              <label
                htmlFor="internship"
                className={purpose === "Internship" ? "selected" : ""}
              >
                Registered Internship
              </label>

              <input
                type="radio"
                id="learning"
                name="purpose"
                value="Learning"
                checked={purpose === "Learning"}
                onChange={(e) => setPurpose(e.target.value)}
                hidden
              />
              <label
                htmlFor="learning"
                className={purpose === "Learning" ? "selected" : ""}
              >
                Just Learning New Skills
              </label>
            </div>

            <button
              onClick={handleNext}
              className={`btn-next ${!purpose && step === 1 ? "disabled" : ""}`}
              disabled={step === 1 && !purpose}
            >
              {isLastStep ? "Submit" : "Next"}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            {...transitionSettings}
            className="question-block"
          >
            <h2>How many credits are you registered for?</h2>
            <input
              type="number"
              min="0"
              max="5"
              placeholder="Enter number of credits"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="credit-input"
            />

            <div className="button-group">
              <button className="back-btn" onClick={handleBack}>
                Back
              </button>
              <button
                className="next-btn"
                onClick={handleSubmit}
                disabled={credits === ""}
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionsPage;
