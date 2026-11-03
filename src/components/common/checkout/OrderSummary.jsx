import {
  FaLock,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

import "./OrderSummary.css";

export default function OrderSummary({

  cartItems,

  cartTotal,

  onPlaceOrder,

}) {

  const shipping = 0;

  const tax = cartTotal * 0.05;

  const discount = 0;

  const grandTotal =

    cartTotal +

    shipping +

    tax -

    discount;

  return (

    <aside className="order-summary">

      <h2>

        🛒 Order Summary

      </h2>

      <div className="summary-products">

        {cartItems.map((item) => (

          <div

            className="summary-product"

            key={item.id}

          >

            <img

              src={item.image}

              alt={item.name}

            />

            <div className="summary-info">

              <h4>{item.name}</h4>

              <p>

                Qty: {item.quantity}

              </p>

            </div>

            <strong>

              $

              {(item.price *

                item.quantity).toFixed(2)}

            </strong>

          </div>

        ))}

      </div>

      <div className="summary-pricing">

        <div>

          <span>Subtotal</span>

          <strong>

            ${cartTotal.toFixed(2)}

          </strong>

        </div>

        <div>

          <span>Shipping</span>

          <strong>

            {shipping === 0

              ? "FREE"

              : `$${shipping.toFixed(2)}`}

          </strong>

        </div>

        <div>

          <span>Tax (5%)</span>

          <strong>

            ${tax.toFixed(2)}

          </strong>

        </div>

        <div>

          <span>Discount</span>

          <strong>

            ${discount.toFixed(2)}

          </strong>

        </div>

        <hr />

        <div className="grand-total">

          <span>Total</span>

          <strong>

            ${grandTotal.toFixed(2)}

          </strong>

        </div>

      </div>

      <div className="checkout-security">

        <p>

          <FaLock />

          Secure SSL Checkout

        </p>

        <p>

          <FaShieldAlt />

          Buyer Protection Included

        </p>

      </div>

      <button

        className="place-order-btn"

        onClick={onPlaceOrder}

      >

        Place Order

        <FaArrowRight />

      </button>

    </aside>

  );

}