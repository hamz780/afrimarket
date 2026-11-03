import { useEffect, useState } from "react";

import { getSellerAnalytics } from "../../../../services/sellerService";

import "./Analytics.css";

export default function AnalyticsCards() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD REAL SELLER ANALYTICS
  // =====================================================

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSellerAnalytics();

        console.log(
          "✅ Real seller analytics:",
          data
        );

        setAnalytics(data.analytics);
      } catch (error) {
        console.error(
          "❌ Seller analytics error:",
          error
        );

        setError(
          error.message ||
            "Failed to load seller analytics"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="analytics-cards">
        <div className="analytics-loading">
          Loading real seller analytics...
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="analytics-cards">
        <div className="analytics-error">
          {error}
        </div>
      </div>
    );
  }

  // =====================================================
  // REAL DATABASE VALUES
  // =====================================================

  const totalSales = Number(
    analytics?.totalSales || 0
  );

  const totalOrders = Number(
    analytics?.totalOrders || 0
  );

  const paidOrders = Number(
    analytics?.paidOrders || 0
  );

  const totalItemsSold = Number(
    analytics?.totalItemsSold || 0
  );

  const averageOrder = Number(
    analytics?.averageOrder || 0
  );

  // =====================================================
  // PAYMENT RATE
  // =====================================================

  const conversion =
    totalOrders > 0
      ? ((paidOrders / totalOrders) * 100).toFixed(1)
      : "0.0";

  // =====================================================
  // CARDS
  // =====================================================

  const cards = [
    {
      title: "Total Revenue",

      value: `$${totalSales.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,

      change:
        totalItemsSold > 0
          ? `${totalItemsSold.toLocaleString()} items sold`
          : "No sales yet",

      icon: "💰",

      color: "green",
    },

    {
      title: "Orders",

      value: totalOrders.toLocaleString(),

      change:
        paidOrders > 0
          ? `${paidOrders.toLocaleString()} paid`
          : "No paid orders",

      icon: "📦",

      color: "blue",
    },

    {
      title: "Average Order",

      value: `$${averageOrder.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,

      change:
        totalOrders > 0
          ? "Based on seller orders"
          : "No orders yet",

      icon: "🛒",

      color: "orange",
    },

    {
      title: "Payment Rate",

      value: `${conversion}%`,

      change:
        totalOrders > 0
          ? `${paidOrders.toLocaleString()} of ${totalOrders.toLocaleString()} orders paid`
          : "No orders yet",

      icon: "📈",

      color: "purple",
    },
  ];

  // =====================================================
  // DISPLAY
  // =====================================================

  return (
    <div className="analytics-cards">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`analytics-card ${card.color}`}
        >
          <div className="analytics-icon">
            {card.icon}
          </div>

          <div className="analytics-info">
            <h4>{card.title}</h4>

            <h2>{card.value}</h2>

            <span>{card.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}