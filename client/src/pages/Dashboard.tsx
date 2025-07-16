// src/pages/Dashboard.tsx
// import React from "react";
import AiChatBox from "../components/AiChatBox";
import DashNav from "../components/DashNav";
import DashSideBar from "../components/DashSidebar";
import "../styles/Dashboard.css";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="dashboard-page">
      <DashNav />
      <div className="dashboard-container">
        <DashSideBar />
        <AiChatBox user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
