import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaEye,
  FaTruck,
  FaCheckCircle
} from "react-icons/fa";

import { IoFlash } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import "./ProductCard.css";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted
  } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  const openProduct = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (

    <article
      className="product-card"
      onClick={openProduct}
    >

      {/* IMAGE */}

      <div className="product-image-container">

        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        {product.flashSale && (
          <span className="flash-badge">
            <IoFlash />
            Flash Sale
          </span>
        )}

        <button
          className={`wishlist-btn ${
            wishlisted ? "active" : ""
          }`}
          onClick={handleWishlist}
        >
          <FaHeart />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

      </div>

      {/* DETAILS */}

      <div className="product-details">

        <div className="rating">

          <span>

            {[...Array(5)].map((_, index) => (
              <FaStar key={index} />
            ))}

          </span>

          <small>

            {product.rating}

            ({product.reviews})

          </small>

        </div>

        <h3 className="product-name">

          {product.name}

        </h3>

        <p className="category">

          {product.category}

        </p>

        <p className="seller">

          {product.brand}

          {" • "}

          {product.seller}

        </p>

        <div className="stock">

          <FaCheckCircle />

          {product.status}

        </div>

        <div className="price-section">

          <span className="price">

            ${product.price}

          </span>

          {product.oldPrice && (
            <span className="old-price">

              ${product.oldPrice}

            </span>
          )}

          {product.discount && (
            <span className="discount">

              -{product.discount}%

            </span>
          )}

        </div>

        <div className="delivery">

          <FaTruck />

          {product.delivery}

        </div>

        <div className="product-actions">

          <button
            className="cart-btn"
            onClick={handleCart}
          >

            <FaShoppingCart />

            Add To Cart

          </button>

          <button
            className="view-btn"
            onClick={(e) => {

              e.stopPropagation();

              openProduct();

            }}
          >

            <FaEye />

          </button>

        </div>

      </div>

    </article>

  );

}