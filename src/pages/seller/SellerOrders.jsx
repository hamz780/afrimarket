import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaPlus,
  FaDownload,
  FaPrint,
  FaFilter,
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaDollarSign,
} from "react-icons/fa";

import Sidebar from "../../components/seller/Sidebar";
import Topbar from "../../components/seller/Topbar";
import Button from "../../components/ui/Button";
import OrderFilters from "../../components/seller/orders/OrderFilters";
import OrderTable from "../../components/seller/orders/OrderTable";
import Card from "../../components/ui/Card";

import "./SellerOrders.css";

// =====================================================
// STATUS OPTIONS
// =====================================================

const STATUS_OPTIONS = {
  ALL: "All",
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

// =====================================================
// PAYMENT OPTIONS
// =====================================================

const PAYMENT_OPTIONS = {
  ALL: "All",
  PAID: "Paid",
  UNPAID: "Unpaid",
  REFUNDED: "Refunded",
  FAILED: "Failed",
};

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:5000";

// =====================================================
// DATE FORMATTER
// =====================================================

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// =====================================================
// MONEY NORMALIZER
// =====================================================

const getOrderTotal = (order) => {
  const possibleValues = [
    order?.total,
    order?.totalAmount,
    order?.amount,
    order?.grandTotal,
    order?.price,
  ];

  for (const value of possibleValues) {
    const number = Number(value);

    if (Number.isFinite(number)) {
      return number;
    }
  }

  return 0;
};

// =====================================================
// NORMALIZE STATUS
// =====================================================

const normalizeStatus = (status) => {
  if (!status) {
    return STATUS_OPTIONS.PENDING;
  }

  const value = String(status).trim().toLowerCase();

  const statusMap = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    canceled: "Cancelled",
    refunded: "Refunded",
  };

  return statusMap[value] || status;
};

// =====================================================
// NORMALIZE PAYMENT
// =====================================================

const normalizePayment = (payment) => {
  if (!payment) {
    return "Pending";
  }

  const value = String(payment).trim().toLowerCase();

  const paymentMap = {
    paid: "Paid",
    pending: "Pending",
    unpaid: "Unpaid",
    refunded: "Refunded",
    failed: "Failed",
  };

  return paymentMap[value] || payment;
};

// =====================================================
// NORMALIZE CUSTOMER NAME
// =====================================================

const getCustomerName = (order) => {
  if (order?.customer?.name) {
    return order.customer.name;
  }

  if (order?.customer?.fullName) {
    return order.customer.fullName;
  }

  if (typeof order?.customer === "string") {
    return order.customer;
  }

  if (order?.user?.name) {
    return order.user.name;
  }

  if (order?.user?.fullName) {
    return order.user.fullName;
  }

  if (order?.user?.email) {
    return order.user.email;
  }

  if (order?.email) {
    return order.email;
  }

  return "Customer";
};

// =====================================================
// NORMALIZE CUSTOMER EMAIL
// =====================================================

const getCustomerEmail = (order) => {
  if (order?.customer?.email) {
    return order.customer.email;
  }

  if (order?.user?.email) {
    return order.user.email;
  }

  if (order?.email) {
    return order.email;
  }

  return "";
};

// =====================================================
// NORMALIZE ORDER ID
// =====================================================

const getOrderId = (order) => {
  return (
    order?.id ||
    order?._id ||
    order?.orderId ||
    order?.orderNumber ||
    "N/A"
  );
};

// =====================================================
// NORMALIZE ORDER
// =====================================================

const normalizeOrder = (order) => {
  return {
    ...order,

    id: getOrderId(order),

    customer: getCustomerName(order),

    email: getCustomerEmail(order),

    status: normalizeStatus(order?.status),

    payment: normalizePayment(
      order?.payment ||
        order?.paymentStatus ||
        order?.paymentMethodStatus
    ),

    total: getOrderTotal(order),

    date:
      order?.date ||
      order?.createdAt ||
      order?.orderDate ||
      order?.updatedAt ||
      null,
  };
};

// =====================================================
// SELLER ORDERS PAGE
// =====================================================

export default function SellerOrders() {
  const navigate = useNavigate();

  // ===================================================
  // STATE
  // ===================================================

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState(STATUS_OPTIONS.ALL);

  const [payment, setPayment] = useState(PAYMENT_OPTIONS.ALL);

  const [sortBy, setSortBy] = useState("date");

  const [sortOrder, setSortOrder] = useState("desc");

  const [selectedOrders, setSelectedOrders] = useState([]);

  const [showBulkActions, setShowBulkActions] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  // ===================================================
  // GET AUTH TOKEN
  // ===================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("afrimarket-token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );
  };

  // ===================================================
  // LOAD SELLER ORDERS
  // ===================================================

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "You are not logged in. Please log in again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/seller/orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to load seller orders."
        );
      }

      // -----------------------------------------------
      // Support multiple backend response formats
      // -----------------------------------------------

      const serverOrders =
        Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
          ? data.orders
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.orders)
          ? data.data.orders
          : [];

      const normalizedOrders =
        serverOrders.map(normalizeOrder);

      setOrders(normalizedOrders);

      // Remove selections that no longer exist
      setSelectedOrders((previous) =>
        previous.filter((selectedId) =>
          normalizedOrders.some(
            (order) =>
              String(order.id) ===
              String(selectedId)
          )
        )
      );
    } catch (err) {
      console.error(
        "Seller orders error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load seller orders."
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // LOAD ORDERS WHEN PAGE OPENS
  // ===================================================

  useEffect(() => {
    loadOrders();
  }, []);

  // ===================================================
  // FILTER + SORT ORDERS
  // ===================================================

  const filteredOrders = useMemo(() => {
    let result = orders.filter((order) => {
      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        order.customer
          ?.toLowerCase()
          .includes(searchValue) ||
        order.email
          ?.toLowerCase()
          .includes(searchValue) ||
        String(order.id)
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === STATUS_OPTIONS.ALL ||
        order.status === status;

      const matchesPayment =
        payment === PAYMENT_OPTIONS.ALL ||
        order.payment === payment;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });

    // -----------------------------------------------
    // SORT
    // -----------------------------------------------

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison =
            new Date(a.date || 0) -
            new Date(b.date || 0);
          break;

        case "customer":
          comparison =
            a.customer?.localeCompare(
              b.customer || ""
            ) || 0;
          break;

        case "total":
          comparison =
            getOrderTotal(a) -
            getOrderTotal(b);
          break;

        case "status":
          comparison =
            (a.status || "").localeCompare(
              b.status || ""
            );
          break;

        default:
          comparison = 0;
      }

      return sortOrder === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    orders,
    search,
    status,
    payment,
    sortBy,
    sortOrder,
  ]);

  // ===================================================
  // STATISTICS
  // ===================================================

  const stats = useMemo(() => {
    const total = orders.length;

    const pending = orders.filter(
      (order) =>
        order.status ===
        STATUS_OPTIONS.PENDING
    ).length;

    const processing = orders.filter(
      (order) =>
        order.status ===
        STATUS_OPTIONS.PROCESSING
    ).length;

    const shipped = orders.filter(
      (order) =>
        order.status ===
        STATUS_OPTIONS.SHIPPED
    ).length;

    const delivered = orders.filter(
      (order) =>
        order.status ===
        STATUS_OPTIONS.DELIVERED
    ).length;

    const cancelled = orders.filter(
      (order) =>
        order.status ===
        STATUS_OPTIONS.CANCELLED
    ).length;

    const refunded = orders.filter(
      (order) =>
        order.status ===
        STATUS_OPTIONS.REFUNDED
    ).length;

    const revenue = orders.reduce(
      (sum, order) => {
        if (
          order.status ===
            STATUS_OPTIONS.CANCELLED ||
          order.status ===
            STATUS_OPTIONS.REFUNDED
        ) {
          return sum;
        }

        return (
          sum + getOrderTotal(order)
        );
      },
      0
    );

    return {
      total,
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
      refunded,
      revenue,
    };
  }, [orders]);

  // ===================================================
  // UPDATE ORDER STATUS
  // ===================================================

  async function handleStatusUpdate(
    orderId,
    newStatus
  ) {
    try {
      const token = getToken();

      if (!token) {
        throw new Error(
          "You are not logged in. Please log in again."
        );
      }

      setUpdatingOrderId(orderId);

      const response = await fetch(
        `${API_URL}/api/seller/orders/${orderId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to update order status."
        );
      }

      // -----------------------------------------------
      // Update local state immediately
      // -----------------------------------------------

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          String(order.id) ===
          String(orderId)
            ? {
                ...order,
                status:
                  normalizeStatus(
                    newStatus
                  ),
              }
            : order
        )
      );
    } catch (err) {
      console.error(
        "Update order status error:",
        err
      );

      alert(
        err?.message ||
          "Failed to update order status. Please try again."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }

  // ===================================================
  // DELETE ORDER
  // ===================================================

  async function handleDelete(orderId) {
    if (isDeleting) return;

    const confirmed = window.confirm(
      "Delete this order? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const token = getToken();

      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }

      const response = await fetch(
        `${API_URL}/api/seller/orders/${orderId}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to delete order."
        );
      }

      // Remove deleted order immediately
      setOrders((previousOrders) =>
        previousOrders.filter(
          (order) =>
            String(order.id) !==
            String(orderId)
        )
      );

      setSelectedOrders((previous) =>
        previous.filter(
          (id) =>
            String(id) !==
            String(orderId)
        )
      );
    } catch (err) {
      console.error(
        "Delete order error:",
        err
      );

      alert(
        err?.message ||
          "Failed to delete order. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  // ===================================================
  // VIEW ORDER
  // ===================================================

  function handleView(order) {
    navigate(
      `/seller/orders/${order.id}`,
      {
        state: {
          order,
          returnPath: "/seller/orders",
        },
      }
    );
  }

  // ===================================================
  // SELECT ORDER
  // ===================================================

  function toggleOrderSelection(orderId) {
    setSelectedOrders((previous) =>
      previous.includes(orderId)
        ? previous.filter(
            (id) => id !== orderId
          )
        : [...previous, orderId]
    );
  }

  // ===================================================
  // SELECT ALL
  // ===================================================

  function toggleSelectAll() {
    if (
      filteredOrders.length === 0
    ) {
      return;
    }

    if (
      selectedOrders.length ===
      filteredOrders.length
    ) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(
        filteredOrders.map(
          (order) => order.id
        )
      );
    }
  }

  // ===================================================
  // BULK DELETE
  // ===================================================

  async function handleBulkDelete() {
    if (selectedOrders.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selectedOrders.length} selected order(s)? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const token = getToken();

      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }

      const results =
        await Promise.all(
          selectedOrders.map(
            async (orderId) => {
              const response =
                await fetch(
                  `${API_URL}/api/seller/orders/${orderId}`,
                  {
                    method: "DELETE",

                    headers: {
                      "Content-Type":
                        "application/json",

                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

              if (!response.ok) {
                let data = {};

                try {
                  data =
                    await response.json();
                } catch {
                  data = {};
                }

                throw new Error(
                  data?.message ||
                    `Failed to delete order ${orderId}.`
                );
              }

              return orderId;
            }
          )
        );

      // Remove deleted orders
      setOrders((previousOrders) =>
        previousOrders.filter(
          (order) =>
            !results.some(
              (deletedId) =>
                String(deletedId) ===
                String(order.id)
            )
        )
      );

      setSelectedOrders([]);

      setShowBulkActions(false);
    } catch (err) {
      console.error(
        "Bulk delete error:",
        err
      );

      alert(
        err?.message ||
          "Failed to delete selected orders."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  // ===================================================
  // BULK STATUS UPDATE
  // ===================================================

  async function handleBulkStatusUpdate(
    newStatus
  ) {
    if (selectedOrders.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Update ${selectedOrders.length} selected order(s) to "${newStatus}"?`
    );

    if (!confirmed) return;

    try {
      const token = getToken();

      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }

      setUpdatingOrderId("bulk");

      await Promise.all(
        selectedOrders.map(
          async (orderId) => {
            const response =
              await fetch(
                `${API_URL}/api/seller/orders/${orderId}/status`,
                {
                  method: "PUT",

                  headers: {
                    "Content-Type":
                      "application/json",

                    Authorization: `Bearer ${token}`,
                  },

                  body: JSON.stringify({
                    status: newStatus,
                  }),
                }
              );

            if (!response.ok) {
              let data = {};

              try {
                data =
                  await response.json();
              } catch {
                data = {};
              }

              throw new Error(
                data?.message ||
                  `Failed to update order ${orderId}.`
              );
            }
          }
        )
      );

      // Update local orders
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          selectedOrders.some(
            (selectedId) =>
              String(selectedId) ===
              String(order.id)
          )
            ? {
                ...order,
                status:
                  normalizeStatus(
                    newStatus
                  ),
              }
            : order
        )
      );

      setSelectedOrders([]);

      setShowBulkActions(false);
    } catch (err) {
      console.error(
        "Bulk status update error:",
        err
      );

      alert(
        err?.message ||
          "Failed to update selected orders."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }

  // ===================================================
  // EXPORT CSV
  // ===================================================

  function handleExport() {
    try {
      if (filteredOrders.length === 0) {
        alert(
          "There are no orders to export."
        );
        return;
      }

      const exportData =
        filteredOrders.map(
          (order) => ({
            ID: order.id,
            Customer: order.customer,
            Email: order.email,
            Status: order.status,
            Payment: order.payment,
            Total: getOrderTotal(
              order
            ).toFixed(2),
            Date: formatDate(
              order.date
            ),
          })
        );

      const headers = Object.keys(
        exportData[0]
      );

      const csvContent = [
        headers.join(","),
        ...exportData.map(
          (row) =>
            headers
              .map(
                (header) =>
                  `"${String(
                    row[header] ?? ""
                  ).replace(
                    /"/g,
                    '""'
                  )}"`
              )
              .join(",")
        ),
      ].join("\n");

      const blob = new Blob(
        [csvContent],
        {
          type: "text/csv",
        }
      );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `seller-orders-${
        new Date()
          .toISOString()
          .split("T")[0]
      }.csv`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(
        "Export error:",
        err
      );

      alert(
        "Failed to export orders."
      );
    }
  }

  // ===================================================
  // CLEAR FILTERS
  // ===================================================

  function clearFilters() {
    setSearch("");

    setStatus(
      STATUS_OPTIONS.ALL
    );

    setPayment(
      PAYMENT_OPTIONS.ALL
    );

    setSortBy("date");

    setSortOrder("desc");
  }

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="seller-dashboard">
      <Sidebar />

      <div className="seller-main">
        <Topbar />

        <div className="seller-content">

          {/* =========================================
              PAGE HEADER
          ========================================= */}

          <div className="page-header">
            <div>
              <h1>Orders</h1>

              <p>
                Manage and track customer
                orders efficiently.
              </p>
            </div>

            <div className="header-actions">

              <Button
                variant="secondary"
                onClick={
                  handleExport
                }
                disabled={
                  loading ||
                  filteredOrders.length ===
                    0
                }
              >
                <FaDownload />
                Export
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  window.print()
                }
              >
                <FaPrint />
                Print
              </Button>

              <Button
                onClick={() =>
                  navigate(
                    "/seller/products"
                  )
                }
              >
                <FaPlus />
                Products
              </Button>

            </div>
          </div>

          {/* =========================================
              LOADING
          ========================================= */}

          {loading && (
            <Card className="orders-loading">
              <div
                style={{
                  padding: "40px",
                  textAlign:
                    "center",
                  fontSize:
                    "18px",
                }}
              >
                Loading your orders...
              </div>
            </Card>
          )}

          {/* =========================================
              ERROR
          ========================================= */}

          {!loading && error && (
            <Card className="orders-error">
              <div
                style={{
                  padding: "30px",
                  textAlign:
                    "center",
                }}
              >
                <h3>
                  Unable to load orders
                </h3>

                <p>{error}</p>

                <Button
                  onClick={
                    loadOrders
                  }
                >
                  Try Again
                </Button>
              </div>
            </Card>
          )}

          {/* =========================================
              ORDER SUMMARY
          ========================================= */}

          {!loading && !error && (
            <div className="order-summary-grid">

              {/* TOTAL ORDERS */}

              <div className="summary-card blue">
                <div className="summary-icon">
                  <FaShoppingBag />
                </div>

                <div>
                  <h4>
                    Total Orders
                  </h4>

                  <h2>
                    {stats.total}
                  </h2>
                </div>
              </div>

              {/* PENDING */}

              <div className="summary-card orange">
                <div className="summary-icon">
                  <FaClock />
                </div>

                <div>
                  <h4>
                    Pending
                  </h4>

                  <h2>
                    {stats.pending}
                  </h2>
                </div>
              </div>

              {/* PROCESSING */}

              <div className="summary-card green">
                <div className="summary-icon">
                  <FaTruck />
                </div>

                <div>
                  <h4>
                    Processing
                  </h4>

                  <h2>
                    {stats.processing}
                  </h2>
                </div>
              </div>

              {/* REVENUE */}

              <div className="summary-card purple">
                <div className="summary-icon">
                  <FaDollarSign />
                </div>

                <div>
                  <h4>
                    Revenue
                  </h4>

                  <h2>
                    $
                    {stats.revenue.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </h2>
                </div>
              </div>

            </div>
          )}

          {/* =========================================
              FILTERS
          ========================================= */}

          {!loading && !error && (
            <Card className="filters-card">

              <OrderFilters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                payment={payment}
                setPayment={setPayment}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={
                  setSortOrder
                }
                statusOptions={
                  STATUS_OPTIONS
                }
                paymentOptions={
                  PAYMENT_OPTIONS
                }
              />

            </Card>
          )}

          {/* =========================================
              ORDERS CONTENT
          ========================================= */}

          {!loading && !error && (
            <div className="orders-content">

              {/* ORDERS HEADER */}

              <div className="orders-header">

                <div className="orders-count">

                  <FaBoxOpen />

                  <span>
                    {filteredOrders.length}

                    {filteredOrders.length ===
                    1
                      ? " Order Found"
                      : " Orders Found"}
                  </span>

                  <span className="order-filter-info">
                    (of {orders.length} total)
                  </span>

                </div>

                {/* BULK ACTIONS */}

                {filteredOrders.length >
                  0 && (
                  <div className="bulk-actions">

                    <Button
                      variant="secondary"
                      size="small"
                      onClick={
                        toggleSelectAll
                      }
                    >
                      {selectedOrders.length ===
                      filteredOrders.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>

                    {selectedOrders.length >
                      0 && (
                      <div className="bulk-actions-dropdown">

                        <Button
                          variant="primary"
                          size="small"
                          onClick={() =>
                            setShowBulkActions(
                              !showBulkActions
                            )
                          }
                        >
                          <FaFilter />

                          Bulk Actions (
                          {
                            selectedOrders.length
                          }
                          )
                        </Button>

                        {showBulkActions && (
                          <div className="bulk-actions-menu">

                            <button
                              onClick={() =>
                                handleBulkStatusUpdate(
                                  STATUS_OPTIONS.PROCESSING
                                )
                              }
                              disabled={
                                updatingOrderId ===
                                "bulk"
                              }
                            >
                              Mark as Processing
                            </button>

                            <button
                              onClick={() =>
                                handleBulkStatusUpdate(
                                  STATUS_OPTIONS.SHIPPED
                                )
                              }
                              disabled={
                                updatingOrderId ===
                                "bulk"
                              }
                            >
                              Mark as Shipped
                            </button>

                            <button
                              onClick={() =>
                                handleBulkStatusUpdate(
                                  STATUS_OPTIONS.DELIVERED
                                )
                              }
                              disabled={
                                updatingOrderId ===
                                "bulk"
                              }
                            >
                              Mark as Delivered
                            </button>

                            <button
                              onClick={
                                handleBulkDelete
                              }
                              className="danger"
                              disabled={
                                isDeleting
                              }
                            >
                              {isDeleting
                                ? "Deleting..."
                                : "Delete Selected"}
                            </button>

                          </div>
                        )}

                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* =====================================
                  ORDER TABLE
              ===================================== */}

              {filteredOrders.length >
              0 ? (
                <OrderTable
                  orders={
                    filteredOrders
                  }

                  onView={
                    handleView
                  }

                  onDelete={
                    handleDelete
                  }

                  onStatusUpdate={
                    handleStatusUpdate
                  }

                  selectedOrders={
                    selectedOrders
                  }

                  onToggleSelection={
                    toggleOrderSelection
                  }

                  isDeleting={
                    isDeleting
                  }

                  statusOptions={
                    STATUS_OPTIONS
                  }

                  updatingOrderId={
                    updatingOrderId
                  }
                />
              ) : (
                <div className="orders-empty">

                  <div className="orders-empty-icon">
                    <FaBoxOpen />
                  </div>

                  <h2>
                    No Orders Found
                  </h2>

                  <p>
                    {search ||
                    status !==
                      STATUS_OPTIONS.ALL ||
                    payment !==
                      PAYMENT_OPTIONS.ALL
                      ? "No orders match your current search or filters."
                      : "You haven't received any orders yet."}
                  </p>

                  <div className="empty-actions">

                    {(search ||
                      status !==
                        STATUS_OPTIONS.ALL ||
                      payment !==
                        PAYMENT_OPTIONS.ALL) && (
                      <Button
                        variant="secondary"
                        onClick={
                          clearFilters
                        }
                      >
                        Clear Filters
                      </Button>
                    )}

                    <Button
                      onClick={() =>
                        navigate(
                          "/seller/products"
                        )
                      }
                    >
                      <FaPlus />
                      Add Products
                    </Button>

                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}