import {
  FaEye,
  FaReply,
  FaTrash,
  FaFlag,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useReviews } from "../../context/ReviewContext";

import RatingStars from "./RatingStars";

import "./ReviewTable.css";

export default function ReviewTable() {
  const {
    filteredReviews,
    deleteReview,
    reportReview,
  } = useReviews();

  if (!filteredReviews.length) {
    return (
      <div className="review-empty">
        No reviews found.
      </div>
    );
  }

  return (
    <div className="review-table-wrapper">

      <table className="review-table">

        <thead>

          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredReviews.map((review) => (

            <tr key={review.id}>

              <td>

                <div className="review-customer">

                  <strong>
                    {review.customerName}
                  </strong>

                  <small>
                    {review.customerId}
                  </small>

                </div>

              </td>

              <td>{review.productName}</td>

              <td>

                <RatingStars
                  rating={review.rating}
                  showValue
                />

              </td>

              <td>

                <div className="review-comment">

                  <strong>
                    {review.title}
                  </strong>

                  <p>{review.comment}</p>

                </div>

              </td>

              <td>

                <span
                  className={`review-status review-status-${review.status.toLowerCase()}`}
                >
                  {review.status}
                </span>

              </td>

              <td>{review.date}</td>

              <td>

                <div className="review-actions">

                  <Link
                    to={`/seller/reviews/${review.id}`}
                    className="review-btn view"
                    title="View"
                  >
                    <FaEye />
                  </Link>

                  <Link
                    to={`/seller/reviews/${review.id}/reply`}
                    className="review-btn reply"
                    title="Reply"
                  >
                    <FaReply />
                  </Link>

                  {!review.reported && (
                    <button
                      className="review-btn report"
                      title="Report"
                      onClick={() =>
                        reportReview(review.id)
                      }
                    >
                      <FaFlag />
                    </button>
                  )}

                  <button
                    className="review-btn delete"
                    title="Delete"
                    onClick={() =>
                      deleteReview(review.id)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}