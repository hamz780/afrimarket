import { useState } from "react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    customerMessages: true,
    customerReviews: true,
    lowStock: true,
    promotions: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  function handleChange(e) {
    const { name, checked } = e.target;

    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function saveNotifications() {
    alert("Notification settings saved successfully.");
  }

  return (
    <section className="settings-card">
      <h2>🔔 Notifications</h2>

      <div className="settings-switch">
        <div>
          <h4>New Orders</h4>
          <p>
            Get notified whenever a customer places a new order.
          </p>
        </div>

        <input
          type="checkbox"
          name="newOrders"
          checked={notifications.newOrders}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Order Updates</h4>
          <p>
            Receive notifications about order status changes.
          </p>
        </div>

        <input
          type="checkbox"
          name="orderUpdates"
          checked={notifications.orderUpdates}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Customer Messages</h4>
          <p>
            Get notified when customers send you messages.
          </p>
        </div>

        <input
          type="checkbox"
          name="customerMessages"
          checked={notifications.customerMessages}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Customer Reviews</h4>
          <p>
            Get notified when customers leave product reviews.
          </p>
        </div>

        <input
          type="checkbox"
          name="customerReviews"
          checked={notifications.customerReviews}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Low Stock Alerts</h4>
          <p>
            Receive alerts when products are running low.
          </p>
        </div>

        <input
          type="checkbox"
          name="lowStock"
          checked={notifications.lowStock}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Promotions</h4>
          <p>
            Receive promotional and marketing notifications.
          </p>
        </div>

        <input
          type="checkbox"
          name="promotions"
          checked={notifications.promotions}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>Email Notifications</h4>
          <p>
            Receive seller notifications through email.
          </p>
        </div>

        <input
          type="checkbox"
          name="emailNotifications"
          checked={notifications.emailNotifications}
          onChange={handleChange}
        />
      </div>

      <div className="settings-switch">
        <div>
          <h4>SMS Notifications</h4>
          <p>
            Receive important seller notifications by SMS.
          </p>
        </div>

        <input
          type="checkbox"
          name="smsNotifications"
          checked={notifications.smsNotifications}
          onChange={handleChange}
        />
      </div>

      <div className="settings-actions">
        <button
          type="button"
          className="save-btn"
          onClick={saveNotifications}
        >
          Save Notifications
        </button>
      </div>
    </section>
  );
}