import {
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaBitcoin,
  FaEthereum,
  FaPlus,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";

import "./PaymentMethods.css";

export default function PaymentMethods() {

  const methods = [

    {
      id: 1,
      icon: <FaCreditCard />,
      title: "Visa Credit Card",
      number: "**** **** **** 4582",
      default: true,
      color: "visa",
    },

    {
      id: 2,
      icon: <FaCreditCard />,
      title: "Mastercard",
      number: "**** **** **** 8744",
      default: false,
      color: "mastercard",
    },

    {
      id: 3,
      icon: <FaMobileAlt />,
      title: "MTN Mobile Money",
      number: "+256 788 886 366",
      default: false,
      color: "mtn",
    },

    {
      id: 4,
      icon: <FaMobileAlt />,
      title: "Airtel Money",
      number: "+256 788 886 366",
      default: false,
      color: "airtel",
    },

    {
      id: 5,
      icon: <FaMobileAlt />,
      title: "M-Pesa Kenya",
      number: "+254 700 123456",
      default: false,
      color: "mpesa",
    },

    {
      id: 6,
      icon: <FaBitcoin />,
      title: "Bitcoin Wallet",
      number: "bc1q••••••••••••",
      default: false,
      color: "btc",
    },

    {
      id: 7,
      icon: <FaEthereum />,
      title: "Ethereum Wallet",
      number: "0xF9••••••••••••",
      default: false,
      color: "eth",
    },

    {
      id: 8,
      icon: <FaUniversity />,
      title: "Bank Account",
      number: "Equity Bank ****4502",
      default: false,
      color: "bank",
    },

  ];

  return (

    <section className="payment-methods">

      <div className="payment-header">

        <h2>💳 Payment Methods</h2>

        <button>

          <FaPlus />

          Add Payment Method

        </button>

      </div>

      <div className="payment-grid">

        {methods.map((item) => (

          <div
            className={`payment-card ${item.color}`}
            key={item.id}
          >

            {item.default && (

              <span className="default-payment">

                <FaCheckCircle />

                Default

              </span>

            )}

            <div className="payment-icon">

              {item.icon}

            </div>

            <h3>{item.title}</h3>

            <p>{item.number}</p>

            <div className="payment-actions">

              <button className="default-btn">

                Set Default

              </button>

              <button className="remove-btn">

                <FaTrash />

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}