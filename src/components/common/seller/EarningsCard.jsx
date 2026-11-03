import { useEffect, useState } from "react";

import {
  FaWallet,
  FaMoneyBillWave,
  FaArrowUp,
  FaCalendarAlt,
} from "react-icons/fa";

import "./EarningsCard.css";

const API_URL = "http://localhost:5000";

export default function EarningsCard() {
  const [earnings, setEarnings] = useState({
    revenue: 0,
    thisMonthRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEarnings = async () => {
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
          `${API_URL}/api/seller/overview`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("Seller earnings response:", data);

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to load seller earnings."
          );
        }

        setEarnings({
          revenue: Number(
            data.stats?.revenue || 0
          ),
          thisMonthRevenue: Number(
            data.stats?.thisMonthRevenue || 0
          ),
        });
      } catch (err) {
        console.error(
          "Seller earnings error:",
          err
        );

        setError(
          err.message ||
            "Unable to load seller earnings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  const formatMoney = (amount) => {
    return `$${Number(amount || 0).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const handleWithdraw = () => {
    alert(
      "Withdrawal functionality will be connected to your seller payout system."
    );
  };

  if (loading) {
    return (
      <section className="earnings-card">

        <div className="earnings-header">
          <div>
            <h2>
              <FaWallet /> Earnings
            </h2>

            <p>
              Loading your store revenue...
            </p>
          </div>
        </div>

        <div className="earnings-grid">

          <div className="earning-box">
            <FaMoneyBillWave />

            <h3>Total Revenue</h3>

            <h1>Loading...</h1>
          </div>

          <div className="earning-box">
            <FaCalendarAlt />

            <h3>This Month</h3>

            <h1>Loading...</h1>
          </div>

        </div>

      </section>
    );
  }

  if (error) {
    return (
      <section className="earnings-card">

        <div className="earnings-header">
          <div>
            <h2>
              <FaWallet /> Earnings
            </h2>

            <p>
              Your store revenue overview
            </p>
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            color: "#c0392b",
          }}
        >
          {error}
        </div>

      </section>
    );
  }

  return (
    <section className="earnings-card">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="earnings-header">

        <div>
          <h2>
            <FaWallet /> Earnings
          </h2>

          <p>
            Your real store revenue overview
          </p>
        </div>

        <span className="earnings-badge">
          <FaArrowUp />
          Live
        </span>

      </div>

      {/* =====================================================
          REAL DATABASE REVENUE
      ===================================================== */}

      <div className="earnings-grid">

        <div className="earning-box">

          <FaMoneyBillWave />

          <h3>Total Revenue</h3>

          <h1>
            {formatMoney(
              earnings.revenue
            )}
          </h1>

        </div>

        <div className="earning-box">

          <FaCalendarAlt />

          <h3>This Month</h3>

          <h1>
            {formatMoney(
              earnings.thisMonthRevenue
            )}
          </h1>

        </div>

      </div>

      {/* =====================================================
          REVENUE FOOTER
      ===================================================== */}

      <div className="earnings-footer">

        <div>

          <span>
            Recorded Revenue
          </span>

          <strong>
            {formatMoney(
              earnings.revenue
            )}
          </strong>

        </div>

        <button
          type="button"
          onClick={handleWithdraw}
        >
          Withdraw Funds
        </button>

      </div>

    </section>
  );
}