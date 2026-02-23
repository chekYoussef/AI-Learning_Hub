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
    if (!user) return;

    const currentInput = userInput;
    const userMessage = { role: "user", content: currentInput };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsBotTyping(true);

    const startTime = Date.now();
    const MIN_TYPING_TIME = 1000;

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          userId: user.sub, // ← fixed: was userID, backend expects userId
          history: messages, // ← send full history for memory
        }),
      });

      const data = await response.json();
      const botReply = data.reply?.trim() || "Sorry, I didn't get that.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_TYPING_TIME - elapsed;
      setTimeout(() => setIsBotTyping(false), remaining > 0 ? remaining : 0);
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
