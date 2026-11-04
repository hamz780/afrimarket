import { useState } from "react";
import "./PaymentMethods.css";

const paymentOptions = [
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order is delivered.",
  },
  {
    id: "btc",
    name: "Bitcoin (BTC)",
    description: "Pay using the Bitcoin network.",
  },
  {
    id: "eth",
    name: "Ethereum (ETH)",
    description: "Pay using the Ethereum network.",
  },
  {
    id: "usdt_trc20",
    name: "USDT (TRC20)",
    description: "Pay using the Tron network.",
  },
  {
    id: "usdt_erc20",
    name: "USDT (ERC20)",
    description: "Pay using the Ethereum network.",
  },
];

const cryptoWallets = {
  btc: {
    network: "Bitcoin Network",
    address: "156PgjypkidoYsg7B4TyTveAtfveLVaYUt",
  },
  eth: {
    network: "Ethereum Network (ERC20)",
    address: "0xf76a09c736e26973d61bc285cbd1feb2fb67f332",
  },
  usdt_trc20: {
    network: "Tron Network (TRC20)",
    address: "TM6Pq2iVPSGAukkoNqKm7nzbQr99oSskYk",
  },
  usdt_erc20: {
    network: "Ethereum Network (ERC20)",
    address: "0xf76a09c736e26973d61bc285cbd1feb2fb67f332",
  },
};

export default function PaymentMethods({
  value = "cod",
  onPaymentChange,
  transactionId = "",
  onTransactionIdChange,
}) {
  const [copied, setCopied] = useState(false);

  const selectedWallet = cryptoWallets[value];

  const handlePaymentChange = (paymentId) => {
    setCopied(false);
    onPaymentChange?.(paymentId);
    onTransactionIdChange?.("");
  };

  const handleCopyAddress = async () => {
    if (!selectedWallet?.address) return;

    try {
      await navigator.clipboard.writeText(selectedWallet.address);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Wallet address copy failed:", error);
      window.prompt(
        "Copy this wallet address:",
        selectedWallet.address
      );
    }
  };

  return (
    <section className="payment-methods">
      <div className="payment-methods-header">
        <h3>Payment Method</h3>
        <p>Choose how you would like to pay for your order.</p>
      </div>

      <div className="payment-options">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`payment-option ${
              value === option.id ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.id}
              checked={value === option.id}
              onChange={() => handlePaymentChange(option.id)}
            />

            <span className="payment-option-content">
              <strong>{option.name}</strong>
              <small>{option.description}</small>
            </span>
          </label>
        ))}
      </div>

      {value === "cod" && (
        <div className="payment-details">
          <h4>Cash on Delivery</h4>
          <p>
            You will pay when your order arrives. Please make sure
            someone is available to receive the delivery.
          </p>
        </div>
      )}

      {selectedWallet && (
        <div className="payment-details crypto-payment-details">
          <h4>Cryptocurrency Payment</h4>

          <p>
            Send your payment using the correct network shown below.
          </p>

          <div className="wallet-network">
            <strong>Network:</strong>
            <span>{selectedWallet.network}</span>
          </div>

          <div className="wallet-address">
            <label>Payment wallet address</label>

            <div className="wallet-address-row">
              <code>{selectedWallet.address}</code>

              <button
                type="button"
                className="copy-button"
                onClick={handleCopyAddress}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="transaction-input">
            <label htmlFor="transactionId">
              Transaction ID / Hash
            </label>

            <input
              id="transactionId"
              type="text"
              value={transactionId}
              onChange={(event) =>
                onTransactionIdChange?.(event.target.value)
              }
              placeholder="Enter your transaction ID"
              maxLength={200}
              required
            />
          </div>

          <p className="payment-warning">
            Your payment will remain pending until it is verified.
            Always confirm the network before sending funds.
          </p>
        </div>
      )}

      <div className="payment-notice">
        <strong>Other payment options coming soon</strong>
        <p>
          MTN Mobile Money, Airtel Money, M-Pesa, bank transfers
          and card payments will be enabled after their payment
          services are configured.
        </p>
      </div>
    </section>
  );
}