import { useEffect, useState } from "react";

import {
  FaDollarSign,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaStar,
  FaArrowUp,
} from "react-icons/fa";

import "./SellerOverview.css";

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:5000";

// =====================================================
// GET AUTH TOKEN
// =====================================================

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("afrimarket-token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken")
  );
};

// =====================================================
// FORMAT MONEY
// =====================================================

const formatMoney = (value) => {
  const number = Number(value || 0);

  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// =====================================================
// SELLER OVERVIEW
// =====================================================

export default function SellerOverview() {
  const [stats, setStats] = useState(null);
  const [seller, setSeller] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // LOAD SELLER DATA
  // ===================================================

  useEffect(() => {
    let isMounted = true;

    const loadSellerOverview = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        // -----------------------------------------------
        // CHECK LOGIN
        // -----------------------------------------------

        if (!token) {
          throw new Error(
            "You are not logged in. Please log in as a seller."
          );
        }

        // -----------------------------------------------
        // REQUEST SELLER OVERVIEW
        // -----------------------------------------------

        const response = await fetch(
          `${API_URL}/api/seller/overview`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // -----------------------------------------------
        // READ RESPONSE SAFELY
        // -----------------------------------------------

        let data;

        try {
          data = await response.json();
        } catch {
          throw new Error(
            "The server returned an invalid response."
          );
        }

        // -----------------------------------------------
        // HANDLE AUTHORIZATION ERROR
        // -----------------------------------------------

        if (response.status === 401) {
          throw new Error(
            "Your login session has expired. Please log in again."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "You do not have permission to access the seller dashboard."
          );
        }

        // -----------------------------------------------
        // HANDLE OTHER API ERRORS
        // -----------------------------------------------

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.message ||
              "Failed to load seller dashboard statistics."
          );
        }

        // -----------------------------------------------
        // SAVE DATA
        // -----------------------------------------------

        if (isMounted) {
          setStats(data.stats || {});
          setSeller(data.seller || null);
        }
      } catch (err) {
        console.error(
          "Seller overview error:",
          err
        );

        if (isMounted) {
          setError(
            err?.message ||
              "Failed to load seller dashboard."
          );

          setStats(null);
          setSeller(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSellerOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  // ===================================================
  // LOADING STATE
  // ===================================================

  if (loading) {
    return (
      <section className="seller-overview">
        <div className="overview-loading">
          Loading seller statistics...
        </div>
      </section>
    );
  }

  // ===================================================
  // ERROR STATE
  // ===================================================

  if (error) {
    return (
      <section className="seller-overview">
        <div className="overview-error">
          <strong>Unable to load seller statistics</strong>

          <span>{error}</span>
        </div>
      </section>
    );
  }

  // ===================================================
  // SELLER STATISTICS
  // ===================================================

  const sellerStats = [
    {
      title: "Revenue",

      value: `$${formatMoney(
        stats?.revenue
      )}`,

      icon: <FaDollarSign />,

      color: "green",

      growth: `$${formatMoney(
        stats?.thisMonthRevenue
      )} this month`,
    },

    {
      title: "Products",

      value: Number(
        stats?.products || 0
      ).toLocaleString(),

      icon: <FaBoxOpen />,

      color: "blue",

      growth: `${Number(
        stats?.itemsSold || 0
      ).toLocaleString()} items sold`,
    },

    {
      title: "Orders",

      value: Number(
        stats?.orders || 0
      ).toLocaleString(),

      icon: <FaShoppingCart />,

      color: "orange",

      growth: "Real orders",
    },

    {
      title: "Customers",

      value: Number(
        stats?.customers || 0
      ).toLocaleString(),

      icon: <FaUsers />,

      color: "purple",

      growth: "Unique customers",
    },

    {
      title: "Rating",

      value: Number(
        stats?.rating || 0
      ).toFixed(1),

      icon: <FaStar />,

      color: "yellow",

      growth: `${Number(
        stats?.reviews || 0
      ).toLocaleString()} reviews`,
    },

    {
      title: "Items Sold",

      value: Number(
        stats?.itemsSold || 0
      ).toLocaleString(),

      icon: <FaArrowUp />,

      color: "red",

      growth: "Total items sold",
    },
  ];

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section className="seller-overview">

      {/* =================================================
          OPTIONAL SELLER GREETING
      ================================================= */}

      {seller?.name && (
        <div className="seller-overview-welcome">
          <div>
            <h2>
              Welcome back, {seller.name}
            </h2>

            <p>
              Here's how your store is performing.
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="seller-overview-grid">

        {sellerStats.map((item) => (
          <div
            className={`overview-card ${item.color}`}
            key={item.title}
          >
            {/* ICON */}

            <div className="overview-icon">
              {item.icon}
            </div>

            {/* INFORMATION */}

            <div className="overview-info">

              <span>
                {item.title}
              </span>

              <h2>
                {item.value}
              </h2>

              <small>
                {item.growth}
              </small>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
}