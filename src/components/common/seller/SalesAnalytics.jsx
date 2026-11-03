import { useEffect, useState } from "react";
import "./SalesAnalytics.css";

const API_URL = "http://localhost:5000";

export default function SalesAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
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
          `${API_URL}/api/seller/analytics`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("Seller analytics response:", data);

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load seller analytics."
          );
        }

        setAnalytics(data.analytics);
      } catch (err) {
        console.error("Seller analytics error:", err);
        setError(
          err.message || "Unable to load seller analytics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <section className="sales-analytics">
        <div className="sales-analytics-header">
          <div>
            <h2>Sales Analytics</h2>
            <p>Loading your real store analytics...</p>
          </div>
        </div>

        <div className="sales-summary">
          <div className="sales-stat">
            <span>Total Sales</span>
            <strong>Loading...</strong>
          </div>

          <div className="sales-stat">
            <span>Total Orders</span>
            <strong>Loading...</strong>
          </div>

          <div className="sales-stat">
            <span>Average Order</span>
            <strong>Loading...</strong>
          </div>

          <div className="sales-stat">
            <span>Conversion Rate</span>
            <strong>—</strong>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="sales-analytics">
        <div className="sales-analytics-header">
          <div>
            <h2>Sales Analytics</h2>
            <p>Track your store sales and performance.</p>
          </div>
        </div>

        <div className="sales-error">
          {error}
        </div>
      </section>
    );
  }

  if (!analytics) {
    return null;
  }

  const totalSales = Number(analytics.totalSales || 0);
  const totalOrders = Number(analytics.totalOrders || 0);
  const paidOrders = Number(analytics.paidOrders || 0);
  const averageOrder = Number(analytics.averageOrder || 0);

  const monthlySales = Array.isArray(analytics.monthlySales)
    ? analytics.monthlySales
    : [];

  const maxSales = Math.max(
    ...monthlySales.map((item) =>
      Number(item.sales || 0)
    ),
    1
  );

  return (
    <section className="sales-analytics">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="sales-analytics-header">

        <div>
          <h2>Sales Analytics</h2>

          <p>
            Real sales data from your AfriMarket store.
          </p>
        </div>

        <select defaultValue="year">
          <option value="year">
            Current Year
          </option>

          <option value="30">
            Last 30 Days
          </option>

          <option value="90">
            Last 90 Days
          </option>

          <option value="365">
            Last Year
          </option>
        </select>

      </div>

      {/* =====================================================
          REAL DATABASE SUMMARY
      ===================================================== */}

      <div className="sales-summary">

        <div className="sales-stat">

          <span>Total Sales</span>

          <strong>
            ${totalSales.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </strong>

          <small className="positive">
            From paid orders
          </small>

        </div>

        <div className="sales-stat">

          <span>Total Orders</span>

          <strong>
            {totalOrders.toLocaleString()}
          </strong>

          <small className="positive">
            {paidOrders.toLocaleString()} paid
          </small>

        </div>

        <div className="sales-stat">

          <span>Average Order</span>

          <strong>
            ${averageOrder.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </strong>

          <small className="positive">
            Based on paid orders
          </small>

        </div>

        <div className="sales-stat">

          <span>Conversion Rate</span>

          <strong>—</strong>

          <small>
            Requires visitor data
          </small>

        </div>

      </div>

      {/* =====================================================
          SALES CHART
      ===================================================== */}

      <div className="sales-chart">

        <div className="chart-title">

          <h3>Sales Performance</h3>

          <span>
            Real revenue over time
          </span>

        </div>

        <div className="chart-area">

          {monthlySales.length === 0 ? (

            <div className="no-sales-data">
              No sales data available yet.
            </div>

          ) : (

            <div className="chart-bars">

              {monthlySales.map(
                (item, index) => {

                  const sales =
                    Number(item.sales || 0);

                  const height =
                    sales === 0
                      ? 2
                      : Math.max(
                          (sales / maxSales) * 100,
                          5
                        );

                  return (
                    <div
                      className="bar"
                      key={`${item.month}-${index}`}
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${item.month}: $${sales.toFixed(
                        2
                      )}`}
                    />
                  );
                }
              )}

            </div>

          )}

        </div>

        <div className="chart-labels">

          {monthlySales.map(
            (item, index) => (
              <span key={`${item.month}-label-${index}`}>
                {item.month}
              </span>
            )
          )}

        </div>

      </div>

    </section>
  );
}