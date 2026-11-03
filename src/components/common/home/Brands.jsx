import { useNavigate } from "react-router-dom";

import {
  FaMobileAlt,
  FaApple,
  FaShoePrints,
  FaSignal,
  FaIndustry,
  FaArrowRight,
  FaCheckCircle,
  FaGlobeAfrica,
  FaStore,
} from "react-icons/fa";

import "./Brands.css";

/* =========================================================
   AFRIMARKET BRANDS
========================================================= */

const brands = [
  {
    name: "Samsung",
    logo: <FaMobileAlt />,
    category: "Electronics",
  },
  {
    name: "Apple",
    logo: <FaApple />,
    category: "Technology",
  },
  {
    name: "Nike",
    logo: <FaShoePrints />,
    category: "Fashion",
  },
  {
    name: "Adidas",
    logo: <FaShoePrints />,
    category: "Sportswear",
  },
  {
    name: "Tecno",
    logo: <FaMobileAlt />,
    category: "Mobile",
  },
  {
    name: "MTN",
    logo: <FaSignal />,
    category: "Telecommunications",
  },
  {
    name: "Nestlé",
    logo: "N",
    category: "Food & Beverage",
  },
  {
    name: "Dangote",
    logo: <FaIndustry />,
    category: "Manufacturing",
  },
];

export default function Brands() {
  const navigate = useNavigate();

  /* =====================================================
     BRAND CLICK
  ===================================================== */

  const handleBrandClick = (brand) => {
    navigate(
      `/products?brand=${encodeURIComponent(brand.name)}`
    );
  };

  /* =====================================================
     VIEW ALL BRANDS
  ===================================================== */

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <section className="brands">

      {/* =================================================
          DECORATIVE BACKGROUND
      ================================================= */}

      <div className="brands-glow brands-glow-one" />
      <div className="brands-glow brands-glow-two" />

      <div className="brands-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="brands-header">

          <div className="brands-header-content">

            <span className="brands-tag">
              <FaStore />
              TRUSTED BRANDS
            </span>

            <h2>
              Popular Brands
            </h2>

            <p>
              Discover authentic products from leading African
              and international brands available on AfriMarket.
            </p>

          </div>

          <button
            type="button"
            className="brands-view-btn"
            onClick={handleViewAll}
          >
            Explore Marketplace
            <FaArrowRight />
          </button>

        </div>

        {/* =================================================
            TRUST BAR
        ================================================= */}

        <div className="brands-trust">

          <div className="brands-trust-item">
            <span className="brands-trust-icon">
              <FaCheckCircle />
            </span>

            <div>
              <strong>Authentic Products</strong>
              <span>Shop with confidence</span>
            </div>
          </div>

          <div className="brands-trust-divider" />

          <div className="brands-trust-item">
            <span className="brands-trust-icon">
              <FaGlobeAfrica />
            </span>

            <div>
              <strong>Africa & Worldwide</strong>
              <span>Brands from around the world</span>
            </div>
          </div>

          <div className="brands-trust-divider" />

          <div className="brands-trust-item">
            <span className="brands-trust-icon">
              <FaStore />
            </span>

            <div>
              <strong>Verified Sellers</strong>
              <span>Trusted marketplace partners</span>
            </div>
          </div>

        </div>

        {/* =================================================
            BRANDS GRID
        ================================================= */}

        <div className="brands-grid">

          {brands.map((brand, index) => (

            <button
              type="button"
              className="brand-card"
              key={brand.name}
              onClick={() => handleBrandClick(brand)}
              aria-label={`Shop ${brand.name} products`}
            >

              {/* Card Number */}

              <span className="brand-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Logo */}

              <div className="brand-logo">
                {brand.logo}
              </div>

              {/* Brand Info */}

              <div className="brand-info">

                <strong>
                  {brand.name}
                </strong>

                <span>
                  {brand.category}
                </span>

              </div>

              {/* Arrow */}

              <span className="brand-arrow">
                <FaArrowRight />
              </span>

              {/* Verified */}

              <span className="brand-verified">
                <FaCheckCircle />
                Verified
              </span>

            </button>

          ))}

        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <div className="brands-bottom">

          <div className="brands-bottom-content">

            <div className="brands-bottom-icon">
              <FaGlobeAfrica />
            </div>

            <div>

              <strong>
                Your favorite brands, all in one marketplace
              </strong>

              <span>
                Shop trusted names alongside unique products
                from African sellers.
              </span>

            </div>

          </div>

          <button
            type="button"
            className="brands-bottom-btn"
            onClick={handleViewAll}
          >
            Shop Brands
            <FaArrowRight />
          </button>

        </div>

      </div>

    </section>
  );
}