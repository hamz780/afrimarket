import {
  FaBell,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

import "./Topbar.css";

export default function Topbar() {

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );

  return (

    <header className="seller-topbar">

      <div className="topbar-left">

        <h1>
          Seller Dashboard
        </h1>

        <p>
          {today}
        </p>

      </div>

      <div className="topbar-right">

        <div className="topbar-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <button className="notification-btn">

          <FaBell />

          <span className="notification-badge">
            3
          </span>

        </button>

        <div className="seller-profile">

          <FaUserCircle />

          <div>

            <strong>
              Seller
            </strong>

            <small>
              AfriMarket Store
            </small>

          </div>

        </div>

      </div>

    </header>

  );

}