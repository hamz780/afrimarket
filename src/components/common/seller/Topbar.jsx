import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";

import "./Topbar.css";

export default function Topbar() {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <header className="seller-topbar">

      <div className="topbar-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search products, orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            type="button"
            className="clear-search"
            onClick={() => setSearch("")}
          >
            <FaTimes />
          </button>
        )}

      </div>

      <div className="topbar-actions">

        <div className="topbar-dropdown-wrapper">

          <button
            type="button"
            className="topbar-icon-button"
            onClick={() => setNotifications(!notifications)}
          >
            <FaBell />
            <span className="notification-dot" />
          </button>

          {notifications && (
            <div className="topbar-dropdown notification-dropdown">

              <h3>Notifications</h3>

              <div className="notification-item">
                <strong>New order</strong>
                <span>You received a new order.</span>
              </div>

              <div className="notification-item">
                <strong>Low stock</strong>
                <span>Some products need restocking.</span>
              </div>

            </div>
          )}

        </div>

        <div className="topbar-dropdown-wrapper">

          <button
            type="button"
            className="seller-profile"
            onClick={() => setProfile(!profile)}
          >
            <FaUserCircle />

            <div>
              <strong>Seller</strong>
              <span>AfriMarket Store</span>
            </div>
          </button>

          {profile && (
            <div className="topbar-dropdown profile-dropdown">

              <Link to="/seller/settings">
                Account Settings
              </Link>

              <Link to="/seller/dashboard">
                Seller Dashboard
              </Link>

              <button
                type="button"
                onClick={() => alert("Logout will be connected later.")}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}