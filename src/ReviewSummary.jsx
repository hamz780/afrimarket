import {
  FaStar,
  FaCommentDots,
  FaFlag,
  FaChartLine,
} from "react-icons/fa";

import { useReviews } from "../../context/ReviewContext";

import "./ReviewSummary.css";

export default function ReviewSummary() {
  const { reviewStats } = useReviews();

  const cards = [
    {
      title: "Total Reviews",
      value: reviewStats.totalReviews,
      icon: <FaCommentDots />,
      className: "primary",
    },
    {
      title: "Average Rating",
      value: `${reviewStats.averageRating} ★`,
      icon: <FaStar />,
      className: "warning",
    },
    {
      title: "5 Star Reviews",
      value: reviewStats.fiveStars,
      icon: <FaChartLine />,
      className: "success",
    },
    {
      title: "Reported",
      value: reviewStats.reportedReviews,
      icon: <FaFlag />,
      className: "danger",
    },
  ];

  return (
    <div className="review-summary-grid">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`review-summary-card ${card.className}`}
        >
          <div className="review-summary-icon">
            {card.icon}
          </div>

          <div className="review-summary-content">
            <h4>{card.title}</h4>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}