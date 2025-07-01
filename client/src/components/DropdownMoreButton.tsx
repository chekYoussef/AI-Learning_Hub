interface DropdownMoreProps {
  onMarkComplete: () => void;
  onArchive: () => void;
}

const DropdownMoreButton: React.FC<DropdownMoreProps> = ({
  onMarkComplete,
  onArchive,
}) => {
  return (
    <div className="dropdown">
      <button
        className="btn p-0 border-0 bg-transparent"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i
          className="bi bi-three-dots"
          style={{ cursor: "pointer", fontSize: "2.5rem" }}
        ></i>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button className="dropdown-item" onClick={onMarkComplete}>
            Mark Complete
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={onArchive}>
            Archive
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMoreButton;
