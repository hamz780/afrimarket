import { useState } from "react";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    storeName: "AfriMarket Store",
    ownerName: "Seller",
    email: "seller@afrimarket.com",
    phone: "",
    country: "Uganda",
    city: "Kampala",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function saveProfile() {
    alert("Store profile saved successfully.");
  }

  return (
    <section className="settings-card">
      <h2>🏪 Store Profile</h2>

      <div className="settings-grid">

        <div className="settings-group">
          <label htmlFor="storeName">
            Store Name
          </label>

          <input
            id="storeName"
            name="storeName"
            type="text"
            value={profile.storeName}
            onChange={handleChange}
            placeholder="Enter your store name"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="ownerName">
            Owner Name
          </label>

          <input
            id="ownerName"
            name="ownerName"
            type="text"
            value={profile.ownerName}
            onChange={handleChange}
            placeholder="Enter owner name"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="phone">
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={handleChange}
            placeholder="+256..."
          />
        </div>

        <div className="settings-group">
          <label htmlFor="country">
            Country
          </label>

          <select
            id="country"
            name="country"
            value={profile.country}
            onChange={handleChange}
          >
            <option value="Uganda">Uganda</option>
            <option value="Kenya">Kenya</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Nigeria">Nigeria</option>
            <option value="South Africa">
              South Africa
            </option>
            <option value="Ghana">Ghana</option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="city">
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={profile.city}
            onChange={handleChange}
            placeholder="Enter city"
          />
        </div>

      </div>

      <div className="settings-group" style={{ marginTop: "20px" }}>
        <label htmlFor="description">
          Store Description
        </label>

        <textarea
          id="description"
          name="description"
          value={profile.description}
          onChange={handleChange}
          placeholder="Tell customers about your store..."
          rows="5"
        />
      </div>

      <div className="settings-actions">
        <button
          type="button"
          className="save-btn"
          onClick={saveProfile}
        >
          Save Profile
        </button>
      </div>
    </section>
  );
}