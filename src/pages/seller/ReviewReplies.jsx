import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

import { useReviews } from "../../context/ReviewContext";
import RatingStars from "../../components/reviews/RatingStars";

import "./ReviewReplies.css";

export default function ReviewReplies() {
  const { id } = useParams();

  const {
    getReviewById,
    replyToReview,
  } = useReviews();

  const review = getReviewById(id);

  const [reply, setReply] = useState("");

  useEffect(() => {
    if (review?.sellerReply) {
      setReply(review.sellerReply.text);
    }
  }, [review]);

  if (!review) {
    return (
      <div className="reply-not-found">
        <h2>Review not found</h2>

        <Link
          to="/seller/reviews"
          className="back-button"
        >
          <FaArrowLeft />
          Back to Reviews
        </Link>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!reply.trim()) return;

    replyToReview(review.id, reply);

    alert("Reply saved successfully.");
  }

  return (
    <div className="reply-page">
      <Link
        to="/seller/reviews"
        className="back-button"
      >
        <FaArrowLeft />
        Back
      </Link>

      <div className="reply-card">
        <h2>{review.title}</h2>

        <RatingStars
          rating={review.rating}
          showValue
        />

        <p className="reply-review-text">
          {review.comment}
        </p>
      </div>

      <form
        className="reply-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="sellerReply">
          Seller Reply
        </label>

        <textarea
          id="sellerReply"
          rows={8}
          value={reply}
          onChange={(e) =>
            setReply(e.target.value)
          }
          placeholder="Write your reply..."
        />

        <button type="submit">
          <FaPaperPlane />
          Save Reply
        </button>
      </form>
    </div>
  );
}