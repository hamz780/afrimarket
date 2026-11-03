import { Link } from "react-router-dom";
import { FaArrowLeft, FaFlag } from "react-icons/fa";

export default function ReviewReports() {
  return (
    <div className="review-reports-page">
      <Link
        to="/seller/reviews"
        className="back-button"
      >
        <FaArrowLeft />
        Back to Reviews
      </Link>

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        }}
      >
        <h1>
          <FaFlag /> Reported Reviews
        </h1>

        <p style={{ marginTop: "15px" }}>
          This page will display all customer reviews
          that have been reported by users or flagged
          for moderation.
        </p>

        <p style={{ marginTop: "10px", color: "#666" }}>
          (We'll build the full moderation dashboard in
          the next step.)
        </p>
      </div>
    </div>
  );
}