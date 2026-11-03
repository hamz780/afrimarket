import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaHeart,
  FaStar,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

import "./CartItem.css";

export default function CartItem({
  product,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  return (
    <article className="cart-item">

      {/* Product Image */}

      <div className="cart-image">

        <img
          src={product.image}
          alt={product.name}
        />

        {product.discount > 0 && (
          <span className="discount-badge">
            -{product.discount}%
          </span>
        )}

      </div>

      {/* Product Info */}

      <div className="cart-info">

        <span className="cart-category">
          {product.category}
        </span>

        <h2>{product.name}</h2>

        <div className="cart-rating">

          {[...Array(5)].map((_, index) => (
            <FaStar key={index} />
          ))}

          <span>
            {product.rating}
          </span>

        </div>

        <div className="cart-meta">

          <p>

            <strong>Brand:</strong>

            {product.brand}

          </p>

          <p>

            <strong>Seller:</strong>

            {product.seller}

          </p>

          <p>

            <strong>SKU:</strong>

            {product.sku}

          </p>

        </div>

        <div className="cart-status">

          <span>

            <FaCheckCircle />

            {product.status}

          </span>

          <span>

            <FaTruck />

            {product.delivery}

          </span>

        </div>

      </div>

      {/* Price */}

      <div className="cart-price">

        <h2>

          ${product.price}

        </h2>

        {product.oldPrice && (

          <span>

            ${product.oldPrice}

          </span>

        )}

      </div>

      {/* Quantity */}

      <div className="cart-quantity">

        <button
          onClick={() =>
            decreaseQuantity(product.id)
          }
        >

          <FaMinus />

        </button>

        <span>

          {product.quantity}

        </span>

        <button
          onClick={() =>
            increaseQuantity(product.id)
          }
        >

          <FaPlus />

        </button>

      </div>

      {/* Total */}

      <div className="cart-total">

        <strong>

          $
          {(product.price * product.quantity).toFixed(2)}

        </strong>

      </div>

      {/* Actions */}

      <div className="cart-buttons">

        <button className="wishlist-btn">

          <FaHeart />

        </button>

        <button
          className="remove-btn"
          onClick={() =>
            removeFromCart(product.id)
          }
        >

          <FaTrash />

        </button>

      </div>

    </article>
  );
}