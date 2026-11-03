import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaGlobe,
  FaMoon,
  FaShieldAlt,
  FaSave,
  FaTrash,
} from "react-icons/fa";

import "./AccountSettings.css";

export default function AccountSettings() {

  return (

    <section className="account-settings">

      <div className="settings-header">

        <h2>⚙️ Account Settings</h2>

      </div>

      <form className="settings-form">

        <div className="setting-group">

          <label>

            <FaUser />

            Full Name

          </label>

          <input
            type="text"
            defaultValue="Hamza"
          />

        </div>

        <div className="setting-group">

          <label>

            <FaEnvelope />

            Email Address

          </label>

          <input
            type="email"
            defaultValue="hamza@example.com"
          />

        </div>

        <div className="setting-group">

          <label>

            <FaLock />

            New Password

          </label>

          <input
            type="password"
            placeholder="Enter new password"
          />

        </div>

        <div className="setting-group">

          <label>

            <FaGlobe />

            Language

          </label>

          <select>

            <option>English</option>
            <option>Swahili</option>
            <option>French</option>

          </select>

        </div>

        <div className="setting-group">

          <label>

            Currency

          </label>

          <select>

            <option>USD ($)</option>
            <option>UGX (USh)</option>
            <option>KES (KSh)</option>
            <option>TZS (TSh)</option>

          </select>

        </div>

        <div className="setting-switch">

          <div>

            <FaMoon />

            <span>Dark Mode</span>

          </div>

          <input type="checkbox" />

        </div>

        <div className="setting-switch">

          <div>

            <FaShieldAlt />

            <span>Enable Two-Factor Authentication</span>

          </div>

          <input type="checkbox" />

        </div>

        <div className="settings-buttons">

          <button
            type="submit"
            className="save-btn"
          >

            <FaSave />

            Save Changes

          </button>

          <button
            type="button"
            className="delete-btn"
          >

            <FaTrash />

            Delete Account

          </button>

        </div>

      </form>

    </section>

  );

}