// src/components/AiChatBox.tsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/AiChatBox.css";
import { useAuth } from "../context/AuthContext";

const AiChatBox: React.FC = () => {
  const { user } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    if (!user) {
      console.warn("No user info available. Message not sent.");
      return;
    }

    const currentInput = userInput;
    const userMessage = { role: "user", content: currentInput };

    // Optimistically add user message and show typing indicator
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsBotTyping(true);
    const startTime = Date.now();
    const MIN_TYPING_TIME = 1000; // Minimum 1 second typing time

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          userID: user.sub,
        }),
      });

      const data = await response.json();
      const botReply = data.reply?.trim() || "Sorry, I didn't get that.";
      const botMessage = { role: "assistant", content: botReply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Fetch error:", err);
      const errorMessage = {
        role: "assistant",
        content: "Oops! Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_TYPING_TIME - elapsedTime;

      if (remainingTime > 0) {
        setTimeout(() => {
          setIsBotTyping(false);
        }, remainingTime);
      } else {
        setIsBotTyping(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="AiChatBox">
      <div className="chat-messages">
        <h2>Welcome to your personal AI assistant</h2>
        <p>Ask anything - How can I help you?</p>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-row ${msg.role === "user" ? "right" : "left"}`}
          >
            <div
              className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isBotTyping && (
          <div className="chat-row left">
            <div className="chat-bubble bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        {/* Anchor for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="form-control"
          placeholder="Start Typing..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="send-btn"
          onClick={sendMessage}
        >
          <img
            src="/images/paper-plane.png"
            alt="send"
            style={{ cursor: "pointer", width: "25px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default AiChatBox;
