export default function ReviewSummary() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(180px,1fr))",
        gap: "20px",
        margin: "25px 0",
      }}
    >
      <div className="card">
        <h3>1,284</h3>
        <p>Total Reviews</p>
      </div>

      <div className="card">
        <h3>4.8★</h3>
        <p>Average Rating</p>
      </div>

      <div className="card">
        <h3>97%</h3>
        <p>Positive Reviews</p>
      </div>

      <div className="card">
        <h3>18</h3>
        <p>Pending Replies</p>
      </div>
    </div>
  );
}