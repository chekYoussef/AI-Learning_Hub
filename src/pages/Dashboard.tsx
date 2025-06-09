import DashNav from "../components/DashNav";
import DashSideBar from "../components/DashsideBar";
import "../styles/Dashboard.css";
const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <DashNav />
      <DashSideBar />
    </div>
  );
};
export default Dashboard;
