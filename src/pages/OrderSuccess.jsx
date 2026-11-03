import {
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaFileInvoice,
  FaShoppingBag,
  FaMapMarkedAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./OrderSuccess.css";

export default function OrderSuccess() {

  const orderNumber =
    "AFM-" +
    Math.floor(
      100000 + Math.random() * 900000
    );

  return (

    <section className="order-success">

      <div className="success-card">

        <div className="success-icon">

          <FaCheckCircle />

        </div>

        <h1>

          Order Successfully Placed!

        </h1>

        <p>

          Thank you for shopping with AfriMarket.

          Your order has been received and is now being processed.

        </p>

        <div className="order-number">

          <strong>Order Number</strong>

          <span>{orderNumber}</span>

        </div>

        <div className="success-info">

          <div className="info-box">

            <FaBoxOpen />

            <div>

              <h3>Order Confirmed</h3>

              <p>

                We've received your order.

              </p>

            </div>

          </div>

          <div className="info-box">

            <FaTruck />

            <div>

              <h3>Estimated Delivery</h3>

              <p>

                2 - 5 Business Days

              </p>

            </div>

          </div>

        </div>

        <div className="success-buttons">

          <button className="invoice-btn">

            <FaFileInvoice />

            Download Invoice

          </button>

          <button className="track-btn">

            <FaMapMarkedAlt />

            Track Order

          </button>

        </div>

        <Link
          to="/shop"
          className="continue-shopping"
        >

          <FaShoppingBag />

          Continue Shopping

        </Link>

      </div>

    </section>

  );

}