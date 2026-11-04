import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import CheckoutProgress from "../components/common/checkout/CheckoutProgress";
import ShippingAddress from "../components/common/checkout/ShippingAddress";
import DeliveryOptions from "../components/common/checkout/DeliveryOptions";
import PaymentMethods from "../components/common/checkout/PaymentMethods";
import PromoCode from "../components/common/checkout/PromoCode";
import OrderSummary from "../components/common/checkout/OrderSummary";

import "./Checkout.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const TAX_RATE = 0.05;

const DELIVERY_FEES = {
  standard: 700,
  express: 15000,
  home: 10000,
  pickup: 0,
};

const CRYPTO_METHODS = [
  "btc",
  "eth",
  "usdt_trc20",
  "usdt_erc20",
];

const formatUGX = (amount) =>
  `UGX ${Math.round(Number(amount) || 0).toLocaleString("en-UG")}`;

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems = [], cartTotal = 0, clearCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "Uganda",
    city: "",
    district: "",
    address: "",
    postalCode: "",
    deliveryNotes: "",
  });

  const [delivery, setDelivery] = useState({
    id: "standard",
    name: "Standard Delivery",
    price: DELIVERY_FEES.standard,
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactionId, setTransactionId] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // All checkout calculations use whole UGX amounts.
  const subtotal = Math.round(Number(cartTotal) || 0);

  const deliveryFee =
    DELIVERY_FEES[delivery.id] ?? DELIVERY_FEES.standard;

  const tax = Math.round(subtotal * TAX_RATE);

  const rawDiscount = !appliedPromo
    ? 0
    : appliedPromo.type === "percentage"
      ? subtotal * (Number(appliedPromo.value) / 100)
      : Number(appliedPromo.value);

  const discount = Math.min(
    subtotal,
    Math.max(0, Math.round(rawDiscount || 0))
  );

  const grandTotal = Math.max(
    0,
    subtotal + tax + deliveryFee - discount
  );

  const handleApplyPromo = (promo) => {
    if (!promo?.code || !promo?.type) {
      setError("Invalid promo code information.");
      return;
    }

    setAppliedPromo({
      code: String(promo.code).trim().toUpperCase(),
      type: promo.type,
      value: Number(promo.value),
    });

    setError("");
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setError("");
  };

  const handleDeliveryChange = (option) => {
    if (!option?.id || !(option.id in DELIVERY_FEES)) {
      setError("Please select a valid delivery option.");
      return;
    }

    setDelivery({
      ...option,
      price: DELIVERY_FEES[option.id],
    });

    setError("");
  };

  const handlePlaceOrder = async () => {
    if (loading) return;

    setError("");

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    const fullName = String(shippingAddress.fullName || "").trim();
    const phone = String(shippingAddress.phone || "").trim();
    const city = String(shippingAddress.city || "").trim();
    const country = String(shippingAddress.country || "").trim();
    const address = String(shippingAddress.address || "").trim();

    if (!fullName || !phone || !city || !country || !address) {
      setError("Please complete all required shipping address fields.");
      return;
    }

    if (
      CRYPTO_METHODS.includes(paymentMethod) &&
      !transactionId.trim()
    ) {
      setError("Please enter your cryptocurrency transaction ID.");
      return;
    }

    const token =
      localStorage.getItem("afrimarket-token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken");

    if (!token) {
      setError("Please log in before placing your order.");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      product:
        item.product?._id ||
        item.product ||
        item._id ||
        item.id,
      quantity: Number(item.quantity),
    }));

    if (
      orderItems.some(
        (item) =>
          !item.product ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
      )
    ) {
      setError("Some cart products have invalid product IDs or quantities.");
      return;
    }

    const orderData = {
      items: orderItems,

      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        country,
        district: String(shippingAddress.district || "").trim(),
        postalCode: String(shippingAddress.postalCode || "").trim(),
        deliveryNotes: String(shippingAddress.deliveryNotes || "").trim(),
      },

      deliveryOption: delivery.id,
      paymentMethod,
      transactionId: transactionId.trim(),
      promoCode: appliedPromo?.code || "",
    };

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to place your order. Please try again."
        );
      }

      if (!data.order?._id) {
        throw new Error(
          "The order response was incomplete. Please contact support before trying again."
        );
      }

      clearCart();

      navigate("/order-success", {
        replace: true,
        state: {
          order: data.order,
        },
      });
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message || "Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <h2>Your Cart is Empty</h2>
          <p>Please add products before proceeding to checkout.</p>
          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <h1>Secure Checkout</h1>
        <p>Complete your purchase safely with AfriMarket.</p>
      </div>

      <CheckoutProgress />

      {error && (
        <div className="checkout-error" role="alert">
          {error}
        </div>
      )}

      <div className="checkout-layout">
        <div className="checkout-left">
          <ShippingAddress onAddressChange={setShippingAddress} />

          <DeliveryOptions
            value={delivery.id}
            onDeliveryChange={handleDeliveryChange}
          />

          <PaymentMethods
            value={paymentMethod}
            onPaymentChange={setPaymentMethod}
            transactionId={transactionId}
            onTransactionIdChange={setTransactionId}
          />

          <PromoCode
            appliedPromo={appliedPromo}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={handleRemovePromo}
          />

          <div className="checkout-summary-section">
            <OrderSummary
              cartItems={cartItems}
              cartTotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              discount={discount}
              promoCode={appliedPromo?.code || ""}
              grandTotal={grandTotal}
              onPlaceOrder={handlePlaceOrder}
            />

            {loading && (
              <p className="checkout-loading" role="status">
                Placing your order. Please wait...
              </p>
            )}

            <p className="checkout-currency-note">
              All checkout prices are displayed in UGX.
            </p>

            <p className="checkout-total-note">
              Your final order total is calculated and validated securely
              by AfriMarket's server.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}