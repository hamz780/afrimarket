
import { useState } from "react";

import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaGlobeAfrica,
  FaMapMarkerAlt,
  FaCity,
  FaMap,
  FaHome,
  FaStickyNote,
} from "react-icons/fa";

import "./ShippingAddress.css";

export default function ShippingAddress({ onAddressChange }) {
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "Uganda",
    city: "",
    district: "",
    streetAddress: "",
    postalCode: "",
    deliveryNotes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedAddress = {
      ...address,
      [name]: value,
    };

    setAddress(updatedAddress);

    if (onAddressChange) {
      onAddressChange(updatedAddress);
    }
  };

  return (
    <section className="shipping-address">
      <div className="section-header">
        <h2>📦 Shipping Address</h2>
        <p>Tell us where you'd like your order delivered.</p>
      </div>

      <div className="address-grid">
        <div className="input-group">
          <FaUser />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaPhone />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group full">
          <FaEnvelope />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={address.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaGlobeAfrica />
          <select
            name="country"
            value={address.country}
            onChange={handleChange}
            required
          >
            <option value="Uganda">Uganda</option>
            <option value="Kenya">Kenya</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Burundi">Burundi</option>
            <option value="South Sudan">South Sudan</option>
          </select>
        </div>

        <div className="input-group">
          <FaCity />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaMap />
          <input
            type="text"
            name="district"
            placeholder="District / State"
            value={address.district}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaHome />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={address.streetAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaMapMarkerAlt />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className="input-group full notes">
          <FaStickyNote />
          <textarea
            name="deliveryNotes"
            rows="4"
            placeholder="Delivery Notes (Optional)"
            value={address.deliveryNotes}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
}
