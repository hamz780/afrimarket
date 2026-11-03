import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

import { useCart } from "../../context/CartContext";

import ShippingProgress from "../../components/common/cart/ShippingProgress";
import CartItem from "../../components/common/cart/CartItem";
import CouponBox from "../../components/common/cart/CouponBox";
import OrderSummary from "../../components/common/cart/OrderSummary";
import PaymentMethods from "../../components/common/cart/PaymentMethods";
import RecommendedProducts from "../../components/common/cart/RecommendedProducts";

import "./Cart.css";

export default function Cart() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  // Free shipping target
  const FREE_SHIPPING = 100;

  const remaining =
    cartTotal >= FREE_SHIPPING
      ? 0
      : FREE_SHIPPING - cartTotal;

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <section className="cart-page">

        <div className="empty-cart">

          <FaShoppingBag className="empty-icon" />

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added any products yet.
          </p>

          <Link
            to="/"
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </section>
    );
  }

  return (
    <section className="cart-page">

      {/* Header */}

      <div className="cart-header">

        <div>

          <h1>Shopping Cart</h1>

          <p>
            {cartItems.length} Item
            {cartItems.length > 1 && "s"} in your cart
          </p>

        </div>

        <Link
          to="/"
          className="shopping-link"
        >
          ← Continue Shopping
        </Link>

      </div>

      {/* Shipping Progress */}

      <ShippingProgress
        subtotal={cartTotal}
        target={FREE_SHIPPING}
        remaining={remaining}
      />

      <div className="cart-layout">

        {/* LEFT */}

        <div className="cart-left">

          {cartItems.map((item) => (

            <CartItem
              key={item.id}
              product={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />

          ))}

          <CouponBox />

          <div className="cart-actions">

            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>

        </div>

        {/* RIGHT */}

        <aside className="cart-right">

          <OrderSummary
            subtotal={cartTotal}
          />

          <PaymentMethods />

        </aside>

      </div>

      {/* Recommendations */}

      <RecommendedProducts />

    </section>
  );
}