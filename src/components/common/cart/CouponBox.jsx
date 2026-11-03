import { FaTicketAlt } from "react-icons/fa";
import { useState } from "react";
import "./CouponBox.css";

export default function CouponBox() {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  const handleApply = () => {
    if (!coupon.trim()) {
      setMessage("Please enter a coupon code.");
      return;
    }

    // Backend logic will be added later
    setMessage("Coupon validation will be available after backend integration.");
  };

  return (
    <section className="coupon-box">

      <div className="coupon-header">

        <FaTicketAlt />

        <div>

          <h3>Have a Coupon?</h3>

          <p>
            Enter your coupon code to receive discounts.
          </p>

        </div>

      </div>

      <div className="coupon-form">

        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />

        <button onClick={handleApply}>
          Apply Coupon
        </button>

      </div>

      {message && (
        <p className="coupon-message">
          {message}
        </p>
      )}

    </section>
  );
}