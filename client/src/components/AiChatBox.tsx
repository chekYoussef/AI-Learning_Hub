import React, { useState } from "react";
import "../styles/AiChatBox.css";

const AiChatBox: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      console.log("AI response from backend:", data); // Debug
      const botReply = data.reply?.trim() || "Sorry, I didn't get that.";

      setMessages([...newMessages, { role: "assistant", content: botReply }]);
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
            className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="form-control"
          placeholder="Start Typing...."
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
            style={{
              cursor: "pointer",
              width: "25px",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default AiChatBox;
