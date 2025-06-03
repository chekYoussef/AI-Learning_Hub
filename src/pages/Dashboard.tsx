import "./QuestionsPage.css";
import "../styles/Dashboard.css";
import CourseRoadmap from "../components/CourseRoadmap";
import DashNav from "../components/DashNav";
import MapCategorieMenu from "../components/RoadmapCategorieMenu";
const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <DashNav />
      <div className="dashboard-content">
        <CourseRoadmap />
        <MapCategorieMenu />
      </div>
    </div>
  );
};
export default Dashboard;
