import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashSideBar.css";

const DashSideBar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // sidebar open by default

  const handleClick = (route: string) => {
    navigate(route);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`DashSideBar-section ${isOpen ? "open" : "closed"}`}>
      {/* Top Section */}
      <div>
        <h5>
          {isOpen && (
            <img
              src="/images/squirell.png"
              alt="Squirrel Logo"
              onClick={() => handleClick("/dashboard")}
              style={{
                cursor: "pointer",
                marginRight: "5%",
              }}
            />
          )}

          {isOpen && "EDGE AI"}
          <img
            src="/images/sidebar-flip.png"
            alt="Toggle Sidebar"
            onClick={toggleSidebar}
            style={{
              cursor: "pointer",
              marginLeft: isOpen ? "35%" : "0",
            }}
          />
        </h5>

        {isOpen && (
          <div className="sidebar-nav">
            <button onClick={() => handleClick("/ai-chat")}>
              <img src="/images/window.png" alt="AI Chat Icon" />
              Ai Chat Helper
            </button>
            <button onClick={() => handleClick("/history")}>
              <img src="/images/time-management.png" alt="History Icon" />
              History
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <button onClick={() => handleClick("/logout")}>
          <img
            src="/images/exit.png"
            alt="Logout Icon"
            style={{ marginRight: "5%" }}
          />
          Log out
        </button>
      )}
    </div>
  );
};

export default DashSideBar;
