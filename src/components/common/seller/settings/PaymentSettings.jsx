import { useState } from "react";

export default function PaymentSettings() {
  const [payment, setPayment] = useState({
    method: "Mobile Money",
    accountName: "",
    accountNumber: "",
    bankName: "",
    bankAccount: "",
    currency: "USD",
    automaticPayouts: true,
  });

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setPayment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function savePayment() {
    alert("Payment settings saved successfully.");
  }

  return (
    <section className="settings-card">
      <h2>💳 Payment Settings</h2>

      <div className="settings-grid">

        <div className="settings-group">
          <label htmlFor="method">
            Payment Method
          </label>

          <select
            id="method"
            name="method"
            value={payment.method}
            onChange={handleChange}
          >
            <option value="Mobile Money">
              Mobile Money
            </option>

            <option value="Bank Transfer">
              Bank Transfer
            </option>

            <option value="PayPal">
              PayPal
            </option>

            <option value="Card">
              Card Payment
            </option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="currency">
            Payout Currency
          </label>

          <select
            id="currency"
            name="currency"
            value={payment.currency}
            onChange={handleChange}
          >
            <option value="USD">USD</option>
            <option value="UGX">UGX</option>
            <option value="KES">KES</option>
            <option value="TZS">TZS</option>
            <option value="NGN">NGN</option>
            <option value="ZAR">ZAR</option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="accountName">
            Account Name
          </label>

          <input
            id="accountName"
            name="accountName"
            type="text"
            value={payment.accountName}
            onChange={handleChange}
            placeholder="Enter account name"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="accountNumber">
            Account / Phone Number
          </label>

          <input
            id="accountNumber"
            name="accountNumber"
            type="text"
            value={payment.accountNumber}
            onChange={handleChange}
            placeholder="Enter account or phone number"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="bankName">
            Bank Name
          </label>

          <input
            id="bankName"
            name="bankName"
            type="text"
            value={payment.bankName}
            onChange={handleChange}
            placeholder="Enter bank name"
          />
        </div>

        <div className="settings-group">
          <label htmlFor="bankAccount">
            Bank Account
          </label>

          <input
            id="bankAccount"
            name="bankAccount"
            type="text"
            value={payment.bankAccount}
            onChange={handleChange}
            placeholder="Enter bank account number"
          />
        </div>

      </div>

      <div className="settings-switch">
        <div>
          <h4>Automatic Payouts</h4>

          <p>
            Automatically process available seller
            earnings for payout.
          </p>
        </div>

        <input
          type="checkbox"
          name="automaticPayouts"
          checked={payment.automaticPayouts}
          onChange={handleChange}
        />
      </div>

      <div className="settings-actions">
        <button
          type="button"
          className="save-btn"
          onClick={savePayment}
        >
          Save Payment Settings
        </button>
      </div>
    </section>
  );
}