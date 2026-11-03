import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

import "./RatingStars.css";

export default function RatingStars({
  rating = 0,
  size = "md",
  showValue = false,
}) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <div className={`rating-stars rating-${size}`}>
      <div className="rating-icons">
        {stars}
      </div>

      {showValue && (
        <span className="rating-value">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
}