import {
  FaShoppingCart,
  FaTruck,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

import "./CheckoutProgress.css";

export default function CheckoutProgress() {

  return (

    <section className="checkout-progress">

      <div className="progress-step active">

        <div className="progress-icon">

          <FaShoppingCart />

        </div>

        <span>Cart</span>

      </div>

      <div className="progress-line active"></div>

      <div className="progress-step active">

        <div className="progress-icon">

          <FaTruck />

        </div>

        <span>Shipping</span>

      </div>

      <div className="progress-line"></div>

      <div className="progress-step">

        <div className="progress-icon">

          <FaCreditCard />

        </div>

        <span>Payment</span>

      </div>

      <div className="progress-line"></div>

      <div className="progress-step">

        <div className="progress-icon">

          <FaCheckCircle />

        </div>

        <span>Complete</span>

      </div>

    </section>

  );

}