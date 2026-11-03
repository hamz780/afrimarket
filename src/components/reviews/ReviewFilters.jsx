import "./ReviewFilters.css";

export default function ReviewFilters() {
  return (
    <div className="review-filters">
      <input
        type="text"
        placeholder="Search reviews..."
      />

      <select defaultValue="all">
        <option value="all">All Ratings</option>
        <option value="5">★★★★★</option>
        <option value="4">★★★★☆</option>
        <option value="3">★★★☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="1">★☆☆☆☆</option>
      </select>

      <select defaultValue="all">
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="pending">Pending</option>
        <option value="reported">Reported</option>
      </select>
    </div>
  );
}