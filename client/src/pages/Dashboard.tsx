// src/pages/Dashboard.tsx
import React from "react";
import AiChatBox from "../components/AiChatBox";
import DashNav from "../components/DashNav";
import DashSideBar from "../components/DashSidebar";
import "../styles/Dashboard.css";

interface DashboardProps {
  user: {
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
  } | null;
  setUser: (user: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
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
