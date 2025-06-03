import DashNav from "../components/DashNav";
import "../styles/Projects.css";
const Projects: React.FC = () => {
  return (
    <>
      <DashNav />
      <div className="Projects-section">
        <h1> My Projects</h1>
        <div className="Projects-dash">
          <button type="button" className="btn-ongoing"></button>
          <button type="button" className="btn-Completed"></button>
          <button type="button" className="btn-Archived"></button>
        </div>
      </div>
    </>
  );
};
export default Projects;
