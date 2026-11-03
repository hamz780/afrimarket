import { FaGift, FaTag } from "react-icons/fa";

import "./PromoCode.css";

export default function PromoCode() {

  return (

    <section className="promo-code">

      <div className="section-header">

        <h2>🎁 Promo Code</h2>

        <p>
          Have a coupon? Apply it below and save on your order.
        </p>

      </div>

      <div className="promo-box">

        <div className="promo-input">

          <FaTag />

          <input
            type="text"
            placeholder="Enter Promo Code"
          />

        </div>

        <button>

          <FaGift />

          Apply

        </button>

      </div>

      <small>

        💡 Example: AFRI10, WELCOME20, FREESHIP

      </small>

    </section>

  );

}