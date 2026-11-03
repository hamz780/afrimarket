import { useEffect, useState } from "react";
import {
  FaBolt,
  FaClock,
  FaShoppingCart,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";

import "./FlashSale.css";

export default function FlashSale() {
  const { products = [] } = useProducts();
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);

  /* =========================================================
     DISCOUNTED PRODUCTS
  ========================================================= */

  const flashProducts = products.filter(
    (product) => Number(product.discount || 0) > 0
  );

  /* =========================================================
     COUNTDOWN
  ========================================================= */

  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 12;
          minutes = 45;
          seconds = 30;
        }

        return {
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* =========================================================
     HELPERS
  ========================================================= */

  const formatNumber = (value) =>
    String(value).padStart(2, "0");

  const getProductId = (product) =>
    product.id || product._id;

  const getStockPercentage = (stock) => {
    const quantity = Number(stock || 0);

    if (quantity <= 0) return 0;

    return Math.min((quantity / 50) * 100, 100);
  };

  const getStockStatus = (stock) => {
    const quantity = Number(stock || 0);

    if (quantity <= 0) {
      return "Sold Out";
    }

    if (quantity <= 5) {
      return "Almost Gone";
    }

    if (quantity <= 15) {
      return "Selling Fast";
    }

    return "Limited Stock";
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = (product) => {
    const stock = Number(product.stock || 0);

    if (stock <= 0) {
      return;
    }

    const productId = getProductId(product);

    /*
      Normalize MongoDB _id into id because
      CartContext uses item.id to identify products.
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

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="flash-sale">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="flash-glow flash-glow-one"></div>
      <div className="flash-glow flash-glow-two"></div>

      <div className="flash-container">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="flash-header">

          <div className="flash-heading">

            <div className="flash-eyebrow">

              <span className="flash-eyebrow-icon">
                <FaBolt />
              </span>

              LIMITED TIME OFFERS

            </div>

            <h2>
              Flash
              <span> Sale</span>
            </h2>

            <p>
              Discover exceptional deals from trusted African
              sellers before these offers disappear.
            </p>

          </div>

          {/* =================================================
              COUNTDOWN
          ================================================== */}

          <div className="flash-countdown-wrapper">

            <div className="countdown-heading">
              <FaClock />
              <span>Offers end in</span>
            </div>

            <div className="flash-countdown">

              <div className="time-box">
                <strong>
                  {formatNumber(timeLeft.hours)}
                </strong>

                <span>Hours</span>
              </div>

              <div className="time-separator">
                :
              </div>

              <div className="time-box">
                <strong>
                  {formatNumber(timeLeft.minutes)}
                </strong>

                <span>Minutes</span>
              </div>

              <div className="time-separator">
                :
              </div>

              <div className="time-box">
                <strong>
                  {formatNumber(timeLeft.seconds)}
                </strong>

                <span>Seconds</span>
              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div className="flash-divider">

          <div className="flash-divider-line"></div>

          <div className="flash-divider-badge">
            <FaBolt />
            HOT DEALS
          </div>

          <div className="flash-divider-line"></div>

        </div>

        {/* ===================================================
            PRODUCTS
        ==================================================== */}

        <div className="flash-products">

          {flashProducts.length > 0 ? (

            flashProducts.map((product) => {

              const productId = getProductId(product);

              const stock = Number(product.stock || 0);

              const stockPercentage =
                getStockPercentage(stock);

              const stockStatus =
                getStockStatus(stock);

              const wasAdded =
                addedProductId === productId;

              return (
                <article
                  className="sale-card"
                  key={productId}
                >

                  {/* =========================================
                      SALE BADGE
                  ========================================== */}

                  <div className="sale-badge">

                    <FaBolt />

                    <span>
                      {product.discount}% OFF
                    </span>

                  </div>

                  {/* =========================================
                      PRODUCT
                  ========================================== */}

                  <div className="sale-product">
                    <ProductCard product={product} />
                  </div>

                  {/* =========================================
                      STOCK
                  ========================================== */}

                  <div className="stock-wrapper">

                    <div className="stock-header">

                      <span className="stock-label">
                        {stockStatus}
                      </span>

                      <span className="stock-quantity">

                        {stock > 0
                          ? `${stock} left`
                          : "Sold Out"}

                      </span>

                    </div>

                    <div className="stock-bar">

                      <div
                        className="stock-progress"
                        style={{
                          width: `${stockPercentage}%`,
                        }}
                      />

                    </div>

                    {stock > 0 && stock <= 15 && (
                      <div className="stock-warning">
                        🔥 High demand — selling fast
                      </div>
                    )}

                  </div>

                  {/* =========================================
                      ADD TO CART
                  ========================================== */}

                  <button
                    type="button"
                    className={`flash-cart-btn ${
                      wasAdded
                        ? "flash-cart-btn-added"
                        : ""
                    }`}
                    disabled={stock <= 0}
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >

                    {wasAdded ? (
                      <>
                        <FaCheck />

                        <span>
                          Added to Cart
                        </span>
                      </>
                    ) : (
                      <>
                        <FaShoppingCart />

                        <span>
                          {stock <= 0
                            ? "Sold Out"
                            : "Add to Cart"}
                        </span>

                        {stock > 0 && (
                          <span className="cart-arrow">
                            <FaArrowRight />
                          </span>
                        )}
                      </>
                    )}

                  </button>

                </article>
              );
            })

          ) : (

            /* ===============================================
               EMPTY STATE
            ================================================ */

            <div className="no-products">

              <div className="empty-sale-icon">
                <FaBolt />
              </div>

              <h3>
                No Flash Sale Products
              </h3>

              <p>
                There are currently no discounted products.
                Check back soon for exclusive AfriMarket deals.
              </p>

            </div>

          )}

        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        {flashProducts.length > 0 && (

          <div className="flash-footer">

            <div className="flash-footer-text">

              <FaBolt />

              <span>
                New deals are added regularly
              </span>

            </div>

            <span className="flash-footer-dot">
              •
            </span>

            <span>
              Shop smart. Save more.
            </span>

          </div>

        )}

      </div>

    </section>
  );
}