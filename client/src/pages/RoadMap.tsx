import "./QuestionsPage.css";
import "../styles/RoadMapPage.css";
import CourseRoadmap from "../components/CourseRoadmap";
import DashNav from "../components/DashNav";
import MapCategorieMenu from "../components/RoadmapCategorieMenu";
const RoadMap: React.FC = () => {
  return (
    <div className="RoadMap-page">
      <DashNav />
      <div className="RoadMap-content">
        <CourseRoadmap />
        <MapCategorieMenu />
      </div>
    </div>
  );
};
export default RoadMap;
