import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashNav from "../components/DashNav";
import "../styles/CodingGame.css";

const iframeStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; padding: 1rem; color: #2d3748; }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 1rem;
  }
  header img {
    height: 40px;
    background-color: #2d3748;
    padding: 4px;
    border-radius: 8px;
  }
  nav ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
    color: #4299e1;
    font-weight: 500;
  }
  nav a:hover { text-decoration: underline; }
`;

const gameLevels = [
  {
    instruction:
      "Let's start with a heading. Change the text inside the <h1> tags to 'Hello, Coder!'.",
    initialCode: "<h1></h1>",
    solutionRegex: /<h1>\s*Hello,\s*Coder!\s*<\/h1>/i,
    success: "Perfect! That's a heading.",
  },
  {
    instruction:
      "Now, let's add some style. Make the heading blue by adding a style attribute.",
    initialCode: "<h1>Hello, Coder!</h1>",
    solutionRegex:
      /<h1\s+style\s*=\s*"(color:\s*blue;?|color:\s*#0000ff;?)"\s*>\s*Hello,\s*Coder!\s*<\/h1>/i,
    success: "Great! You're using inline CSS.",
  },
  {
    instruction:
      "Add a paragraph below the heading that says 'I am learning to code!'.",
    initialCode: '<h1 style="color: blue;">Hello, Coder!</h1>',
    solutionRegex:
      /<h1.*?>Hello, Coder!<\/h1>\s*<p>\s*I am learning to code!\s*<\/p>/is,
    success: "Excellent! You've added a paragraph.",
  },
  {
    instruction:
      "Websites need images! Add an `<img>` tag below your paragraph. Set its `src` to 'https://picsum.photos/600/150' and `alt` to 'A random banner'.",
    initialCode:
      '<h1 style="color: blue;">Hello, Coder!</h1>\n<p>I am learning to code!</p>',
    solutionRegex:
      /<p>I am learning to code!<\/p>\s*<img\s+src\s*=\s*['"]https:\/\/picsum.photos\/600\/150['"]\s+alt\s*=\s*['"]A random banner['"]\s*\/?>/is,
    success: "Awesome! Images make a site much more engaging.",
  },
  {
    instruction:
      "Let's add a header. Above your `<h1>` tag, create a `<header>` section. Inside it, add an `<img>` for our logo. Use `/images/squirell.png` as the `src` and 'Logo' for the `alt` text.",
    initialCode:
      '<h1 style="color: blue;">Hello, Coder!</h1>\n<p>I am learning to code!</p>\n<img src="https://picsum.photos/600/150" alt="A random banner">',
    solutionRegex:
      /<header>\s*<img\s+src\s*=\s*['"]\/images\/squirell.png['"]\s+alt\s*=\s*['"]Logo['"]\s*\/?>\s*<\/header>\s*<h1/is,
    success: "Looking good! Every great site starts with a logo.",
  },
  {
    instruction:
      "Now, let's add navigation. Inside your `<header>`, after the logo, add a `<nav>` element. Inside the `<nav>`, create an unordered list (`<ul>`) with three list items (`<li>`), for 'Home', 'About', and 'Contact'. Wrap each in an `<a>` tag with `href='#'`.",
    initialCode:
      '<header>\n  <img src="/images/squirell.png" alt="Logo">\n</header>\n<h1 style="color: blue;">Hello, Coder!</h1>\n<p>I am learning to code!</p>\n<img src="https://picsum.photos/600/150" alt="A random banner">',
    solutionRegex:
      /<header>.*<img.*>\s*<nav>\s*<ul>\s*<li>\s*<a\s+href\s*=\s*['"]#['"]\s*>Home<\/a>\s*<\/li>\s*<li>\s*<a\s+href\s*=\s*['"]#['"]\s*>About<\/a>\s*<\/li>\s*<li>\s*<a\s+href\s*=\s*['"]#['"]\s*>Contact<\/a>\s*<\/li>\s*<\/ul>\s*<\/nav>\s*<\/header>/is,
    success: "Fantastic! You've built a complete header.",
  },
];

const CodingGame: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [maxLevelReached, setMaxLevelReached] = useState(0);
  const [code, setCode] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentTask = gameLevels[level];
  const isGameFinished = level >= gameLevels.length;

  useEffect(() => {
    if (!isGameFinished) {
      setCode(currentTask.initialCode);
      setFeedbackMessage(currentTask.instruction);
      setIsCorrect(null);
    } else {
      setFeedbackMessage("Congratulations! You've finished the tutorial.");
      setIsCorrect(true);
    }
  }, [level, isGameFinished, currentTask, maxLevelReached]);

  const checkAnswer = () => {
    if (isGameFinished) return;
    if (currentTask.solutionRegex.test(code)) {
      setIsCorrect(true);
      setFeedbackMessage(currentTask.success);
      setTimeout(() => {
        const nextLevel = level + 1;
        if (nextLevel > maxLevelReached) {
          setMaxLevelReached(nextLevel);
        }
        setLevel(nextLevel);
      }, 2000);
    } else {
      setIsCorrect(false);
      setFeedbackMessage("Not quite right. Give it another try!");
    }
  };

  const resetGame = () => {
    setLevel(0);
    setMaxLevelReached(0);
  };

  const handleLevelSelect = (index: number) => {
    if (index <= maxLevelReached && isCorrect !== true) {
      setLevel(index);
    }
  };

  const getFeedbackClass = () => {
    if (isCorrect === null) return "feedback-default";
    return isCorrect ? "feedback-success" : "feedback-error";
  };

  return (
    <div className="coding-game-page">
      <DashNav />
      <div className="game-layout">
        <div className="instructions-panel">
          <AnimatePresence mode="wait">
            <motion.h1
              key={level}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {isGameFinished
                ? "You did it!"
                : `Level ${level + 1}: HTML & CSS Basics`}
            </motion.h1>
          </AnimatePresence>
          <div className="progress-container">
            {gameLevels.map((_, index) => (
              <button
                key={index}
                onClick={() => handleLevelSelect(index)}
                className={`progress-step ${index === level ? "current" : ""} ${
                  index < maxLevelReached ? "completed" : ""
                } ${index > maxLevelReached ? "locked" : ""}`}
                disabled={index > maxLevelReached || isCorrect === true}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className={`feedback-box ${getFeedbackClass()}`}>
            <p>{feedbackMessage}</p>
          </div>
          <div className="editor-container">
            <div className="editor-header">code-editor.html</div>
            <textarea
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              disabled={isGameFinished || isCorrect === true}
            />
          </div>
          {isGameFinished ? (
            <button onClick={resetGame} className="game-button">
              Play Again
            </button>
          ) : (
            <button
              onClick={checkAnswer}
              className="game-button"
              disabled={isCorrect === true}
            >
              Check Answer
            </button>
          )}
        </div>
        <div className="preview-panel">
          <div className="preview-header">
            <div className="preview-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="preview-title">Live Preview</div>
          </div>
          <iframe
            title="Live Preview"
            srcDoc={`<style>${iframeStyles}</style>${code}`}
            className="live-preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default CodingGame;
