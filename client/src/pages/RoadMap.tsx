import { useState } from "react";
import "../styles/QuestionsPage.css";
import "../styles/RoadMapPage.css";
import CourseRoadmap from "../components/CourseRoadmap";
import DashNav from "../components/DashNav";
import MapCategorieMenu from "../components/RoadmapCategorieMenu";

const RoadMap: React.FC = () => {
  const [category, setCategory] = useState("photoshop");

  return (
    <div className="RoadMap-page">
      <DashNav />
      <div className="RoadMap-content">
        <CourseRoadmap category={category} />
        <MapCategorieMenu setCategory={setCategory} selected={category} />
      </div>
    </div>
  );
};

export default RoadMap;
