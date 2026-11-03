
import {
  FaTruck,
  FaBolt,
  FaHome,
  FaStore,
} from "react-icons/fa";

import "./DeliveryOptions.css";

export default function DeliveryOptions({
  value = "standard",
  onDeliveryChange,
}) {
  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      description: "2 - 5 Business Days",
      price: 0,
      priceLabel: "Free",
      icon: <FaTruck />,
      iconClass: "",
    },
    {
      id: "express",
      name: "Express Delivery",
      description: "Same Day / Next Day",
      price: 9.99,
      priceLabel: "$9.99",
      icon: <FaBolt />,
      iconClass: "express",
    },
    {
      id: "home",
      name: "Home Delivery",
      description: "Delivered to your doorstep",
      price: 4.99,
      priceLabel: "$4.99",
      icon: <FaHome />,
      iconClass: "home",
    },
    {
      id: "pickup",
      name: "Pickup Station",
      description: "Collect from nearest AfriMarket Hub",
      price: 0,
      priceLabel: "Free",
      icon: <FaStore />,
      iconClass: "pickup",
    },
  ];

  const handleChange = (option) => {
    if (onDeliveryChange) {
      onDeliveryChange(option);
    }
  };

  return (
    <section className="delivery-options">
      <div className="section-header">
        <h2>🚚 Delivery Options</h2>
        <p>Choose how you'd like to receive your order.</p>
      </div>

      {deliveryOptions.map((option) => (
        <label
          className="delivery-card"
          key={option.id}
        >
          <input
            type="radio"
            name="delivery"
            value={option.id}
            checked={value === option.id}
            onChange={() => handleChange(option)}
          />

          <div className={`delivery-icon ${option.iconClass}`}>
            {option.icon}
          </div>

          <div className="delivery-info">
            <h3>{option.name}</h3>
            <p>{option.description}</p>
          </div>

          <strong>{option.priceLabel}</strong>
        </label>
      ))}
    </section>
  );
}
