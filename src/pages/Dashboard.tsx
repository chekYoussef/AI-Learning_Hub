import AiChatBox from "../components/AiChatBox";
import DashNav from "../components/DashNav";
import DashSideBar from "../components/DashsideBar";
import "../styles/Dashboard.css";
const Dashboard: React.FC = () => {
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
