import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaBox,
  FaCalendarAlt,
  FaThumbsUp,
  FaFlag,
  FaCheckCircle,
} from "react-icons/fa";

import { useReviews } from "../../context/ReviewContext";
import RatingStars from "../../components/reviews/RatingStars";

import "./ReviewDetails.css";

export default function ReviewDetails() {
  const { id } = useParams();

  const { getReviewById } = useReviews();

  const review = getReviewById(id);

  if (!review) {
    return (
      <div className="review-details-not-found">
        <h2>Review not found</h2>

        <Link to="/seller/reviews" className="back-button">
          <FaArrowLeft />
          Back to Reviews
        </Link>
      </div>
    );
  }

  return (
    <div className="review-details-page">
      <div className="review-details-header">
        <Link
          to="/seller/reviews"
          className="back-button"
        >
          <FaArrowLeft />
          Back
        </Link>

        <h1>{review.title}</h1>
      </div>

      <div className="review-details-grid">
        <section className="review-card">
          <h2>
            <FaUser />
            Customer
          </h2>

          <div className="detail-row">
            <strong>Name</strong>
            <span>{review.customerName}</span>
          </div>

          <div className="detail-row">
            <strong>Customer ID</strong>
            <span>{review.customerId}</span>
          </div>

          <div className="detail-row">
            <strong>Verified Purchase</strong>
            <span>
              {review.verifiedPurchase ? "Yes" : "No"}
            </span>
          </div>
        </section>

        <section className="review-card">
          <h2>
            <FaBox />
            Product
          </h2>

          <div className="detail-row">
            <strong>Product</strong>
            <span>{review.productName}</span>
          </div>

          <div className="detail-row">
            <strong>Product ID</strong>
            <span>{review.productId}</span>
          </div>

          <div className="detail-row">
            <strong>Order ID</strong>
            <span>{review.orderId}</span>
          </div>
        </section>
      </div>

      <section className="review-card">
        <h2>Customer Review</h2>

        <div className="review-rating">
          <RatingStars
            rating={review.rating}
            size="lg"
            showValue
          />
        </div>

        <p className="review-text">
          {review.comment}
        </p>
      </section>

      <section className="review-card">
        <h2>Review Information</h2>

        <div className="detail-row">
          <strong>
            <FaCalendarAlt />
            Review Date
          </strong>

          <span>{review.date}</span>
        </div>

        <div className="detail-row">
          <strong>
            <FaThumbsUp />
            Helpful Votes
          </strong>

          <span>{review.helpful}</span>
        </div>

        <div className="detail-row">
          <strong>
            <FaFlag />
            Reported
          </strong>

          <span>
            {review.reported ? "Yes" : "No"}
          </span>
        </div>

        <div className="detail-row">
          <strong>
            <FaCheckCircle />
            Status
          </strong>

          <span>{review.status}</span>
        </div>
      </section>

      {review.sellerReply && (
        <section className="review-card">
          <h2>Seller Reply</h2>

          <p className="review-text">
            {review.sellerReply.text}
          </p>

          <small>
            Replied on {review.sellerReply.date}
          </small>
        </section>
      )}
    </div>
  );
}