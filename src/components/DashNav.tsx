import "../styles/DashNav.css";
const DashNav: React.FC = () => {
  return (
    <nav>
      <div className="dashnav">
        <ul>
          <li>
            <a href="/Dashboard">
              {""}
              <img id="icon" src="/images/dashboard.png"></img> Dashboard{" "}
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <img id="icon" src="/images/layers.png"></img> Courses
            </a>
          </li>
          <li>
            <a href="/Projects">
              {""}
              <img id="icon" src="/images/learning.png"></img> Projects
            </a>
          </li>
          <li>
            <a href="RoadMap">
              <img id="icon" src="/images/roadmap.png"></img> Roadmap
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default DashNav;
