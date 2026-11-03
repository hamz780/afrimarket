import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import {
  FaArrowLeft,
  FaPrint,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaDownload
} from "react-icons/fa";

import Sidebar from "../../components/seller/Sidebar";
import Topbar from "../../components/seller/Topbar";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import OrderStatusBadge from "../../components/seller/orders/OrderStatusBadge";
import { useOrders } from "../../context/OrderContext";

import "./OrderDetails.css";

// Constants for status options
const STATUS_OPTIONS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded"
};

// Helper function to format date
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

// Helper function to get status icon
const getStatusIcon = (status) => {
  switch (status) {
    case STATUS_OPTIONS.PENDING:
      return <FaClock />;
    case STATUS_OPTIONS.PROCESSING:
      return <FaShoppingCart />;
    case STATUS_OPTIONS.SHIPPED:
      return <FaTruck />;
    case STATUS_OPTIONS.DELIVERED:
      return <FaCheckCircle />;
    case STATUS_OPTIONS.CANCELLED:
      return <FaTimesCircle />;
    default:
      return <FaClock />;
  }
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case STATUS_OPTIONS.PENDING:
      return "#f59e0b";
    case STATUS_OPTIONS.PROCESSING:
      return "#3b82f6";
    case STATUS_OPTIONS.SHIPPED:
      return "#8b5cf6";
    case STATUS_OPTIONS.DELIVERED:
      return "#10b981";
    case STATUS_OPTIONS.CANCELLED:
      return "#ef4444";
    case STATUS_OPTIONS.REFUNDED:
      return "#6b7280";
    default:
      return "#6b7280";
  }
};

export default function OrderDetails() {
  const navigate = useNavigate();
  const { state: order } = useLocation();
  const { updateOrderStatus } = useOrders();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "");

  // If no order, show not found
  if (!order) {
    return (
      <div className="seller-dashboard">
        <Sidebar />
        <div className="seller-main">
          <Topbar />
          <div className="seller-content">
            <div className="order-not-found">
              <FaBoxOpen className="not-found-icon" />
              <h2>Order Not Found</h2>
              <p>The order you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate("/seller/orders")}>
                <FaArrowLeft />
                Back to Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate order statistics
  const orderStats = useMemo(() => {
    const items = order.items || 1;
    const total = Number(order.total) || 0;
    const subtotal = total / (1 + (order.taxRate || 0.1));
    const tax = total - subtotal;
    const shipping = order.shippingCost || 0;
    
    return {
      items,
      total,
      subtotal,
      tax,
      shipping,
      grandTotal: total + shipping
    };
  }, [order]);

  // Handle status update
  async function handleStatusUpdate(newStatus) {
    if (isUpdating || newStatus === order.status) return;
    
    const confirmed = window.confirm(
      `Change order status from "${order.status}" to "${newStatus}"?`
    );
    
    if (!confirmed) return;

    setIsUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus);
      setSelectedStatus(newStatus);
      order.status = newStatus; // Update local order object
      // Show success message (can be implemented with toast)
      console.log("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  // Handle print invoice
  function handlePrint() {
    window.print();
  }

  // Handle download invoice (mock)
  function handleDownload() {
    try {
      // In a real app, this would generate a PDF
      alert("Invoice download will be available in the next update.");
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  }

  // Get order timeline (mock data)
  const orderTimeline = useMemo(() => {
    const timeline = [
      { status: "Order Placed", date: order.date, icon: <FaShoppingCart /> },
    ];
    
    if (order.status === STATUS_OPTIONS.PROCESSING || 
        order.status === STATUS_OPTIONS.SHIPPED || 
        order.status === STATUS_OPTIONS.DELIVERED) {
      timeline.push({ 
        status: "Processing", 
        date: new Date(new Date(order.date).getTime() + 3600000).toISOString(),
        icon: <FaClock />
      });
    }
    
    if (order.status === STATUS_OPTIONS.SHIPPED || 
        order.status === STATUS_OPTIONS.DELIVERED) {
      timeline.push({ 
        status: "Shipped", 
        date: new Date(new Date(order.date).getTime() + 7200000).toISOString(),
        icon: <FaTruck />
      });
    }
    
    if (order.status === STATUS_OPTIONS.DELIVERED) {
      timeline.push({ 
        status: "Delivered", 
        date: new Date(new Date(order.date).getTime() + 86400000).toISOString(),
        icon: <FaCheckCircle />
      });
    }
    
    return timeline;
  }, [order]);

  return (
    <div className="seller-dashboard">
      <Sidebar />
      <div className="seller-main">
        <Topbar />
        <div className="seller-content">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-header-left">
              <Button
                variant="secondary"
                onClick={() => navigate("/seller/orders")}
              >
                <FaArrowLeft />
                Back
              </Button>
              <h1>Order #{order.id}</h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="page-header-right">
              <Button variant="secondary" onClick={handleDownload}>
                <FaDownload />
                Download
              </Button>
              <Button onClick={handlePrint}>
                <FaPrint />
                Print Invoice
              </Button>
            </div>
          </div>

          {/* Status Update Section */}
          <Card className="status-update-card">
            <div className="status-update-content">
              <div className="status-current">
                <strong>Current Status:</strong>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="status-actions">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={isUpdating}
                  className="status-select"
                >
                  {Object.values(STATUS_OPTIONS).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={() => handleStatusUpdate(selectedStatus)}
                  disabled={isUpdating || selectedStatus === order.status}
                >
                  {isUpdating ? "Updating..." : "Update Status"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Order Details Grid */}
          <div className="order-details-grid">
            {/* Customer Information Card */}
            <Card className="order-card">
              <h2>
                <FaUser />
                Customer Information
              </h2>
              <div className="detail-row">
                <strong>Name</strong>
                <span>{order.customer}</span>
              </div>
              <div className="detail-row">
                <strong><FaEnvelope /> Email</strong>
                <span>{order.email}</span>
              </div>
              <div className="detail-row">
                <strong><FaPhone /> Phone</strong>
                <span>{order.phone || "N/A"}</span>
              </div>
              <div className="detail-row">
                <strong><FaMapMarkerAlt /> Address</strong>
                <span>{order.address || "N/A"}</span>
              </div>
            </Card>

            {/* Order Information Card */}
            <Card className="order-card">
              <h2>
                <FaBoxOpen />
                Order Information
              </h2>
              <div className="detail-row">
                <strong>Order ID</strong>
                <span>#{order.id}</span>
              </div>
              <div className="detail-row">
                <strong><FaCalendarAlt /> Date</strong>
                <span>{formatDate(order.date)}</span>
              </div>
              <div className="detail-row">
                <strong>Status</strong>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="detail-row">
                <strong><FaCreditCard /> Payment</strong>
                <span>{order.payment}</span>
              </div>
              <div className="detail-row">
                <strong>Payment Method</strong>
                <span>{order.paymentMethod || "Credit Card"}</span>
              </div>
              <div className="detail-row">
                <strong>Items</strong>
                <span>{orderStats.items} product(s)</span>
              </div>
              <div className="detail-row total-row">
                <strong>Total</strong>
                <strong>${orderStats.grandTotal.toFixed(2)}</strong>
              </div>
            </Card>
          </div>

          {/* Order Timeline */}
          <Card className="order-card">
            <h2>Order Timeline</h2>
            <div className="timeline">
              {orderTimeline.map((event, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-icon" style={{ color: getStatusColor(event.status) }}>
                    {event.icon}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-status">{event.status}</div>
                    <div className="timeline-date">{formatDate(event.date)}</div>
                  </div>
                  {index < orderTimeline.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Products Table */}
          <Card className="order-card">
            <h2>Ordered Products</h2>
            <div className="table-responsive">
              <table className="order-items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products && order.products.length > 0 ? (
                    order.products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name || "Product Sample"}</td>
                        <td>{product.sku || "N/A"}</td>
                        <td>{product.quantity || orderStats.items}</td>
                        <td>${(product.price || orderStats.subtotal / orderStats.items).toFixed(2)}</td>
                        <td>${((product.price || orderStats.subtotal / orderStats.items) * (product.quantity || orderStats.items)).toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Product Sample</td>
                      <td>N/A</td>
                      <td>{orderStats.items}</td>
                      <td>${(orderStats.subtotal / orderStats.items).toFixed(2)}</td>
                      <td>${orderStats.subtotal.toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Invoice Summary */}
          <Card className="order-card">
            <h2>Invoice Summary</h2>
            <div className="invoice-summary">
              <div className="detail-row">
                <strong>Subtotal</strong>
                <span>${orderStats.subtotal.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <strong>Shipping</strong>
                <span>{orderStats.shipping === 0 ? "Free" : `$${orderStats.shipping.toFixed(2)}`}</span>
              </div>
              <div className="detail-row">
                <strong>Tax</strong>
                <span>${orderStats.tax.toFixed(2)}</span>
              </div>
              {order.discount && (
                <div className="detail-row">
                  <strong>Discount</strong>
                  <span>-${Number(order.discount).toFixed(2)}</span>
                </div>
              )}
              <div className="detail-row total-row">
                <strong>Grand Total</strong>
                <strong>${orderStats.grandTotal.toFixed(2)}</strong>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="order-details-actions">
            <Button
              variant="secondary"
              onClick={() => navigate("/seller/orders")}
            >
              <FaArrowLeft />
              Back to Orders
            </Button>
            <div className="action-buttons-right">
              <Button
                variant="secondary"
                onClick={handleDownload}
              >
                <FaDownload />
                Download Invoice
              </Button>
              <Button onClick={handlePrint}>
                <FaPrint />
                Print Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}