import { useState } from "react";
import {
  FaGift,
  FaTag,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

import "./PromoCode.css";

const PROMO_CODES = {
  AFRI10: {
    code: "AFRI10",
    type: "percentage",
    value: 10,
    description: "10% off your product subtotal",
  },
  WELCOME5: {
    code: "WELCOME5",
    type: "percentage",
    value: 5,
    description: "5% off your product subtotal",
  },
  AFRI5000: {
    code: "AFRI5000",
    type: "fixed",
    value: 5000,
    description: "UGX 5,000 off your product subtotal",
  },
};

export default function PromoCode({
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) {
  const [promoInput, setPromoInput] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleApply = () => {
    const code = promoInput.trim().toUpperCase();

    if (!code) {
      setMessage("Please enter a promo code.");
      setMessageType("error");
      return;
    }

    if (appliedPromo) {
      setMessage("Remove your current coupon before applying another.");
      setMessageType("error");
      return;
    }

    const promo = PROMO_CODES[code];

    if (!promo) {
      setMessage("Invalid promo code. Please try again.");
      setMessageType("error");
      return;
    }

    if (typeof onApplyPromo !== "function") {
      setMessage("Promo codes are temporarily unavailable.");
      setMessageType("error");
      return;
    }

    onApplyPromo({
      code: promo.code,
      type: promo.type,
      value: promo.value,
      description: promo.description,
    });

    setMessage(`${promo.code} selected. Discount will be validated when you place your order.`);
    setMessageType("success");
    setPromoInput("");
  };

  const handleRemove = () => {
    onRemovePromo?.();
    setMessage("Promo code removed.");
    setMessageType("success");
  };

  return (
    <section className="promo-code">
      <div className="section-header">
        <h2>🎁 Promo Code & Coupons</h2>
        <p>Enter a coupon code to receive a discount.</p>
      </div>

      {appliedPromo ? (
        <div className="promo-applied">
          <div>
            <FaCheckCircle />

            <div>
              <strong>{appliedPromo.code}</strong>
              <p>
                {appliedPromo.description ||
                  "Coupon selected for checkout"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove promo code"
          >
            <FaTimes />
            Remove
          </button>
        </div>
      ) : (
        <div className="promo-box">
          <div className="promo-input">
            <FaTag />

            <input
              type="text"
              value={promoInput}
              onChange={(event) => {
                setPromoInput(event.target.value.toUpperCase());
                setMessage("");
                setMessageType("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleApply();
                }
              }}
              placeholder="Enter Promo Code"
              aria-label="Promo code"
              autoComplete="off"
            />
          </div>

          <button
            type="button"
            onClick={handleApply}
          >
            <FaGift />
            Apply
          </button>
        </div>
      )}

      {message && (
        <p
          className={`promo-message ${messageType}`}
          role="status"
        >
          {message}
        </p>
      )}

      <small>
        Test codes: AFRI10, WELCOME5 and AFRI5000.
      </small>
    </section>
  );
}