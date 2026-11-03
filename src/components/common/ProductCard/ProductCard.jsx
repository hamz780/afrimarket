import "./ProductCard.css";

import { Link } from "react-router-dom";

import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";

import { useCart } from "../../../context/CartContext";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    window.location.href = "/checkout";
  };

  return (
    <div className="product-card">

      {/* Discount */}
      {product.discount > 0 && (
        <div className="discount-badge">
          -{product.discount}%
        </div>
      )}

      {/* Product Badge */}
      {product.badge && (
        <div className="product-badge">
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button
        type="button"
        className="wishlist-btn"
        aria-label="Add to wishlist"
      >
        <FaHeart />
      </button>

      {/* Product Image */}
      <Link
        to={`/product/${product.slug}`}
        className="product-image-container"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      {/* Product Content */}
      <div className="product-content">

        {/* Rating */}
        <div className="product-rating">
          <FaStar className="star-icon" />

          <span>{product.rating}</span>

          <small>
            ({product.reviews} Reviews)
          </small>
        </div>

        {/* Product Name */}
        <Link
          to={`/product/${product.slug}`}
          className="product-name"
        >
          {product.name}
        </Link>

        {/* Brand */}
        <p className="product-brand">
          Brand:
          <span>{product.brand}</span>
        </p>

        {/* Seller */}
        <p className="product-seller">
          Sold by:
          <span>{product.seller}</span>
        </p>

        {/* Category */}
        <span className="product-category">
          {product.category}
        </span>

        {/* Price */}
        <div className="product-price">
          <span className="current-price">
            ${product.price}
          </span>

          {product.oldPrice && (
            <span className="old-price">
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="product-stock">
          <span
            className={
              product.stock > 0
                ? "in-stock"
                : "out-stock"
            }
          >
            {product.status}
          </span>
        </div>

        {/* Delivery */}
        <div className="product-delivery">
          🚚 {product.delivery}
        </div>

        {/* ==========================================
            CART ACTIONS
        ========================================== */}

        <div className="product-actions">

          <button
            type="button"
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <FaShoppingCart />
            {product.stock > 0
              ? "Add to Cart"
              : "Out of Stock"}
          </button>

          <button
            type="button"
            className="buy-now-btn"
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
          >
            <FaBolt />
            Buy Now
          </button>

        </div>

      </div>
    </div>
  );
}