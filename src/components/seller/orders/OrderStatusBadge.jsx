import "./OrderStatusBadge.css";

export default function OrderStatusBadge({ status }) {
  const normalized = (status || "Pending").toLowerCase();

  return (
    <span
      className={`order-status-badge order-status-${normalized}`}
    >
      {status || "Pending"}
    </span>
  );
}