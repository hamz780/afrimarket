import { useEffect, useState } from "react";
import { getSellerAnalytics } from "../../../../services/sellerService";
import "./Analytics.css";

export default function SalesChart() {
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSales = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSellerAnalytics();

        console.log(
          "Real seller analytics:",
          data
        );

        setMonthlySales(
          data?.analytics?.monthlySales || []
        );
      } catch (error) {
        console.error(
          "Sales chart error:",
          error
        );

        setError(
          error.message ||
            "Failed to load sales data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadSales();
  }, []);

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="analytics-panel">
        <div className="analytics-panel-header">
          <h3>📈 Monthly Sales</h3>
          <span>MongoDB</span>
        </div>

        <div className="analytics-loading">
          Loading real sales data...
        </div>
      </div>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error) {
    return (
      <div className="analytics-panel">
        <div className="analytics-panel-header">
          <h3>📈 Monthly Sales</h3>
        </div>

        <div className="analytics-error">
          {error}
        </div>
      </div>
    );
  }

  // ===================================================
  // REAL DATABASE DATA
  // ===================================================

  const salesData =
    monthlySales.length > 0
      ? monthlySales
      : [
          { month: "Jan", sales: 0 },
          { month: "Feb", sales: 0 },
          { month: "Mar", sales: 0 },
          { month: "Apr", sales: 0 },
          { month: "May", sales: 0 },
          { month: "Jun", sales: 0 },
          { month: "Jul", sales: 0 },
          { month: "Aug", sales: 0 },
          { month: "Sep", sales: 0 },
          { month: "Oct", sales: 0 },
          { month: "Nov", sales: 0 },
          { month: "Dec", sales: 0 },
        ];

  const maxValue = Math.max(
    ...salesData.map(
      (item) => Number(item.sales) || 0
    ),
    1
  );

  // ===================================================
  // DISPLAY
  // ===================================================

  return (
    <div className="analytics-panel">
      <div className="analytics-panel-header">
        <div>
          <h3>📈 Monthly Sales</h3>
          <p>Real seller sales from MongoDB</p>
        </div>

        <span>This Year</span>
      </div>

      <div
        className="sales-chart-container"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "12px",
          minHeight: "280px",
          paddingTop: "25px",
        }}
      >
        {salesData.map((item) => {
          const sales = Number(
            item.sales || 0
          );

          const height =
            sales > 0
              ? Math.max(
                  (sales / maxValue) * 220,
                  8
                )
              : 4;

          return (
            <div
              key={item.month}
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "260px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                $
                {sales.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                )}
              </span>

              <div
                style={{
                  width: "100%",
                  maxWidth: "55px",
                  height: `${height}px`,
                  borderRadius:
                    "8px 8px 0 0",
                  background:
                    "linear-gradient(180deg, #f59e0b, #d97706)",
                  transition:
                    "height 0.4s ease",
                }}
              />

              <span
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {salesData.every(
        (item) =>
          Number(item.sales || 0) === 0
      ) && (
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          No paid sales yet. Your chart
          will update automatically when
          customers purchase your products.
        </div>
      )}
    </div>
  );
}