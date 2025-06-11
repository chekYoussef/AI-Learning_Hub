import "../styles/AiChatBox.css";

const AiChatBox: React.FC = () => {
  return (
    <div className="AiChatBox">
      <div className="chat-messages">
        <h2>Welcome to your personal AI assistant</h2>
        <p>Ask anything - How can I help you?</p>
        {/* You can map through messages here */}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="form-control"
          placeholder="Start Typing...."
          aria-label="chat"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="send-btn"
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
