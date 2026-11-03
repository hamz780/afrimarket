import { useState } from "react";

export default function StoreAppearance() {
  const [appearance, setAppearance] = useState({
    theme: "Light",
    layout: "Modern",
    showStoreLogo: true,
    showStoreDescription: true,
    showContactInfo: true,
  });

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setAppearance((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function saveAppearance() {
    alert("Store appearance saved successfully.");
  }

  return (
    <section className="settings-card">
      <h2>🎨 Store Appearance</h2>

      <div className="settings-grid">

        <div className="settings-group">
          <label htmlFor="theme">
            Store Theme
          </label>

          <select
            id="theme"
            name="theme"
            value={appearance.theme}
            onChange={handleChange}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="System">System Default</option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="layout">
            Store Layout
          </label>

          <select
            id="layout"
            name="layout"
            value={appearance.layout}
            onChange={handleChange}
          >
            <option value="Modern">Modern</option>
            <option value="Classic">Classic</option>
            <option value="Minimal">Minimal</option>
          </select>
        </div>

      </div>

      <div className="settings-switch">
        <div>
          <h4>Show Store Logo</h4>
          <p>
            Display your store logo to customers.
          </p>
        </div>

        <input
          type="checkbox"
          name="showStoreLogo"
          checked={appearance.showStoreLogo}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Show Store Description</h4>
          <p>
            Display your store description on your storefront.
          </p>
        </div>

        <input
          type="checkbox"
          name="showStoreDescription"
          checked={appearance.showStoreDescription}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Show Contact Information</h4>
          <p>
            Allow customers to see your store contact information.
          </p>
        </div>

        <input
          type="checkbox"
          name="showContactInfo"
          checked={appearance.showContactInfo}
          onChange={handleChange}
        />
      </div>

      <div className="settings-actions">
        <button
          type="button"
          className="save-btn"
          onClick={saveAppearance}
        >
          Save Appearance
        </button>
      </div>
    </section>
  );
}