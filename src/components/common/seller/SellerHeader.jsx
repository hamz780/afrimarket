import { useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import "./SellerHeader.css";

export default function SellerHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("afrimarket-user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        console.log("Seller header user:", parsedUser);
      } catch (error) {
        console.error(
          "Could not parse afrimarket-user:",
          error
        );
      }
    }
  }, []);

  const sellerName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Seller";

  return (
    <header className="seller-header">
      <div>
        <h1>Seller Dashboard</h1>

        <p>
          Welcome back, {sellerName}. Here's what's happening
          in your store today.
        </p>
      </div>

      <div className="seller-header-right">
        <div className="seller-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search products, orders..."
          />
        </div>

        <button
          className="seller-icon-btn"
          type="button"
          aria-label="Notifications"
        >
          <FaBell />
        </button>

        <button
          className="seller-profile-btn"
          type="button"
          aria-label="Seller profile"
          title={user?.email || "Seller Profile"}
        >
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
}