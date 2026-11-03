import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaStar,
  FaEnvelope,
  FaTicketAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaStore,
} from "react-icons/fa";

import "./Sidebar.css";

const menuItems = [
  {
    name: "Dashboard",
    path: "/seller/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <FaBoxOpen />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <FaShoppingBag />,
  },
  {
    name: "Customers",
    path: "/seller/customers",
    icon: <FaUsers />,
  },
  {
    name: "Reviews",
    path: "/seller/reviews",
    icon: <FaStar />,
  },
  {
    name: "Messages",
    path: "/seller/messages",
    icon: <FaEnvelope />,
  },
  {
    name: "Coupons",
    path: "/seller/coupons",
    icon: <FaTicketAlt />,
  },
  {
    name: "Analytics",
    path: "/seller/analytics",
    icon: <FaChartLine />,
  },
  {
    name: "Settings",
    path: "/seller/settings",
    icon: <FaCog />,
  },
];

export default function Sidebar() {
  return (
    <aside className="seller-sidebar">

      <div className="seller-logo">
        <FaStore />

        <div>
          <h2>AfriMarket</h2>
          <span>Seller Panel</span>
        </div>
      </div>

      <nav className="seller-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/seller/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "seller-link active"
                : "seller-link"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      <div className="seller-sidebar-footer">

        <button
          type="button"
          className="logout-btn"
          onClick={() => alert("Logout will be connected later.")}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}