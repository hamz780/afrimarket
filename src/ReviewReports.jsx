import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaEye,
  FaFlag,
} from "react-icons/fa";

import { useReviews } from "../../../context/ReviewContext";

import "./ReviewReports.css";

export default function ReviewReports() {
  const {
    reviews,
    resolveReport,
  } = useReviews();

  const reportedReviews = reviews.filter(
    (review) => review.reported
  );

  return (
    <div className="review-reports-page">

      <div className="review-reports-header">

        <h1>Reported Reviews</h1>

        <p>
          Review and resolve customer reported reviews.
        </p>

      </div>

      {!reportedReviews.length ? (

        <div className="review-report-empty">

          <FaFlag />

          <h2>No reported reviews</h2>

          <p>
            Everything looks good.
          </p>

        </div>

      ) : (

        <div className="review-report-list">

          {reportedReviews.map((review) => (

            <div
              key={review.id}
              className="review-report-card"
            >

              <div>

                <h3>{review.title}</h3>

                <strong>
                  {review.productName}
                </strong>

                <p>{review.comment}</p>

                <small>
                  Customer: {review.customerName}
                </small>

              </div>

              <div className="review-report-actions">

                <Link
                  to={`/seller/reviews/${review.id}`}
                  className="report-btn view"
                >
                  <FaEye />
                  View
                </Link>

                <button
                  className="report-btn resolve"
                  onClick={() =>
                    resolveReport(review.id)
                  }
                >
                  <FaCheckCircle />
                  Resolve
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}