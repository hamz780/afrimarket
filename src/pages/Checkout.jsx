
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "Uganda",
    city: "",
    district: "",
    streetAddress: "",
    postalCode: "",
    deliveryNotes: "",
  });

  const [delivery, setDelivery] = useState({
    id: "standard",
    name: "Standard Delivery",
    price: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactionId, setTransactionId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async () => {
    if (loading || cartItems.length === 0) return;

    setError("");

    if (
      !shippingAddress.fullName.trim() ||
      !shippingAddress.phone.trim() ||
      !shippingAddress.city.trim() ||
      !shippingAddress.country.trim() ||
      !shippingAddress.streetAddress.trim()
    ) {
      setError("Please complete all required shipping address fields.");
      return;
    }

    if (
      ["btc", "eth", "usdt_trc20", "usdt_erc20"].includes(paymentMethod) &&
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

    if (orderItems.some((item) => !item.product || !item.quantity)) {
      setError("Some cart products have invalid information. Please refresh your cart.");
      return;
    }

    const orderData = {
      items: orderItems,

      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        phone: shippingAddress.phone.trim(),
        address: shippingAddress.streetAddress.trim(),
        city: shippingAddress.city.trim(),
        country: shippingAddress.country,
        district: shippingAddress.district.trim(),
        postalCode: shippingAddress.postalCode.trim(),
        deliveryNotes: shippingAddress.deliveryNotes.trim(),
      },

      deliveryOption: delivery.id,
      deliveryFee: delivery.price,

      paymentMethod,
      transactionId: transactionId.trim(),
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

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to place your order.");
      }

      // Clear the cart only after the backend confirms order creation.
      clearCart();

      navigate("/order-success", {
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

      <div className="checkout-layout">
        <div className="checkout-left">
          <ShippingAddress
            onAddressChange={setShippingAddress}
          />

          <DeliveryOptions
            value={delivery.id}
            onDeliveryChange={setDelivery}
          />

          <PaymentMethods
            value={paymentMethod}
            onPaymentChange={setPaymentMethod}
            transactionId={transactionId}
            onTransactionIdChange={setTransactionId}
          />

          <PromoCode />
        </div>

        <div className="checkout-right">
          {error && (
            <div
              role="alert"
              style={{
                color: "#b42318",
                background: "#fff1f0",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              {error}
            </div>
          )}

          <OrderSummary
            cartItems={cartItems}
            cartTotal={cartTotal}
            onPlaceOrder={handlePlaceOrder}
          />

          {loading && (
            <p style={{ textAlign: "center", marginTop: "12px" }}>
              Placing your order. Please wait...
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
