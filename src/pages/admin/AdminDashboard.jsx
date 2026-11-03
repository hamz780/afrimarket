import { useCallback, useEffect, useState } from "react";
import {
  getAdminStats,
  getAdminUsers,
} from "../../services/adminService.js";
import "./AdminDashboard.css";

const emptyStats = {
  totalCustomers: 0,
  totalSellers: 0,
  totalProducts: 0,
  totalOrders: 0,
  pendingOrders: 0,
  totalRevenue: 0,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(emptyStats);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResult, usersResult] = await Promise.all([
        getAdminStats(),
        getAdminUsers(),
      ]);

      console.log("ADMIN STATS RESPONSE:", statsResult);
      console.log("ADMIN USERS RESPONSE:", usersResult);

      const data =
        statsResult?.stats ??
        statsResult?.data?.stats ??
        statsResult?.data ??
        statsResult ??
        {};

      setStats({
        totalCustomers: Number(data.totalCustomers ?? 0),
        totalSellers: Number(data.totalSellers ?? 0),
        totalProducts: Number(data.totalProducts ?? 0),
        totalOrders: Number(data.totalOrders ?? 0),
        pendingOrders: Number(data.pendingOrders ?? 0),
        totalRevenue: Number(data.totalRevenue ?? 0),
      });

      setCustomers(Array.isArray(usersResult) ? usersResult : []);
    } catch (err) {
      console.error("Admin dashboard error:", err);

      setError(
        err?.message ||
          "Unable to load admin dashboard data. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const number = (value) =>
    new Intl.NumberFormat("en-US").format(Number(value || 0));

  const money = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(Number(value || 0));

  return (
    <div className="admin-dashboard">

      {/* ==============================
          HEADER
      ============================== */}

      <header className="admin-header">
        <div>
          <div className="admin-title-row">
            <span className="admin-badge">ADMIN</span>

            <span className="admin-live">
              <span className="live-dot"></span>
              System Online
            </span>
          </div>

          <h1>Admin Dashboard</h1>

          <p>
            Welcome back, Admin. Monitor and manage the entire AfriMarket
            marketplace from here.
          </p>
        </div>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={loadStats}
          disabled={loading}
        >
          <span
            className={
              loading
                ? "refresh-icon spinning"
                : "refresh-icon"
            }
          >
            ↻
          </span>

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {/* ==============================
          ERROR
      ============================== */}

      {error && (
        <div className="admin-error">
          <div>
            <strong>Unable to load dashboard data</strong>

            <p>{error}</p>
          </div>

          <button type="button" onClick={loadStats}>
            Try Again
          </button>
        </div>
      )}

      {/* ==============================
          STATISTICS
      ============================== */}

      <section className="admin-stats">

        {/* CUSTOMERS */}

        <div className="admin-stat-card customers-card">
          <div className="stat-card-top">
            <div className="stat-icon">👥</div>

            <span className="stat-label">
              CUSTOMERS
            </span>
          </div>

          <h2>
            {loading
              ? "..."
              : number(stats.totalCustomers)}
          </h2>

          <p>Registered customers</p>
        </div>

        {/* SELLERS */}

        <div className="admin-stat-card sellers-card">
          <div className="stat-card-top">
            <div className="stat-icon">🏪</div>

            <span className="stat-label">
              SELLERS
            </span>
          </div>

          <h2>
            {loading
              ? "..."
              : number(stats.totalSellers)}
          </h2>

          <p>Registered sellers</p>
        </div>

        {/* PRODUCTS */}

        <div className="admin-stat-card products-card">
          <div className="stat-card-top">
            <div className="stat-icon">📦</div>

            <span className="stat-label">
              PRODUCTS
            </span>
          </div>

          <h2>
            {loading
              ? "..."
              : number(stats.totalProducts)}
          </h2>

          <p>Marketplace products</p>
        </div>

        {/* ORDERS */}

        <div className="admin-stat-card orders-card">
          <div className="stat-card-top">
            <div className="stat-icon">🛒</div>

            <span className="stat-label">
              ORDERS
            </span>
          </div>

          <h2>
            {loading
              ? "..."
              : number(stats.totalOrders)}
          </h2>

          <p>All marketplace orders</p>
        </div>

      </section>

      {/* ==============================
          REVENUE + SUMMARY
      ============================== */}

      <section className="admin-main-grid">

        {/* REVENUE */}

        <div className="admin-panel revenue-panel">

          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                FINANCIAL OVERVIEW
              </span>

              <h2>Revenue Overview</h2>

              <p>
                Revenue generated from paid marketplace orders.
              </p>
            </div>

            <div className="panel-icon">
              💰
            </div>
          </div>

          <div className="revenue-number">
            {loading
              ? "..."
              : money(stats.totalRevenue)}
          </div>

          <div className="revenue-description">
            Total platform revenue
          </div>

          <div className="revenue-chart">

            <div className="chart-column">
              <span style={{ height: "35%" }}></span>
              <small>Jan</small>
            </div>

            <div className="chart-column">
              <span style={{ height: "50%" }}></span>
              <small>Feb</small>
            </div>

            <div className="chart-column">
              <span style={{ height: "43%" }}></span>
              <small>Mar</small>
            </div>

            <div className="chart-column">
              <span style={{ height: "65%" }}></span>
              <small>Apr</small>
            </div>

            <div className="chart-column">
              <span style={{ height: "58%" }}></span>
              <small>May</small>
            </div>

            <div className="chart-column">
              <span style={{ height: "78%" }}></span>
              <small>Jun</small>
            </div>

            <div className="chart-column">
              <span style={{ height: "92%" }}></span>
              <small>Jul</small>
            </div>

          </div>

        </div>

        {/* QUICK SUMMARY */}

        <div className="admin-panel summary-panel">

          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                MARKETPLACE
              </span>

              <h2>Quick Summary</h2>

              <p>
                Current AfriMarket activity.
              </p>
            </div>

            <div className="panel-icon">
              📊
            </div>
          </div>

          <div className="summary-list">

            <div className="summary-row">
              <span>Total Orders</span>

              <strong>
                {loading
                  ? "..."
                  : number(stats.totalOrders)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Pending Orders</span>

              <strong className="pending-value">
                {loading
                  ? "..."
                  : number(stats.pendingOrders)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Customers</span>

              <strong>
                {loading
                  ? "..."
                  : number(stats.totalCustomers)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Sellers</span>

              <strong>
                {loading
                  ? "..."
                  : number(stats.totalSellers)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Products</span>

              <strong>
                {loading
                  ? "..."
                  : number(stats.totalProducts)}
              </strong>
            </div>

            <div className="summary-row revenue-row">
              <span>Total Revenue</span>

              <strong>
                {loading
                  ? "..."
                  : money(stats.totalRevenue)}
              </strong>
            </div>

          </div>

        </div>

      </section>

      {/* ==============================
          MANAGEMENT
      ============================== */}

      <section className="admin-section">

        <div className="section-heading">

          <div>
            <span className="panel-kicker">
              MANAGEMENT
            </span>

            <h2>Marketplace Management</h2>

            <p>
              Quick access to the main administration areas.
            </p>
          </div>

        </div>

        <div className="management-grid">

          {/* CUSTOMERS */}

          <div className="management-card">

            <div className="management-icon">
              👥
            </div>

            <h3>Customers</h3>

            <p>
              Manage customer accounts, activity and marketplace access.
            </p>

            <button type="button">
              Manage Customers →
            </button>

          </div>

          {/* SELLERS */}

          <div className="management-card">

            <div className="management-icon">
              🏪
            </div>

            <h3>Sellers</h3>

            <p>
              Review sellers and manage marketplace seller accounts.
            </p>

            <button type="button">
              Manage Sellers →
            </button>

          </div>

          {/* PRODUCTS */}

          <div className="management-card">

            <div className="management-icon">
              📦
            </div>

            <h3>Products</h3>

            <p>
              Monitor products listed across the AfriMarket marketplace.
            </p>

            <button type="button">
              Manage Products →
            </button>

          </div>

          {/* ORDERS */}

          <div className="management-card">

            <div className="management-icon">
              🛒
            </div>

            <h3>Orders</h3>

            <p>
              Monitor customer orders and marketplace transactions.
            </p>

            <button type="button">
              Manage Orders →
            </button>

          </div>

        </div>

      </section>

      {/* ==============================
          CUSTOMERS
      ============================== */}

      <section className="admin-section customers-section">

        <div className="section-heading">

          <div>
            <span className="panel-kicker">
              CUSTOMER MANAGEMENT
            </span>

            <h2>Registered Customers</h2>

            <p>
              Real customer accounts retrieved directly from MongoDB.
            </p>
          </div>

          <div className="customers-count">
            {loading ? "..." : `${customers.length} Customers`}
          </div>

        </div>

        <div className="customers-table-wrapper">

          {loading ? (
            <div className="customers-loading">
              Loading customers...
            </div>
          ) : customers.length === 0 ? (
            <div className="customers-empty">
              No registered customers found.
            </div>
          ) : (
            <div className="customers-table">

              <div className="customer-table-header">
                <div>Customer</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Status</div>
                <div>Joined</div>
              </div>

              {customers.map((customer) => {

                const initials = (customer.name || "Customer")
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                const joinedDate = customer.createdAt
                  ? new Date(customer.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )
                  : "—";

                return (
                  <div
                    className="customer-table-row"
                    key={customer._id}
                  >

                    {/* CUSTOMER */}

                    <div className="customer-profile">

                      {customer.avatar ? (
                        <img
                          src={customer.avatar}
                          alt={customer.name || "Customer"}
                          className="customer-avatar"
                        />
                      ) : (
                        <div className="customer-avatar customer-avatar-fallback">
                          {initials}
                        </div>
                      )}

                      <div className="customer-name">
                        <strong>
                          {customer.name || "Unnamed Customer"}
                        </strong>

                        <span>
                          {customer.role || "customer"}
                        </span>
                      </div>

                    </div>

                    {/* EMAIL */}

                    <div className="customer-email">
                      {customer.email || "—"}
                    </div>

                    {/* PHONE */}

                    <div className="customer-phone">
                      {customer.phone || "—"}
                    </div>

                    {/* STATUS */}

                    <div>
                      <span
                        className={
                          customer.isActive
                            ? "customer-status active"
                            : "customer-status inactive"
                        }
                      >
                        <span className="status-dot"></span>

                        {customer.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>

                    {/* JOINED */}

                    <div className="customer-date">
                      {joinedDate}
                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </section>

      {/* ==============================
          PLATFORM HEALTH
      ============================== */}

      <section className="admin-panel health-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-kicker">
              SYSTEM
            </span>

            <h2>Platform Health</h2>

            <p>
              Current AfriMarket system status.
            </p>
          </div>

          <div className="panel-icon">
            ⚡
          </div>

        </div>

        <div className="health-grid">

          <div className="health-item">

            <div className="health-name">
              <span className="health-dot"></span>
              Backend API
            </div>

            <strong>
              Operational
            </strong>

          </div>

          <div className="health-item">

            <div className="health-name">
              <span className="health-dot"></span>
              Marketplace
            </div>

            <strong>
              Operational
            </strong>

          </div>

          <div className="health-item">

            <div className="health-name">
              <span className="health-dot"></span>
              Orders
            </div>

            <strong>
              Operational
            </strong>

          </div>

          <div className="health-item">

            <div className="health-name">
              <span className="health-dot"></span>
              Database
            </div>

            <strong>
              Connected
            </strong>

          </div>

        </div>

      </section>

    </div>
  );
}