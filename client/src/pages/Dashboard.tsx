// src/pages/Dashboard.tsx
// import React from "react";
import AiChatBox from "../components/AiChatBox";
import DashNav from "../components/DashNav";
import DashSideBar from "../components/DashSidebar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <DashNav />
      <div className="dashboard-container">
        <DashSideBar />
        <AiChatBox />
      </div>
    </div>
  );
};

export default Dashboard;
