
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";

import {
  FaTrophy,
  FaShoppingCart,
  FaCheck,
  FaStar,
  FaShieldAlt,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaBoxOpen,
} from "react-icons/fa";

import "./Bestsellers.css";

export default function BestSellers() {
  const navigate = useNavigate();

  const { products = [] } = useProducts();
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);
  const [current, setCurrent] = useState(0);

  const bestProducts = products.filter(
    (product) => product.bestSeller === true
  );

  const getProductId = (product) => {
    return product.id || product._id;
  };

  useEffect(() => {
    if (bestProducts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bestProducts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [bestProducts.length]);

  const nextSlide = () => {
    if (bestProducts.length === 0) return;

    setCurrent((prev) => (prev + 1) % bestProducts.length);
  };

  const prevSlide = () => {
    if (bestProducts.length === 0) return;

    setCurrent((prev) =>
      prev === 0 ? bestProducts.length - 1 : prev - 1
    );
  };

  const handleAddToCart = (product) => {
    const productId = getProductId(product);

    if (!productId) {
      console.error("Best Seller product is missing an ID:", product);
      return;
    }

    const stock = Number(
      product.stock ??
        product.quantity ??
        product.inventory ??
        0
    );

    if (stock <= 0) return;

    const cartProduct = {
      ...product,
      id: productId,
    };

    addToCart(cartProduct, 1);
    setAddedProductId(productId);

    setTimeout(() => {
      setAddedProductId(null);
    }, 1800);
  };

  const handleViewAll = () => {
    navigate("/products");
  };

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
        className: "stock-soldout",
      };
    }

    if (stock <= 5) {
      return {
        label: `Only ${stock} left`,
        className: "stock-low",
      };
    }

    return {
      label: "In Stock",
      className: "stock-good",
    };
  };

  return (
    <section className="best-sellers">
      <div className="best-glow best-glow-one" />
      <div className="best-glow best-glow-two" />

      <div className="best-container">
        <div className="best-header">
          <div className="best-header-content">
            <span className="best-tag">
              <FaTrophy />
              BEST SELLERS
            </span>

            <h2>Africa's Most Loved Products</h2>

            <p>
              Discover the products customers across Africa
              and around the world are buying again and again.
            </p>

            <div className="best-trust">
              <div className="best-trust-item">
                <FaShieldAlt />
                <span>Verified Sellers</span>
              </div>

              <div className="best-trust-item">
                <FaStar />
                <span>Top Rated</span>
              </div>

              <div className="best-trust-item">
                <FaShoppingCart />
                <span>Customer Favorites</span>
              </div>
            </div>
          </div>

          {bestProducts.length > 1 && (
            <div className="best-controls">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous best seller"
                className="best-control-btn"
              >
                <FaChevronLeft />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next best seller"
                className="best-control-btn"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {bestProducts.length > 0 ? (
          <>
            <div className="best-carousel">
              {bestProducts.map((product, index) => {
                const productId = getProductId(product);
                const stockStatus = getStockStatus(product);
                const stock = getStock(product);
                const isAdded = addedProductId === productId;

                return (
                  <div
                    key={productId}
                    className={`best-card ${
                      index === current ? "active" : ""
                    }`}
                  >
                    <div className="best-ribbon">
                      <FaTrophy />
                      <span>#{index + 1} BEST SELLER</span>
                    </div>

                    {product.discount > 0 && (
                      <div className="best-discount">
                        -{product.discount}%
                      </div>
                    )}

                    <div className="best-product">
                      <ProductCard product={product} />
                    </div>

                    <div className="best-extra">
                      <div className="best-rating">
                        <div className="best-rating-main">
                          <FaStar />
                          <strong>{product.rating || 4.9}</strong>
                          <span>
                            ({product.reviews || 0} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="best-seller-info">
                        <div className="best-seller-verified">
                          <FaCheck />
                          <span>Verified Seller</span>
                        </div>

                        <div
                          className={`best-stock ${stockStatus.className}`}
                        >
                          {stock > 0 && <FaBoxOpen />}
                          <span>{stockStatus.label}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`best-btn ${
                          isAdded ? "best-btn-added" : ""
                        }`}
                        onClick={() => handleAddToCart(product)}
                        disabled={stock <= 0}
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
                            <FaArrowRight className="best-btn-arrow" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {bestProducts.length > 1 && (
              <div className="best-dots">
                {bestProducts.map((product, index) => (
                  <button
                    type="button"
                    key={getProductId(product) || index}
                    className={`best-dot ${
                      current === index ? "active-dot" : ""
                    }`}
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to best seller ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="best-footer">
              <div className="best-footer-message">
                <FaTrophy />
                <span>
                  Trusted by customers across Africa and worldwide
                </span>
              </div>

              <button
                type="button"
                className="best-view-all"
                onClick={handleViewAll}
              >
                Explore All Products
                <FaArrowRight />
              </button>
            </div>
          </>
        ) : (
          <div className="no-products">
            <div className="empty-best-icon">
              <FaTrophy />
            </div>

            <h3>No Best Sellers Yet</h3>

            <p>
              Our best-selling products will appear here
              as customers discover their favorites.
            </p>

            <button
              type="button"
              className="best-view-all"
              onClick={handleViewAll}
            >
              Explore Marketplace
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
