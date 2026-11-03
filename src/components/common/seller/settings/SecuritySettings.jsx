import { useState } from "react";

export default function SecuritySettings() {
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
    loginAlerts: true,
  });

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setSecurity((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function updatePassword() {
    if (!security.currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    if (!security.newPassword) {
      alert("Please enter a new password.");
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    alert("Password updated successfully.");

    setSecurity((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  }

  return (
    <section className="settings-card">
      <h2>🔐 Security</h2>

      <div className="settings-grid">

        <div className="settings-group">
          <label htmlFor="currentPassword">
            Current Password
          </label>

          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={security.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="newPassword">
            New Password
          </label>

          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={security.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="confirmPassword">
            Confirm New Password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={security.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>

      </div>

      <div className="settings-actions">
        <button
          type="button"
          className="save-btn"
          onClick={updatePassword}
        >
          Update Password
        </button>
      </div>

      <div className="settings-switch">

        <div>
          <h4>Two-Factor Authentication</h4>

          <p>
            Add an extra layer of security to your seller account.
          </p>
        </div>

        <input
          type="checkbox"
          name="twoFactor"
          checked={security.twoFactor}
          onChange={handleChange}
        />

      </div>

      <div className="settings-switch">

        <div>
          <h4>Login Alerts</h4>

          <p>
            Receive an alert when a new device logs into your account.
          </p>
        </div>

        <input
          type="checkbox"
          name="loginAlerts"
          checked={security.loginAlerts}
          onChange={handleChange}
        />

      </div>
    </section>
  );
}