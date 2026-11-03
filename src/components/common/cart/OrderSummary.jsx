import { FaShieldAlt, FaLock, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./OrderSummary.css";

export default function OrderSummary({
  subtotal,
}) {
  const shipping = subtotal >= 100 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <section className="order-summary">

      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal</span>
        <strong>${subtotal.toFixed(2)}</strong>
      </div>

      <div className="summary-row">
        <span>Discount</span>
        <strong className="discount">-$0.00</strong>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <strong>
          {shipping === 0
            ? "FREE"
            : `$${shipping.toFixed(2)}`}
        </strong>
      </div>

      <div className="summary-row">
        <span>Tax (5%)</span>
        <strong>${tax.toFixed(2)}</strong>
      </div>

      <hr />

      <div className="summary-total">
        <span>Total</span>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <Link
        to="/checkout"
        className="checkout-btn"
      >
        Proceed to Checkout

        <FaArrowRight />
      </Link>

      <div className="buyer-protection">

        <div>
          <FaShieldAlt />
          <span>Buyer Protection</span>
        </div>

        <div>
          <FaLock />
          <span>Secure Checkout</span>
        </div>

      </div>

      <ul className="summary-benefits">

        <li>✔ Verified African Sellers</li>

        <li>✔ Safe & Secure Payments</li>

        <li>✔ Easy Returns</li>

        <li>✔ Fast Delivery</li>

        <li>✔ 24/7 Customer Support</li>

      </ul>

    </section>
  );
}