import { FaStar, FaRegStar } from "react-icons/fa";

export default function RatingStars({
  rating = 5,
  showValue = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <FaStar key={star} color="#fbbf24" />
        ) : (
          <FaRegStar key={star} color="#d1d5db" />
        )
      )}

      {showValue && (
        <span
          style={{
            marginLeft: 8,
            fontWeight: 600,
          }}
        >
          {rating}/5
        </span>
      )}
    </div>
  );
}