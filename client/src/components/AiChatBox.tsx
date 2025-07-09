// src/components/AiChatBox.tsx
import React, { useState } from "react";
import "../styles/AiChatBox.css";

interface AiChatBoxProps {
  user: {
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
  } | null;
}

const AiChatBox: React.FC<AiChatBoxProps> = ({ user }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    if (!user) {
      console.warn("No user info available. Message not sent.");
      return;
    }

    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          userID: user.sub,
        }),
      });

      const data = await response.json();
      const botReply = data.reply?.trim() || "Sorry, I didn't get that.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
      setUserInput("");
    } catch (err) {
      console.error("Fetch error:", err);
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
