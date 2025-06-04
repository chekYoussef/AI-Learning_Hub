import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <i
      className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"}`}
      style={{
        fontSize: "24px",
        color: isFavorite ? "#ffc107" : "#6c757d",
        cursor: "pointer",
      }}
      onClick={toggleFavorite}
    />
  );
};

export default FavoriteButton;
