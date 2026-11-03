import { useState } from "react";

const defaultPreferences = {
  language: "English",
  currency: "USD",
  timezone: "Africa/Kampala",
  autoApproveReviews: false,
  vacationMode: false,
  maintenanceMode: false,
};

export default function Preferences() {
  const [preferences, setPreferences] = useState(defaultPreferences);

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function savePreferences() {
    alert("Preferences saved successfully.");
  }

  function resetPreferences() {
    setPreferences(defaultPreferences);
  }

  return (
    <section className="settings-card">

      <h2>⚙️ Preferences</h2>

      <div className="settings-grid">

        <div className="settings-group">
          <label htmlFor="language">
            Language
          </label>

          <select
            id="language"
            name="language"
            value={preferences.language}
            onChange={handleChange}
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Swahili">Swahili</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="currency">
            Currency
          </label>

          <select
            id="currency"
            name="currency"
            value={preferences.currency}
            onChange={handleChange}
          >
            <option value="USD">USD</option>
            <option value="UGX">UGX</option>
            <option value="KES">KES</option>
            <option value="TZS">TZS</option>
            <option value="NGN">NGN</option>
            <option value="ZAR">ZAR</option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="timezone">
            Timezone
          </label>

          <select
            id="timezone"
            name="timezone"
            value={preferences.timezone}
            onChange={handleChange}
          >
            <option value="Africa/Kampala">
              Africa/Kampala
            </option>

            <option value="Africa/Nairobi">
              Africa/Nairobi
            </option>

            <option value="Africa/Lagos">
              Africa/Lagos
            </option>

            <option value="Africa/Johannesburg">
              Africa/Johannesburg
            </option>
          </select>
        </div>

      </div>

      <div className="settings-switch">

        <div>
          <h4>Auto Approve Reviews</h4>

          <p>
            Publish customer reviews automatically.
          </p>
        </div>

        <input
          type="checkbox"
          name="autoApproveReviews"
          checked={preferences.autoApproveReviews}
          onChange={handleChange}
        />

      </div>

      <div className="settings-switch">

        <div>
          <h4>Vacation Mode</h4>

          <p>
            Temporarily pause your store while keeping
            products visible.
          </p>
        </div>

        <input
          type="checkbox"
          name="vacationMode"
          checked={preferences.vacationMode}
          onChange={handleChange}
        />

      </div>

      <div className="settings-switch">

        <div>
          <h4>Maintenance Mode</h4>

          <p>
            Hide your store while you make updates.
          </p>
        </div>

        <input
          type="checkbox"
          name="maintenanceMode"
          checked={preferences.maintenanceMode}
          onChange={handleChange}
        />

      </div>

      <div className="settings-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={resetPreferences}
        >
          Reset
        </button>

        <button
          type="button"
          className="save-btn"
          onClick={savePreferences}
        >
          Save Preferences
        </button>

      </div>

    </section>
  );
}