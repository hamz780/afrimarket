import { useEffect, useState } from "react";

import {
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaDollarSign,
} from "react-icons/fa";

import "./OrderSummary.css";

const API_URL = "http://localhost:5000";

export default function OrderSummary() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("afrimarket-token") ||
          localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in as a seller.");
        }

        const response = await fetch(
          `${API_URL}/api/seller/orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log(
          "Real seller orders response:",
          data
        );

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to load seller orders."
          );
        }

        const orders = Array.isArray(data.orders)
          ? data.orders
          : [];

        let pendingOrders = 0;
        let processingOrders = 0;
        let totalRevenue = 0;

        orders.forEach((order) => {
          const status = String(
            order.status || ""
          ).toLowerCase();

          const paymentStatus = String(
            order.paymentStatus || ""
          ).toLowerCase();

          // -----------------------------
          // ORDER STATUS
          // -----------------------------

          if (status === "pending") {
            pendingOrders += 1;
          }

          if (
            status === "processing" ||
            status === "confirmed"
          ) {
            processingOrders += 1;
          }

          // -----------------------------
          // SELLER REVENUE
          // -----------------------------

          if (paymentStatus === "paid") {
            if (Array.isArray(order.items)) {
              order.items.forEach((item) => {
                const price = Number(
                  item.price || 0
                );

                const quantity = Number(
                  item.quantity || 0
                );

                totalRevenue +=
                  price * quantity;
              });
            }
          }
        });

        setSummary({
          totalOrders: orders.length,
          pendingOrders,
          processingOrders,
          totalRevenue,
        });
      } catch (err) {
        console.error(
          "Seller order summary error:",
          err
        );

        setError(
          err.message ||
            "Unable to load order statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: loading
        ? "..."
        : summary.totalOrders,
      icon: <FaShoppingBag />,
      className: "blue",
    },

    {
      title: "Pending",
      value: loading
        ? "..."
        : summary.pendingOrders,
      icon: <FaClock />,
      className: "orange",
    },

    {
      title: "Processing",
      value: loading
        ? "..."
        : summary.processingOrders,
      icon: <FaTruck />,
      className: "green",
    },

    {
      title: "Revenue",
      value: loading
        ? "..."
        : `$${summary.totalRevenue.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`,
      icon: <FaDollarSign />,
      className: "purple",
    },
  ];

  if (error) {
    return (
      <div className="order-summary">
        <div
          style={{
            width: "100%",
            padding: "20px",
            color: "#c0392b",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`summary-card ${card.className}`}
        >
          <div className="summary-icon">
            {card.icon}
          </div>

          <div>
            <h4>{card.title}</h4>

            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}