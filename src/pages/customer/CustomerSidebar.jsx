import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

import "./CustomerSidebar.css";

export default function CustomerSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("afrimarket-user");
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      label: "My Orders",
      path: "/customer/orders",
      icon: <FaShoppingBag />,
    },
    {
      label: "Wishlist",
      path: "/customer/wishlist",
      icon: <FaHeart />,
    },
    {
      label: "Addresses",
      path: "/customer/addresses",
      icon: <FaMapMarkerAlt />,
    },
    {
      label: "Payment Methods",
      path: "/customer/payments",
      icon: <FaCreditCard />,
    },
    {
      label: "Reviews",
      path: "/customer/reviews",
      icon: <FaStar />,
    },
    {
      label: "Notifications",
      path: "/customer/notifications",
      icon: <FaBell />,
    },
    {
      label: "Settings",
      path: "/customer/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className="customer-sidebar">

      {/* Logo */}
      <div className="customer-sidebar-header">
        <div className="customer-logo">
          🌍 <span>AfriMarket</span>
        </div>

        <p>Customer Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="customer-sidebar-nav">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `customer-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="customer-sidebar-icon">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}
      <div className="customer-sidebar-footer">

        <button
          type="button"
          className="customer-logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}