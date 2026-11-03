import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";

import "./DashboardHeader.css";

export default function DashboardHeader() {

  return (

    <header className="dashboard-header">

      <div className="header-left">

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          Manage your AfriMarket account and orders.
        </p>

      </div>

      <div className="header-right">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search orders, products..."
          />

        </div>

        <button className="icon-btn">

          <FaBell />

          <span className="badge">3</span>

        </button>

        <button className="icon-btn">

          <FaEnvelope />

          <span className="badge">2</span>

        </button>

        <button className="icon-btn">

          <FaCog />

        </button>

        <div className="user-profile">

          <img
            src="https://ui-avatars.com/api/?name=Hamza&background=16a34a&color=fff"
            alt="User"
          />

          <div>

            <h4>Hamza</h4>

            <span>Premium Member</span>

          </div>

        </div>

      </div>

    </header>

  );

}