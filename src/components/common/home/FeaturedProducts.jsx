import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaArrowRight,
  FaCheck,
  FaStar,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";

import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const navigate = useNavigate();

  const { featuredProducts = [] } = useProducts();
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);

  const getProductId = (product) =>
    product.id || product._id;

  const handleAddToCart = (product) => {
    const productId = getProductId(product);

    const stock = Number(product.stock ?? 1);

    if (stock <= 0) {
      return;
    }

    /*
      Normalize the MongoDB _id into id so CartContext
      can correctly identify the product.
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

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <section className="featured-products">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="featured-glow featured-glow-one"></div>
      <div className="featured-glow featured-glow-two"></div>

      <div className="featured-container">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="featured-header">

          <div className="featured-header-content">

            <div className="featured-tag">
              <span className="featured-tag-icon">
                <FaStar />
              </span>

              PREMIUM COLLECTION
            </div>

            <h2>
              Featured
              <span> Products</span>
            </h2>

            <p>
              Explore carefully selected products from trusted
              African sellers, bringing quality, culture and
              exceptional value closer to you.
            </p>

          </div>

          <button
            type="button"
            className="featured-top-link"
            onClick={handleViewAll}
          >
            <span>Explore Marketplace</span>

            <span className="featured-top-arrow">
              <FaArrowRight />
            </span>
          </button>

        </div>

        {/* ===================================================
            FEATURED TRUST BAR
        =================================================== */}

        <div className="featured-trust-bar">

          <div className="featured-trust-item">
            <FaShieldAlt />

            <div>
              <strong>Verified Sellers</strong>
              <span>Trusted marketplace partners</span>
            </div>
          </div>

          <div className="featured-trust-divider"></div>

          <div className="featured-trust-item">
            <FaStar />

            <div>
              <strong>Quality Products</strong>
              <span>Carefully selected products</span>
            </div>
          </div>

          <div className="featured-trust-divider"></div>

          <div className="featured-trust-item">
            <FaBolt />

            <div>
              <strong>Great Value</strong>
              <span>Competitive marketplace prices</span>
            </div>
          </div>

        </div>

        {/* ===================================================
            PRODUCTS
        =================================================== */}

        <div className="featured-grid">

          {featuredProducts.length > 0 ? (

            featuredProducts.map((product) => {

              const productId = getProductId(product);

              const discount =
                Number(product.discount || 0);

              const rating =
                Number(product.rating || 4.8);

              const reviews =
                Number(product.reviews || 0);

              const stock =
                Number(product.stock ?? 1);

              const isAdded =
                addedProductId === productId;

              const isSoldOut =
                stock <= 0;

              return (
                <article
                  className="featured-card"
                  key={productId}
                >

                  {/* =========================================
                      PRODUCT BADGES
                  ========================================= */}

                  <div className="featured-badges">

                    {discount > 0 && (
                      <div className="featured-discount">
                        <FaBolt />
                        <span>
                          {discount}% OFF
                        </span>
                      </div>
                    )}

                    <div className="featured-quality">
                      <FaShieldAlt />
                      <span>Verified</span>
                    </div>

                  </div>

                  {/* =========================================
                      PRODUCT
                  ========================================= */}

                  <div className="featured-product">
                    <ProductCard product={product} />
                  </div>

                  {/* =========================================
                      PRODUCT INFORMATION
                  ========================================= */}

                  <div className="featured-extra">

                    <div className="featured-rating">

                      <div className="featured-rating-main">
                        <FaStar />

                        <strong>
                          {rating.toFixed(1)}
                        </strong>
                      </div>

                      <span>
                        ({reviews}{" "}
                        {reviews === 1
                          ? "Review"
                          : "Reviews"})
                      </span>

                    </div>

                    {/* =======================================
                        SELLER STATUS
                    ======================================= */}

                    <div className="featured-seller-status">

                      <span className="seller-check">
                        <FaCheck />
                      </span>

                      <span>
                        Trusted AfriMarket Seller
                      </span>

                    </div>

                    {/* =======================================
                        CART BUTTON
                    ======================================= */}

                    <button
                      type="button"
                      className={`featured-btn ${
                        isAdded
                          ? "featured-btn-added"
                          : ""
                      }`}
                      disabled={isSoldOut}
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >

                      {isAdded ? (
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
                            {isSoldOut
                              ? "Sold Out"
                              : "Add to Cart"}
                          </span>

                          {!isSoldOut && (
                            <span className="featured-btn-arrow">
                              <FaArrowRight />
                            </span>
                          )}
                        </>
                      )}

                    </button>

                  </div>

                </article>
              );
            })

          ) : (

            /* ===============================================
               EMPTY STATE
            =============================================== */

            <div className="no-products">

              <div className="featured-empty-icon">
                <FaStar />
              </div>

              <h3>
                No Featured Products Available
              </h3>

              <p>
                We're preparing something special.
                Please check back soon for new
                featured products from AfriMarket sellers.
              </p>

              <button
                type="button"
                className="empty-marketplace-btn"
                onClick={handleViewAll}
              >
                Explore Marketplace
                <FaArrowRight />
              </button>

            </div>
          )}

        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        {featuredProducts.length > 0 && (
          <div className="featured-footer">

            <div className="featured-footer-message">

              <span className="footer-star">
                <FaStar />
              </span>

              <div>
                <strong>
                  Discover more from AfriMarket
                </strong>

                <span>
                  Thousands of products from trusted African sellers
                </span>
              </div>

            </div>

            <button
              type="button"
              className="view-all-btn"
              onClick={handleViewAll}
            >
              <span>
                View All Products
              </span>

              <FaArrowRight />
            </button>

          </div>
        )}

      </div>
    </section>
  );
}