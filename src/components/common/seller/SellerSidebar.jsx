import {
  FaChartPie,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaComments,
  FaTags,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "./SellerSidebar.css";

export default function SellerSidebar() {
  const navigate = useNavigate();

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    console.log("🚪 Seller logout started...");

    // Remove all AfriMarket authentication data
    localStorage.removeItem("afrimarket-token");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessToken");

    localStorage.removeItem("afrimarket-user");

    localStorage.removeItem("afrimarket-authentication");
    localStorage.removeItem("afrimarket-authenticated");

    console.log("✅ Seller authentication data cleared");

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <aside className="seller-sidebar">

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="seller-logo">
        <h2>🌍 AfriMarket</h2>
        <p>Seller Center</p>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav>

        <NavLink to="/seller/dashboard">
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink to="/seller/products">
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink to="/seller/orders">
          <FaShoppingCart />
          Orders
        </NavLink>

        <NavLink to="/seller/customers">
          <FaUsers />
          Customers
        </NavLink>

        <NavLink to="/seller/messages">
          <FaComments />
          Messages
        </NavLink>

        <NavLink to="/seller/coupons">
          <FaTags />
          Coupons
        </NavLink>

        <NavLink to="/seller/analytics">
          <FaChartLine />
          Analytics
        </NavLink>

        <NavLink to="/seller/settings">
          <FaCog />
          Settings
        </NavLink>

      </nav>

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <button
        className="logout-btn"
        type="button"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}