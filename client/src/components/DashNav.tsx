import "../styles/DashNav.css";
import Login from "./Login";
import { NavLink } from "react-router-dom";

const DashNav: React.FC = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `dash-nav-link ${isActive ? "active" : ""}`;

  return (
    <nav>
      <div className="dashnav">
        <div className="nav-left">
          <ul>
            <li>
              <NavLink to="/Dashboard" className={getNavLinkClass}>
                <img
                  className="icon"
                  src="/images/dashboard.png"
                  alt="Dashboard icon"
                />{" "}
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/Courses" className={getNavLinkClass}>
                <img
                  className="icon"
                  src="/images/layers.png"
                  alt="Courses icon"
                />{" "}
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/Projects" className={getNavLinkClass}>
                <img
                  className="icon"
                  src="/images/learning.png"
                  alt="Projects icon"
                />{" "}
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/RoadMap" className={getNavLinkClass}>
                <img
                  className="icon"
                  src="/images/roadmap.png"
                  alt="Roadmap icon"
                />{" "}
                Roadmap
              </NavLink>
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
