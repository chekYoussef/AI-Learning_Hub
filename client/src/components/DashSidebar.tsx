import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashSideBar.css";
import { useAuth } from "../context/AuthContext";

const DashSideBar: React.FC = () => {
  const { setUser } = useAuth();
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
            <button onClick={() => handleClick("/Dashboard")}>
              <i
                className="bi bi-chat-left-text"
                style={{
                  marginRight: "15px",
                  fontSize: "20px",
                  width: "20px",
                  color: "#0d6efd",
                }}
              ></i>
              Ai Chat Helper
            </button>
            <button onClick={() => handleClick("/history")}>
              <i
                className="bi bi-clock-history"
                style={{
                  marginRight: "15px",
                  fontSize: "20px",
                  width: "20px",
                  color: "#6c757d",
                }}
              ></i>
              History
            </button>
            <button onClick={() => handleClick("/CodingGame")}>
              <i
                className="bi bi-controller"
                style={{
                  marginRight: "15px",
                  fontSize: "20px",
                  width: "20px",
                  color: "#198754",
                }}
              ></i>
              Coding Game
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <button
          onClick={() => {
            localStorage.removeItem("localUser");
            setUser(null);
          }}
        >
          <i
            className="bi bi-box-arrow-right"
            style={{ marginRight: "15px", fontSize: "20px", width: "20px" }}
          ></i>
          Log out
        </button>
      )}
    </div>
  );
};

export default DashSideBar;
