import {
  FaGlobeAfrica,
  FaLock,
  FaCheckCircle,
  FaTruck,
  FaComments,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaArrowRight,
  FaChevronRight,
  FaShieldAlt,
  FaStore,
  FaShoppingBag,
  FaHeadset,
  FaCreditCard,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  const countries = [
    { code: "UG", name: "Uganda" },
    { code: "KE", name: "Kenya" },
    { code: "TZ", name: "Tanzania" },
    { code: "RW", name: "Rwanda" },
    { code: "NG", name: "Nigeria" },
    { code: "GH", name: "Ghana" },
    { code: "ZA", name: "South Africa" },
    { code: "ET", name: "Ethiopia" },
    { code: "ZM", name: "Zambia" },
    { code: "BW", name: "Botswana" },
  ];

  const marketplaceLinks = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "Products", path: "/products" },
    { label: "Flash Sale", path: "/flash-sale" },
    { label: "Featured Products", path: "/featured-products" },
    { label: "Best Sellers", path: "/best-sellers" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Trending Products", path: "/trending-products" },
  ];

  const customerLinks = [
    { label: "My Account", path: "/account" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Shopping Cart", path: "/cart" },
    { label: "Orders", path: "/orders" },
    { label: "Track Order", path: "/track-order" },
    { label: "Returns", path: "/returns" },
    { label: "Help Centre", path: "/help" },
    { label: "Support", path: "/support" },
  ];

  const sellerLinks = [
    { label: "Become a Seller", path: "/register" },
    { label: "Seller Dashboard", path: "/seller/dashboard" },
    { label: "Seller Support", path: "/seller/support" },
    { label: "Advertising", path: "/seller/advertising" },
    { label: "Affiliate Program", path: "/affiliate" },
    { label: "Business Solutions", path: "/business" },
  ];

  const paymentLinks = [
    { label: "MTN Mobile Money", path: "/payments" },
    { label: "Airtel Money", path: "/payments" },
    { label: "M-Pesa", path: "/payments" },
    { label: "Visa", path: "/payments" },
    { label: "Mastercard", path: "/payments" },
    { label: "PayPal", path: "/payments" },
    { label: "Bitcoin", path: "/payments" },
    { label: "USDT", path: "/payments" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Refund Policy", path: "/refund-policy" },
    { label: "Cookie Policy", path: "/cookies" },
  ];

  return (
    <footer className="footer">

      {/* =====================================================
          TOP BRAND STRIP
      ===================================================== */}

      <div className="footer-top-strip">

        <div className="footer-top-strip-inner">

          <div className="footer-top-message">
            <FaGlobeAfrica />

            <span>
              <strong>Built in Africa.</strong>{" "}
              Connecting Africa to the World.
            </span>
          </div>

          <div className="footer-top-actions">

            <Link to="/register">
              <FaStore />
              Become a Seller
            </Link>

            <Link to="/support">
              <FaHeadset />
              Get Help
            </Link>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="footer-main">

        <div className="footer-container">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="footer-brand">

            <Link to="/" className="footer-logo">

              <div className="footer-logo-icon">
                <FaGlobeAfrica />
              </div>

              <div className="footer-logo-text">
                <span>AfriMarket</span>
                <small>Shop everything African</small>
              </div>

            </Link>

            <p className="footer-description">
              Africa's digital marketplace connecting buyers
              and sellers across Africa and the world. Discover
              trusted products, African brands, and new
              opportunities in one powerful marketplace.
            </p>

            {/* TRUST BADGES */}

            <div className="footer-trust">

              <div className="footer-trust-item">
                <div className="footer-trust-icon">
                  <FaLock />
                </div>

                <span>Secure Payments</span>
              </div>

              <div className="footer-trust-item">
                <div className="footer-trust-icon">
                  <FaCheckCircle />
                </div>

                <span>Verified Sellers</span>
              </div>

              <div className="footer-trust-item">
                <div className="footer-trust-icon">
                  <FaTruck />
                </div>

                <span>Fast Delivery</span>
              </div>

              <div className="footer-trust-item">
                <div className="footer-trust-icon">
                  <FaComments />
                </div>

                <span>24/7 Support</span>
              </div>

            </div>

          </div>

          {/* =================================================
              LINKS
          ================================================= */}

          <div className="footer-links">

            {/* MARKETPLACE */}

            <div className="footer-column">

              <h3>
                <FaShoppingBag />
                Marketplace
              </h3>

              <ul>
                {marketplaceLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>
                      <FaChevronRight />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

            {/* CUSTOMER */}

            <div className="footer-column">

              <h3>
                <FaShoppingBag />
                Customer
              </h3>

              <ul>
                {customerLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>
                      <FaChevronRight />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

            {/* SELLER */}

            <div className="footer-column">

              <h3>
                <FaStore />
                Seller Centre
              </h3>

              <ul>
                {sellerLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>
                      <FaChevronRight />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

            {/* PAYMENTS */}

            <div className="footer-column">

              <h3>
                <FaCreditCard />
                Payment Options
              </h3>

              <ul>
                {paymentLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>
                      <FaChevronRight />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MARKETPLACE TRUST BAR
      ===================================================== */}

      <div className="footer-trust-bar">

        <div className="footer-container">

          <div className="footer-trust-bar-item">

            <div className="footer-trust-bar-icon">
              <FaShieldAlt />
            </div>

            <div>
              <strong>Protected Shopping</strong>
              <span>Secure transactions</span>
            </div>

          </div>

          <div className="footer-trust-bar-item">

            <div className="footer-trust-bar-icon">
              <FaCheckCircle />
            </div>

            <div>
              <strong>Trusted Sellers</strong>
              <span>Verified marketplace partners</span>
            </div>

          </div>

          <div className="footer-trust-bar-item">

            <div className="footer-trust-bar-icon">
              <FaTruck />
            </div>

            <div>
              <strong>Worldwide Delivery</strong>
              <span>Across Africa & beyond</span>
            </div>

          </div>

          <div className="footer-trust-bar-item">

            <div className="footer-trust-bar-icon">
              <FaHeadset />
            </div>

            <div>
              <strong>Always Here to Help</strong>
              <span>Customer support available 24/7</span>
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          AFRICA COVERAGE + CONTACT
      ===================================================== */}

      <div className="footer-middle">

        <div className="footer-container footer-middle-grid">

          {/* AFRICA COVERAGE */}

          <div className="footer-region">

            <div className="footer-region-heading">

              <div className="region-icon">
                <FaGlobeAfrica />
              </div>

              <div>
                <h3>Growing Across Africa</h3>

                <p>
                  Serving customers and businesses across
                  the continent.
                </p>
              </div>

            </div>

            <div className="countries">

              {countries.map((country) => (
                <span
                  className="country-pill"
                  key={country.code}
                >
                  <strong>{country.code}</strong>
                  <span>{country.name}</span>
                </span>
              ))}

            </div>

            <div className="coming-soon">
              <span></span>
              More African markets coming soon
            </div>

          </div>

          {/* CONTACT */}

          <div className="footer-contact">

            <h3>Contact AfriMarket</h3>

            <div className="contact-item">

              <div className="contact-icon">
                <FaPhoneAlt />
              </div>

              <div>
                <small>Phone</small>
                <span>+256 788 886 366</span>
              </div>

            </div>

            <div className="contact-item">

              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <div>
                <small>Email</small>
                <span>support@afrimarket.africa</span>
              </div>

            </div>

            <div className="contact-item">

              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <small>Head Office</small>
                <span>Kampala, Uganda</span>
              </div>

            </div>

            <div className="contact-item">

              <div className="contact-icon">
                <FaClock />
              </div>

              <div>
                <small>Support</small>
                <span>24/7 Customer Support</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SOCIAL / CTA
      ===================================================== */}

      <div className="footer-social-section">

        <div className="footer-container">

          <div className="footer-social-content">

            <div>
              <span className="footer-social-eyebrow">
                STAY CONNECTED
              </span>

              <h3>
                Follow the AfriMarket journey.
              </h3>

              <p>
                Discover African businesses, products,
                brands, sellers, and marketplace updates.
              </p>
            </div>

            <div className="social-links">

              <a
                href="#"
                aria-label="Facebook"
                className="facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="X"
                className="x-twitter"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="youtube"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="linkedin"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <div className="footer-bottom">

        <div className="footer-container footer-bottom-inner">

          <div className="footer-copyright">

            <p>
              © {new Date().getFullYear()}{" "}
              <strong>AfriMarket</strong>.
              All Rights Reserved.
            </p>

            <p className="footer-tagline">
              <FaGlobeAfrica />
              Connecting Africa to the World.
            </p>

          </div>

          <div className="footer-legal">

            {legalLinks.map((link) => (
              <Link
                to={link.path}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}

          </div>

        </div>

        {/* FOUNDER */}

        <div className="footer-founder">

          <span>
            AfriMarket
          </span>

          <span className="footer-founder-divider">
            •
          </span>

          <span>
            Founded by Hamza Ssenabulya
          </span>

        </div>

      </div>

    </footer>
  );
}