const DropdownMoreButton = () => {
  return (
    <div className="dropdown">
      <button
        className="btn p-0 border-0 bg-transparent"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i
          className="bi bi-three-dots"
          style={{
            cursor: "pointer",
            color: "#333",
            fontSize: "2.5rem",
            padding: "15px 10px",
            marginRight: "5px",
          }}
        ></i>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="dropdownMenuButton"
      >
        <li>
          <a className="dropdown-item" href="#">
            Mark Complete
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Add
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
};
export default DropdownMoreButton;
