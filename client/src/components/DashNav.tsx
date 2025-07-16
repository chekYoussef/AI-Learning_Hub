import "../styles/DashNav.css";
import Login from "./Login";
const DashNav: React.FC = () => {
  return (
    <nav>
      <div className="dashnav">
        <div className="nav-left">
          <ul>
            <li>
              <a href="/Dashboard">
                <img id="icon" src="/images/dashboard.png" /> Dashboard
              </a>
            </li>
            <li>
              <a href="/Courses">
                <img id="icon" src="/images/layers.png" /> Courses
              </a>
            </li>
            <li>
              <a href="/Projects">
                <img id="icon" src="/images/learning.png" /> Projects
              </a>
            </li>
            <li>
              <a href="/RoadMap">
                <img id="icon" src="/images/roadmap.png" /> Roadmap
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <Login />
        </div>
      </div>
    </nav>
  );
};
export default DashNav;
