import { useState } from "react";
import {
  FaEye,
  FaTrash,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaBox,
} from "react-icons/fa";

import "./OrderTable.css";

export default function OrderTable({
  orders = [],
  onView,
  onDelete,
  onStatusUpdate,
  selectedOrders = [],
  onToggleSelection,
  isDeleting = false,
  statusOptions = {},
}) {
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Processing":
        return "status-processing";

      case "Shipped":
        return "status-shipped";

      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      case "Refunded":
        return "status-refunded";

      default:
        return "status-default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaClock />;

      case "Processing":
        return <FaBox />;

      case "Shipped":
        return <FaTruck />;

      case "Delivered":
        return <FaCheckCircle />;

      default:
        return null;
    }
  };

  const formatCurrency = (amount) => {
    const value = Number(amount);

    if (!Number.isFinite(value)) {
      return "$0.00";
    }

    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

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

  const handleStatusChange = async (orderId, newStatus) => {
    if (!onStatusUpdate) {
      return;
    }

    try {
      setUpdatingOrderId(orderId);

      await onStatusUpdate(orderId, newStatus);
    } catch (error) {
      console.error("Order status update failed:", error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const isSelected = (orderId) => {
    return selectedOrders.some(
      (id) => String(id) === String(orderId)
    );
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="order-table-empty">
        <FaBox className="order-table-empty-icon" />

        <h3>No orders available</h3>

        <p>
          Orders will appear here when customers place
          orders for your products.
        </p>
      </div>
    );
  }

  return (
    <div className="order-table-wrapper">
      <div className="order-table-scroll">
        <table className="order-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <span className="sr-only">
                  Select
                </span>
              </th>

              <th>Order</th>

              <th>Customer</th>

              <th>Date</th>

              <th>Total</th>

              <th>Payment</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const orderId = order.id;

              return (
                <tr
                  key={String(orderId)}
                  className={
                    isSelected(orderId)
                      ? "order-row-selected"
                      : ""
                  }
                >
                  {/* SELECT */}
                  <td className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={isSelected(orderId)}
                      onChange={() =>
                        onToggleSelection?.(orderId)
                      }
                      aria-label={`Select order ${orderId}`}
                    />
                  </td>

                  {/* ORDER */}
                  <td>
                    <div className="order-id">
                      #{String(orderId).slice(-8)}
                    </div>
                  </td>

                  {/* CUSTOMER */}
                  <td>
                    <div className="customer-cell">
                      <div className="customer-avatar">
                        {String(
                          order.customer || "C"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="customer-info">
                        <strong>
                          {order.customer || "Customer"}
                        </strong>

                        {order.email && (
                          <span>
                            {order.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* DATE */}
                  <td>
                    <span className="order-date">
                      {formatDate(order.date)}
                    </span>
                  </td>

                  {/* TOTAL */}
                  <td>
                    <strong className="order-total">
                      {formatCurrency(order.total)}
                    </strong>
                  </td>

                  {/* PAYMENT */}
                  <td>
                    <span
                      className={`payment-badge payment-${String(
                        order.payment || "Pending"
                      )
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {order.payment || "Pending"}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    {onStatusUpdate ? (
                      <div className="status-control">
                        <span
                          className={`status-badge ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}

                          {order.status ||
                            "Pending"}
                        </span>

                        <select
                          value={
                            order.status ||
                            "Pending"
                          }
                          disabled={
                            updatingOrderId ===
                            orderId
                          }
                          onChange={(event) =>
                            handleStatusChange(
                              orderId,
                              event.target.value
                            )
                          }
                          aria-label={`Update status for order ${orderId}`}
                        >
                          {Object.values(
                            statusOptions
                          )
                            .filter(
                              (value) =>
                                value !== "All"
                            )
                            .map((value) => (
                              <option
                                key={value}
                                value={value}
                              >
                                {value}
                              </option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <span
                        className={`status-badge ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}

                        {order.status ||
                          "Pending"}
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="order-actions">
                      <button
                        type="button"
                        className="order-action view"
                        onClick={() =>
                          onView?.(order)
                        }
                        title="View order"
                        aria-label={`View order ${orderId}`}
                      >
                        <FaEye />
                      </button>

                      <button
                        type="button"
                        className="order-action delete"
                        onClick={() =>
                          onDelete?.(orderId)
                        }
                        disabled={isDeleting}
                        title="Delete order"
                        aria-label={`Delete order ${orderId}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}