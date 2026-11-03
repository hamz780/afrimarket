
import { useState } from "react";

import {
  FaMobileAlt,
  FaUniversity,
  FaMoneyBillWave,
  FaCreditCard,
  FaBitcoin,
  FaEthereum,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";

import "./PaymentMethods.css";

const wallets = {
  btc: {
    currency: "Bitcoin (BTC)",
    network: "Bitcoin Network",
    address: "156PgjypkidoYsg7B4TyTveAtfveLVaYUt",
  },
  eth: {
    currency: "Ethereum (ETH)",
    network: "Ethereum Network (ERC20)",
    address: "0xf76a09c736e26973d61bc285cbd1feb2fb67f332",
  },
  usdt_trc20: {
    currency: "USDT (TRC20)",
    network: "Tron Network (TRC20)",
    address: "TM6Pq2iVPSGAukkoNqKm7nzbQr99oSskYk",
  },
  usdt_erc20: {
    currency: "USDT (ERC20)",
    network: "Ethereum Network (ERC20)",
    address: "0xf76a09c736e26973d61bc285cbd1feb2fb67f332",
  },
};

const options = [
  { id: "cod", label: "Cash on Delivery", icon: <FaMoneyBillWave /> },
  { id: "mtn", label: "MTN Mobile Money", icon: <FaMobileAlt /> },
  { id: "airtel", label: "Airtel Money", icon: <FaMobileAlt /> },
  { id: "mpesa", label: "M-Pesa Kenya", icon: <FaMobileAlt /> },
  { id: "visa", label: "Visa", icon: <FaCreditCard /> },
  { id: "mastercard", label: "Mastercard", icon: <FaCreditCard /> },
  { id: "bank", label: "Bank Transfer", icon: <FaUniversity /> },
  { id: "btc", label: "Bitcoin (BTC)", icon: <FaBitcoin /> },
  { id: "eth", label: "Ethereum (ETH)", icon: <FaEthereum /> },
  { id: "usdt_trc20", label: "USDT (TRC20)", icon: <FaCreditCard /> },
  { id: "usdt_erc20", label: "USDT (ERC20)", icon: <FaCreditCard /> },
  { id: "usdc", label: "USDC", icon: <FaCreditCard /> },
];

export default function PaymentMethods({
  value = "cod",
  onPaymentChange,
  transactionId = "",
  onTransactionIdChange,
}) {
  const [copied, setCopied] = useState(false);

  const selectedWallet = wallets[value];

  const handlePaymentChange = (paymentId) => {
    setCopied(false);

    if (onPaymentChange) {
      onPaymentChange(paymentId);
    }

    if (onTransactionIdChange) {
      onTransactionIdChange("");
    }
  };

  const handleCopy = async () => {
    if (!selectedWallet) return;

    try {
      await navigator.clipboard.writeText(selectedWallet.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Unable to copy wallet address:", error);
      alert("Unable to copy. Please copy the address manually.");
    }
  };

  return (
    <section className="payment-methods">
      <div className="section-header">
        <h2>💳 Payment Method</h2>
        <p>Choose your preferred payment option.</p>
      </div>

      <div className="payment-options">
        {options.map((option) => (
          <label
            className={`payment-card ${
              value === option.id ? "payment-card-selected" : ""
            }`}
            key={option.id}
          >
            <input
              type="radio"
              name="payment"
              value={option.id}
              checked={value === option.id}
              onChange={() => handlePaymentChange(option.id)}
            />

            {option.icon}
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {selectedWallet && (
        <div className="crypto-payment-details">
          <h3>{selectedWallet.currency} Payment</h3>

          <p>
            Send your payment only through the correct network shown below.
          </p>

          <div className="crypto-network">
            <strong>Network:</strong>
            <span>{selectedWallet.network}</span>
          </div>

          <div className="crypto-wallet-address">
            <strong>Receiving wallet address</strong>

            <p>{selectedWallet.address}</p>

            <button type="button" onClick={handleCopy}>
              {copied ? <FaCheckCircle /> : <FaCopy />}
              {copied ? "Copied" : "Copy Address"}
            </button>
          </div>

          <label className="crypto-transaction-label">
            Transaction ID / Hash

            <input
              type="text"
              value={transactionId}
              onChange={(event) =>
                onTransactionIdChange?.(event.target.value)
              }
              placeholder="Enter transaction ID after payment"
            />
          </label>

          <p className="crypto-warning">
            Your payment will remain pending until it is verified.
            Never send funds through a different network.
          </p>
        </div>
      )}
    </section>
  );
}
