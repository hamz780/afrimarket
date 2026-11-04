import { useState } from "react";

import {
  FaLock,
  FaShieldAlt,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import "./OrderSummary.css";

const formatUGX = (amount) =>
  `UGX ${Math.round(Number(amount) || 0).toLocaleString("en-UG")}`;

export default function OrderSummary({
  cartItems = [],
  cartTotal = 0,
  deliveryFee = 0,
  tax = 0,
  discount = 0,
  promoCode = "",
  grandTotal,
  onPlaceOrder,
  loading = false,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const subtotal = Math.round(Number(cartTotal) || 0);
  const shipping = Math.round(Number(deliveryFee) || 0);
  const taxAmount = Math.round(Number(tax) || 0);
  const discountAmount = Math.min(
    subtotal,
    Math.max(0, Math.round(Number(discount) || 0))
  );

  const calculatedTotal = Math.max(
    0,
    subtotal + shipping + taxAmount - discountAmount
  );

  const total =
    grandTotal !== undefined && Number.isFinite(Number(grandTotal))
      ? Math.max(0, Math.round(Number(grandTotal)))
      : calculatedTotal;

  const handlePlaceOrder = () => {
    if (!loading && typeof onPlaceOrder === "function") {
      onPlaceOrder();
    }
  };

  return (
    <aside className="order-summary">
      <button
        type="button"
        className="summary-toggle"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
      >
        <span>🛒 Order Summary</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isOpen && (
        <>
          <div className="summary-products">
            {cartItems.map((item, index) => {
              const quantity = Number(item.quantity) || 0;
              const price = Number(item.price) || 0;
              const productId =
                item._id || item.id || item.product?._id || index;

              return (
                <div
                  className="summary-product"
                  key={productId}
                >
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name || "Product"}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/placeholder.png";
                    }}
                  />

                  <div className="summary-info">
                    <h4>{item.name || "Product"}</h4>
                    <p>Quantity: {quantity}</p>
                    <small>{formatUGX(price)} each</small>
                  </div>

                  <strong>{formatUGX(price * quantity)}</strong>
                </div>
              );
            })}
          </div>

          <div className="summary-pricing">
            <div>
              <span>Subtotal</span>
              <strong>{formatUGX(subtotal)}</strong>
            </div>

            <div>
              <span>Delivery</span>
              <strong>
                {shipping === 0 ? "FREE" : formatUGX(shipping)}
              </strong>
            </div>

            <div>
              <span>Tax (5%)</span>
              <strong>{formatUGX(taxAmount)}</strong>
            </div>

            {discountAmount > 0 && (
              <div>
                <span>
                  {promoCode
                    ? `Promo code (${promoCode})`
                    : "Discount"}
                </span>

                <strong className="promo-discount-value">
                  -{formatUGX(discountAmount)}
                </strong>
              </div>
            )}

            <hr />

            <div className="grand-total">
              <span>Total</span>
              <strong>{formatUGX(total)}</strong>
            </div>
          </div>

          <div className="checkout-security">
            <p>
              <FaLock />
              Secure Checkout
            </p>

            <p>
              <FaShieldAlt />
              Buyer Protection
            </p>
          </div>

          <button
            type="button"
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={
              loading ||
              !onPlaceOrder ||
              cartItems.length === 0
            }
          >
            {loading ? "Placing Order..." : "Place Order"}
            {!loading && <FaArrowRight />}
          </button>
        </>
      )}

      {!isOpen && (
        <div className="collapsed-summary">
          <span>Order Total</span>
          <strong>{formatUGX(total)}</strong>
        </div>
      )}
    </aside>
  );
}