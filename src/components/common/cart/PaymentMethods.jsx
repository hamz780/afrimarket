import {
  FaCcVisa,
  FaCcMastercard,
  FaBitcoin,
  FaUniversity,
  FaMobileAlt,
  FaLock,
} from "react-icons/fa";

import "./PaymentMethods.css";

export default function PaymentMethods() {
  return (
    <section className="payment-methods">

      <h3>Secure Payment Methods</h3>

      <div className="payment-grid">

        <div className="payment-card visa">
          <FaCcVisa />
          <span>Visa</span>
        </div>

        <div className="payment-card mastercard">
          <FaCcMastercard />
          <span>Mastercard</span>
        </div>

        <div className="payment-card momo">
          <FaMobileAlt />
          <span>MTN MoMo</span>
        </div>

        <div className="payment-card airtel">
          <FaMobileAlt />
          <span>Airtel Money</span>
        </div>

        <div className="payment-card mpesa">
          <FaMobileAlt />
          <span>M-Pesa</span>
        </div>

        <div className="payment-card bank">
          <FaUniversity />
          <span>Bank</span>
        </div>

        <div className="payment-card bitcoin">
          <FaBitcoin />
          <span>Bitcoin</span>
        </div>

        <div className="payment-card usdt">
          💵
          <span>USDT</span>
        </div>

      </div>

      <div className="payment-security">

        <FaLock />

        <span>
          Your payment information is encrypted and securely processed.
        </span>

      </div>

    </section>
  );
}