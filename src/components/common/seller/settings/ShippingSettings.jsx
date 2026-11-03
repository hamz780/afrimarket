import { useState } from "react";

export default function ShippingSettings() {
  const [shipping, setShipping] = useState({
    shippingEnabled: true,
    freeShipping: false,
    localPickup: true,
    shippingMethod: "Standard Shipping",
    processingTime: "1-3 business days",
    shippingFee: "",
    freeShippingMinimum: "",
    shippingCountry: "Uganda",
  });

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setShipping((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function saveShipping() {
    alert("Shipping settings saved successfully.");
  }

  return (
    <section className="settings-card">
      <h2>🚚 Shipping Settings</h2>

      <div className="settings-grid">
        <div className="settings-group">
          <label htmlFor="shippingMethod">
            Shipping Method
          </label>

          <select
            id="shippingMethod"
            name="shippingMethod"
            value={shipping.shippingMethod}
            onChange={handleChange}
          >
            <option value="Standard Shipping">
              Standard Shipping
            </option>

            <option value="Express Shipping">
              Express Shipping
            </option>

            <option value="Same Day Delivery">
              Same Day Delivery
            </option>

            <option value="Pickup">
              Customer Pickup
            </option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="processingTime">
            Processing Time
          </label>

          <select
            id="processingTime"
            name="processingTime"
            value={shipping.processingTime}
            onChange={handleChange}
          >
            <option value="Same day">
              Same day
            </option>

            <option value="1-3 business days">
              1-3 business days
            </option>

            <option value="3-5 business days">
              3-5 business days
            </option>

            <option value="5-7 business days">
              5-7 business days
            </option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="shippingFee">
            Shipping Fee
          </label>

          <input
            id="shippingFee"
            name="shippingFee"
            type="number"
            min="0"
            value={shipping.shippingFee}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="freeShippingMinimum">
            Free Shipping Minimum
          </label>

          <input
            id="freeShippingMinimum"
            name="freeShippingMinimum"
            type="number"
            min="0"
            value={shipping.freeShippingMinimum}
            onChange={handleChange}
            placeholder="Order amount"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="shippingCountry">
            Shipping Country
          </label>

          <select
            id="shippingCountry"
            name="shippingCountry"
            value={shipping.shippingCountry}
            onChange={handleChange}
          >
            <option value="Uganda">Uganda</option>
            <option value="Kenya">Kenya</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="South Africa">
              South Africa
            </option>
            <option value="International">
              International
            </option>
          </select>
        </div>
      </div>

      <div className="settings-switch">
        <div>
          <h4>Enable Shipping</h4>

          <p>
            Allow customers to receive orders through
            your available shipping methods.
          </p>
        </div>

        <input
          type="checkbox"
          name="shippingEnabled"
          checked={shipping.shippingEnabled}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Free Shipping</h4>

          <p>
            Offer free shipping when customers reach
            the minimum order amount.
          </p>
        </div>

        <input
          type="checkbox"
          name="freeShipping"
          checked={shipping.freeShipping}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Local Pickup</h4>

          <p>
            Allow customers to collect their orders
            directly from your store.
          </p>
        </div>

        <input
          type="checkbox"
          name="localPickup"
          checked={shipping.localPickup}
          onChange={handleChange}
        />
      </div>

      <div className="settings-actions">
        <button
          type="button"
          className="save-btn"
          onClick={saveShipping}
        >
          Save Shipping Settings
        </button>
      </div>
    </section>
  );
}