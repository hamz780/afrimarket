
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";

import {
  FaPlus,
  FaShoppingCart,
  FaCheck,
  FaStar,
  FaShieldAlt,
  FaArrowRight,
  FaBoxOpen,
  FaClock,
} from "react-icons/fa";

import "./NewArrival.css";

export default function NewArrival() {
  const navigate = useNavigate();

  const { products = [] } = useProducts();
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);

  const getProductId = (product) => {
    return product?.id || product?._id;
  };

  // Sort products by their actual creation date.
  const newProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const dateA = new Date(
          a.createdAt ||
          a.createdDate ||
          a.dateAdded ||
          a.updatedAt ||
          0
        ).getTime();

        const dateB = new Date(
          b.createdAt ||
          b.createdDate ||
          b.dateAdded ||
          b.updatedAt ||
          0
        ).getTime();

        return (
          (Number.isFinite(dateB) ? dateB : 0) -
          (Number.isFinite(dateA) ? dateA : 0)
        );
      })
      .slice(0, 8);
  }, [products]);

  const getStock = (product) => {
    const stock = Number(
      product.stock ??
      product.quantity ??
      product.inventory ??
      0
    );

    return Number.isFinite(stock) ? stock : 0;
  };

  const getStockStatus = (product) => {
    const stock = getStock(product);

    if (stock <= 0) {
      return {
        label: "Sold Out",
        className: "arrival-stock-soldout",
      };
    }

    if (stock <= 5) {
      return {
        label: `Only ${stock} left`,
        className: "arrival-stock-low",
      };
    }

    return {
      label: "In Stock",
      className: "arrival-stock-good",
    };
  };

  // Add a product using the ID expected by CartContext.
  const handleAddToCart = (product) => {
    const productId = getProductId(product);

    if (!productId) {
      console.error(
        "New Arrival product is missing an ID:",
        product
      );
      return;
    }

    if (getStock(product) <= 0) {
      return;
    }

    const cartProduct = {
      ...product,
      id: productId,
    };

    addToCart(cartProduct, 1);

    setAddedProductId(productId);

    window.setTimeout(() => {
      setAddedProductId((currentId) =>
        currentId === productId ? null : currentId
      );
    }, 1800);
  };

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <section className="new-arrivals">
      {/* Decorative background */}
      <div className="arrival-glow arrival-glow-one" />
      <div className="arrival-glow arrival-glow-two" />

      <div className="arrival-container">
        {/* Header */}
        <div className="new-header">
          <div className="new-header-content">
            <span className="new-tag">
              <FaPlus />
              JUST ARRIVED
            </span>

            <h2>New Arrivals</h2>

            <p>
              Be the first to discover fresh products from
              trusted African sellers. Explore what's new
              on AfriMarket.
            </p>

            {/* Trust indicators */}
            <div className="arrival-trust">
              <div className="arrival-trust-item">
                <FaShieldAlt />
                <span>Verified Sellers</span>
              </div>

              <div className="arrival-trust-item">
                <FaStar />
                <span>Quality Products</span>
              </div>

              <div className="arrival-trust-item">
                <FaClock />
                <span>Recently Added</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="arrival-header-btn"
            onClick={handleViewAll}
          >
            View Marketplace
            <FaArrowRight />
          </button>
        </div>

        {/* Products */}
        {newProducts.length > 0 ? (
          <div className="new-grid">
            {newProducts.map((product, index) => {
              const productId = getProductId(product);
              const stock = getStock(product);
              const stockStatus = getStockStatus(product);
              const isAdded = addedProductId === productId;

              return (
                <div
                  className="arrival-card"
                  key={productId || `arrival-${index}`}
                >
                  {/* New badge */}
                  <div className="arrival-date">
                    <FaStar />
                    <span>New Arrival</span>
                  </div>

                  {/* Ranking */}
                  <div className="arrival-rank">
                    #{index + 1}
                  </div>

                  {/* Discount */}
                  {Number(product.discount) > 0 && (
                    <div className="arrival-discount">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Product card */}
                  <div className="arrival-product">
                    <ProductCard product={product} />
                  </div>

                  {/* Product information */}
                  <div className="arrival-footer">
                    {/* Rating */}
                    <div className="arrival-rating">
                      <div className="arrival-rating-main">
                        <FaStar />

                        <strong>
                          {product.rating
                            ? Number(product.rating).toFixed(1)
                            : "New"}
                        </strong>

                        <span>
                          ({product.reviews || 0})
                        </span>
                      </div>

                      <span className="arrival-fresh">
                        Fresh
                      </span>
                    </div>

                    {/* Seller and stock */}
                    <div className="arrival-meta">
                      <div className="arrival-verified">
                        <span className="arrival-check">
                          <FaCheck />
                        </span>

                        <span>Verified Seller</span>
                      </div>

                      <div
                        className={`arrival-stock ${stockStatus.className}`}
                      >
                        {stock > 0 && <FaBoxOpen />}

                        <span>{stockStatus.label}</span>
                      </div>
                    </div>

                    {/* Add to cart */}
                    <button
                      type="button"
                      className={`arrival-btn ${
                        isAdded ? "arrival-btn-added" : ""
                      }`}
                      onClick={() => handleAddToCart(product)}
                      disabled={stock <= 0 || !productId}
                    >
                      {isAdded ? (
                        <>
                          <FaCheck />
                          Added to Cart
                        </>
                      ) : stock <= 0 ? (
                        <>
                          <FaBoxOpen />
                          Sold Out
                        </>
                      ) : (
                        <>
                          <FaShoppingCart />
                          Add to Cart
                          <FaArrowRight className="arrival-btn-arrow" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="no-products">
            <div className="empty-arrival-icon">
              <FaPlus />
            </div>

            <h3>No New Products Yet</h3>

            <p>
              Fresh products from African sellers will
              appear here as they are added to AfriMarket.
            </p>

            <button
              type="button"
              className="arrival-view-all"
              onClick={handleViewAll}
            >
              Explore Marketplace
              <FaArrowRight />
            </button>
          </div>
        )}

        {/* Footer */}
        {newProducts.length > 0 && (
          <div className="arrival-bottom">
            <div className="arrival-bottom-message">
              <span className="arrival-bottom-icon">
                <FaStar />
              </span>

              <div>
                <strong>
                  Fresh from African sellers
                </strong>

                <span>
                  New products are added regularly.
                  Don't miss what's next.
                </span>
              </div>
            </div>

            <button
              type="button"
              className="arrival-view-all"
              onClick={handleViewAll}
            >
              Explore All Products
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
