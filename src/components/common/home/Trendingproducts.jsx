import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";

import {
  FaFire,
  FaShoppingCart,
  FaCheck,
  FaStar,
  FaShieldAlt,
  FaArrowRight,
  FaEye,
  FaChartLine,
  FaBoxOpen,
} from "react-icons/fa";

import "./TrendingProducts.css";

export default function TrendingProducts() {
  const navigate = useNavigate();

  const { products = [] } = useProducts();
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);

  /* =====================================================
     TRENDING PRODUCTS
  ===================================================== */

  const trendingProducts = products.filter(
    (product) => product.trending === true
  );

  /* =====================================================
     PRODUCT ID
  ===================================================== */

  const getProductId = (product) => {
    return product.id || product._id;
  };

  /* =====================================================
     STABLE TRENDING ACTIVITY
     
     This prevents Math.random() from changing the numbers
     every time the component re-renders.
  ===================================================== */

  const activityData = useMemo(() => {
    const data = {};

    trendingProducts.forEach((product, index) => {
      const id = getProductId(product);

      if (!id) return;

      data[id] = {
        viewers: 45 + ((index * 73 + 31) % 455),
        soldToday: 20 + ((index * 29 + 17) % 100),
      };
    });

    return data;
  }, [trendingProducts]);

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const handleAddToCart = (product) => {
    const productId = getProductId(product);

    if (!productId) {
      console.error(
        "Trending product is missing an ID:",
        product
      );
      return;
    }

    const stock = Number(
      product.stock ??
        product.quantity ??
        product.inventory ??
        0
    );

    if (stock <= 0) return;

    /*
      CartContext uses item.id.
      MongoDB products may use _id.
      Normalize the ID before adding.
    */

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

  /* =====================================================
     VIEW ALL
  ===================================================== */

  const handleViewAll = () => {
    navigate("/products");
  };

  /* =====================================================
     STOCK
  ===================================================== */

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
        className: "trend-stock-soldout",
      };
    }

    if (stock <= 5) {
      return {
        label: `Only ${stock} left`,
        className: "trend-stock-low",
      };
    }

    return {
      label: "In Stock",
      className: "trend-stock-good",
    };
  };

  /* =====================================================
     AUTO REFRESH / LIVE FEEL
  ===================================================== */

  const [livePulse, setLivePulse] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePulse((prev) => !prev);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section className="trending-section">

      {/* =================================================
          DECORATIVE BACKGROUND
      ================================================= */}

      <div className="trending-glow trending-glow-one" />
      <div className="trending-glow trending-glow-two" />

      <div className="trending-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="trending-header">

          <div className="trending-header-content">

            <span className="trending-tag">
              <FaFire />
              TRENDING NOW
            </span>

            <h2>
              Trending Across Africa
            </h2>

            <p>
              Discover the products shoppers are loving,
              sharing, and buying right now across Africa
              and beyond.
            </p>

            {/* Trust Indicators */}

            <div className="trending-trust">

              <div className="trending-trust-item">
                <FaChartLine />
                <span>Popular Right Now</span>
              </div>

              <div className="trending-trust-item">
                <FaShieldAlt />
                <span>Verified Sellers</span>
              </div>

              <div className="trending-trust-item">
                <FaStar />
                <span>Top Rated</span>
              </div>

            </div>

          </div>

          {/* Live Indicator */}

          <div className="trending-live">

            <span
              className={`live-dot ${
                livePulse ? "live-active" : ""
              }`}
            />

            <div>
              <strong>Live Marketplace</strong>
              <span>Updated in real time</span>
            </div>

          </div>

        </div>

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        {trendingProducts.length > 0 ? (

          <div className="trending-grid">

            {trendingProducts.map((product, index) => {

              const productId = getProductId(product);

              const activity =
                activityData[productId] || {
                  viewers: 80,
                  soldToday: 25,
                };

              const stock = getStock(product);

              const stockStatus =
                getStockStatus(product);

              const isAdded =
                addedProductId === productId;

              return (

                <div
                  className="trending-card"
                  key={productId}
                >

                  {/* =================================================
                      TRENDING BADGE
                  ================================================= */}

                  <div className="trending-badge">

                    <FaFire />

                    <span>
                      Trending
                    </span>

                  </div>

                  {/* Ranking */}

                  <div className="trending-rank">
                    #{index + 1}
                  </div>

                  {/* Discount */}

                  {product.discount > 0 && (
                    <div className="trending-discount">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Product */}

                  <div className="trending-product">
                    <ProductCard product={product} />
                  </div>

                  {/* =================================================
                      PRODUCT FOOTER
                  ================================================= */}

                  <div className="trending-footer">

                    {/* Live Activity */}

                    <div className="trending-activity">

                      <div className="live-view">

                        <FaEye />

                        <span>
                          {activity.viewers}
                        </span>

                        <small>
                          people viewing
                        </small>

                      </div>

                      <div className="sold">

                        <FaCheck />

                        <span>
                          {activity.soldToday}
                        </span>

                        <small>
                          sold today
                        </small>

                      </div>

                    </div>

                    {/* Rating */}

                    <div className="trending-rating">

                      <div className="trending-rating-stars">

                        <FaStar />

                        <strong>
                          {product.rating || 4.8}
                        </strong>

                      </div>

                      <span>
                        {product.reviews || 0} reviews
                      </span>

                    </div>

                    {/* Seller */}

                    <div className="trending-seller">

                      <div className="trending-verified">

                        <span className="verified-icon">
                          <FaCheck />
                        </span>

                        <span>
                          Verified Seller
                        </span>

                      </div>

                      <div
                        className={`trending-stock ${stockStatus.className}`}
                      >
                        {stock > 0 && <FaBoxOpen />}

                        <span>
                          {stockStatus.label}
                        </span>

                      </div>

                    </div>

                    {/* Add To Cart */}

                    <button
                      type="button"
                      className={`trending-btn ${
                        isAdded
                          ? "trending-btn-added"
                          : ""
                      }`}
                      onClick={() =>
                        handleAddToCart(product)
                      }
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

                          <FaArrowRight className="trending-btn-arrow" />
                        </>
                      )}

                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="no-products">

            <div className="empty-trending-icon">
              <FaFire />
            </div>

            <h3>
              No Trending Products Yet
            </h3>

            <p>
              Popular products will appear here as shoppers
              discover what's hot on AfriMarket.
            </p>

            <button
              type="button"
              className="trending-view-all"
              onClick={handleViewAll}
            >
              Explore Marketplace
              <FaArrowRight />
            </button>

          </div>

        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        {trendingProducts.length > 0 && (

          <div className="trending-bottom">

            <div className="trending-bottom-message">

              <span className="bottom-fire">
                <FaFire />
              </span>

              <div>
                <strong>
                  What's hot right now
                </strong>

                <span>
                  Explore more products from Africa's
                  fastest-growing marketplace.
                </span>
              </div>

            </div>

            <button
              type="button"
              className="trending-view-all"
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