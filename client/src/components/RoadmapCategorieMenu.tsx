import "../styles/mapCategorieMenu.css";
import { useNavigate } from "react-router-dom";

interface Props {
  setCategory: (category: string) => void;
  selected: string;
}

const MapCategorieMenu: React.FC<Props> = ({ setCategory, selected }) => {
  const navigate = useNavigate();
  return (
    <div className="RightSectionMap">
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
      <br></br>
      <br></br>
      <h3>Select Roadmap</h3>
      <button
        onClick={() => setCategory("photoshop")}
        className={`btn-selector ${selected === "photoshop" ? "active" : ""}`}
      >
        Adobe Photoshop
      </button>
      <button
        onClick={() => setCategory("illustrator")}
        className={`btn-selector ${selected === "illustrator" ? "active" : ""}`}
      >
        Adobe Illustrator
      </button>
      <button
        onClick={() => setCategory("indesign")}
        className={`btn-selector ${selected === "indesign" ? "active" : ""}`}
      >
        Adobe Indesign
      </button>
      <button
        onClick={() => setCategory("premiere")}
        className={`btn-selector ${selected === "premiere" ? "active" : ""}`}
      >
        Adobe Premiere Pro
      </button>
    </div>
  );
};

export default MapCategorieMenu;
