import ReviewSummary from "../../components/reviews/ReviewSummary";
import ReviewFilters from "../../components/reviews/ReviewFilters";
import ReviewTable from "../../components/reviews/ReviewTable";

import "./SellerReviews.css";

export default function SellerReviews() {
  return (
    <div className="seller-reviews-page">
      <div className="seller-reviews-header">
        <div>
          <h1>Reviews</h1>
          <p>
            Monitor customer reviews, ratings, and seller replies.
          </p>
        </div>
      </div>

      <ReviewSummary />

      <ReviewFilters />

      <ReviewTable />
    </div>
  );
}