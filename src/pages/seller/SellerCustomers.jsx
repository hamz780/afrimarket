import { Link } from "react-router-dom";

export default function SellerCustomers() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Customers</h1>

      <p>
        Manage all customers that have purchased
        from your store.
      </p>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>John Smith</h3>

          <p>Email: john@example.com</p>

          <Link to="/seller/messages">
            Send Message
          </Link>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>Sarah Johnson</h3>

          <p>Email: sarah@example.com</p>

          <Link to="/seller/messages">
            Send Message
          </Link>
        </div>
      </div>
    </div>
  );
}