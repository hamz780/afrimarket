import {
  FaTachometerAlt,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaStar,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "./DashboardSidebar.css";

export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">

      <div className="sidebar-logo">
        <h2>🌍 AfriMarket</h2>
        <p>Customer Dashboard</p>
      </div>

      <nav>

        <a href="#" className="active">
          <FaTachometerAlt />
          Dashboard
        </a>

        <a href="#">
          <FaShoppingBag />
          My Orders
        </a>

        <a href="#">
          <FaHeart />
          Wishlist
        </a>

        <a href="#">
          <FaMapMarkerAlt />
          Addresses
        </a>

        <a href="#">
          <FaCreditCard />
          Payment Methods
        </a>

        <a href="#">
          <FaStar />
          Reviews
        </a>

        <a href="#">
          <FaBell />
          Notifications
        </a>

        <a href="#">
          <FaCog />
          Settings
        </a>

        <a href="#" className="logout">
          <FaSignOutAlt />
          Logout
        </a>

      </nav>

    </aside>
  );
}