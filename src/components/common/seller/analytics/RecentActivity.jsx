import "./Analytics.css";

const activities = [
  {
    id: 1,
    icon: "🛒",
    title: "New Order",
    description: "Order #AF10254 was placed.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    icon: "⭐",
    title: "New Review",
    description: "Beauty Care Collection received a 5★ review.",
    time: "12 minutes ago",
  },
  {
    id: 3,
    icon: "📦",
    title: "Product Added",
    description: "Ankara African Dress was added to your store.",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: "👤",
    title: "New Customer",
    description: "A new customer followed your shop.",
    time: "3 hours ago",
  },
  {
    id: 5,
    icon: "💰",
    title: "Payment Received",
    description: "$320.00 has been credited to your account.",
    time: "5 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="analytics-panel">

      <div className="panel-header">

        <h3>🕒 Recent Activity</h3>

        <button className="panel-link">
          View All
        </button>

      </div>

      <div className="activity-list">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="activity-item"
          >

            <div className="activity-icon">
              {activity.icon}
            </div>

            <div className="activity-content">

              <h4>{activity.title}</h4>

              <p>{activity.description}</p>

            </div>

            <small>{activity.time}</small>

          </div>

        ))}

      </div>

    </div>
  );
}