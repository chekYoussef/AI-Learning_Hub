import { useEffect, useState } from "react";
import DashNav from "../components/DashNav";
import DropdownMoreButton from "../components/DropdownMoreButton";
import FavoriteButton from "../components/FavoriteButton";
import "../styles/Projects.css";

interface Project {
  _id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  clientNotes: string;
  ressources: string;
  isFavorite?: boolean;
}

const statusOptions = ["Ongoing", "Completed", "Archived"];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("Ongoing");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const initialized = data.map((project: Project) => ({
          ...project,
          isFavorite: project.isFavorite ?? false,
        }));
        setProjects(initialized);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const updateLocalProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...updates } : p))
    );
  };

  const handleFavoriteToggle = (project: Project) => {
    const isNowFavorite = !project.isFavorite;
    const newStatus = isNowFavorite ? "Archived" : "Ongoing";
    updateLocalProject(project._id, {
      isFavorite: isNowFavorite,
      status: newStatus,
    });
  };

  const filteredProjects =
    selectedStatus === "Ongoing"
      ? projects
      : projects.filter((p) => p.status === selectedStatus);

  return (
    <>
      <DashNav />
      <div className="Projects-section">
        <h1>My Projects</h1>

        <div className="Projects-dash">
          <div className="Projects-buttons">
            {statusOptions.map((s) => (
              <button
                key={s}
                className={`status-btn ${selectedStatus === s ? "active" : ""}`}
                onClick={() => setSelectedStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="projects-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div className="card" key={project._id}>
                  <div className="card-body">
                    <h4 className="card-title">
                      {project.title}
                      <img
                        src={`/images/${project.category.replace(
                          /\s+/g,
                          "-"
                        )}.png`}
                        alt={`${project.category} Icon`}
                        style={{ float: "right" }}
                        onError={(e) => {
                          e.currentTarget.src = "/images/default.png";
                        }}
                      />
                    </h4>

                    <h4 className="card-subtitle">{project.category}</h4>
                    <br />
                    <br />
                    <h5>
                      <img
                        src="/images/description.png"
                        alt="Description Icon"
                        style={{ paddingRight: "10px" }}
                      />
                      Description:
                    </h5>
                    <p className="card-text">{project.description}</p>

                    <a
                      href={project.clientNotes}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-clients"
                    >
                      Client Notes
                    </a>
                    <a
                      href={project.ressources}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ress"
                    >
                      Ressources
                    </a>

                    <div className="more-section">
                      <FavoriteButton
                        isFavorite={project.isFavorite ?? false}
                        onToggle={() => handleFavoriteToggle(project)}
                      />

                      <DropdownMoreButton
                        onMarkComplete={() =>
                          updateLocalProject(project._id, {
                            status: "Completed",
                          })
                        }
                        onArchive={() =>
                          updateLocalProject(project._id, {
                            status: "Archived",
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
