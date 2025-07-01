interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <i
      className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"}`}
      style={{
        fontSize: "24px",
        color: isFavorite ? "#ffc107" : "#6c757d",
        cursor: "pointer",
        marginRight: "10px",
      }}
      onClick={onToggle}
    />
  );
};

export default FavoriteButton;
