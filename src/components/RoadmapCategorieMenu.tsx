import "../styles/mapCategorieMenu.css";
import { useNavigate } from "react-router-dom";

const MapCategorieMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="RightSectionMap">
      <h3>Select Roadmap</h3>
      <button type="button" className="btn-Courses">
        Courses
      </button>
      <button
        type="button"
        className="btn-Practice"
        onClick={() => navigate("/Projects")}
      >
        Practice
      </button>
      <div className="list-group">
        <a
          href="#"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          Adobe Photoshop
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          Adobe Illustrator
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          Adobe Indesign
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          Adobe Premier Pro
        </a>
      </div>
    </div>
  );
};
export default MapCategorieMenu;
