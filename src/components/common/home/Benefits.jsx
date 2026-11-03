import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaHeadset,
  FaTimes,
  FaCheckCircle,
  FaLock,
  FaCreditCard,
  FaUserShield,
  FaGlobeAfrica,
  FaBoxOpen,
  FaClock,
} from "react-icons/fa";

import "./Benefits.css";

const benefits = [
  {
    icon: <FaTruck />,
    title: "Fast & Reliable Delivery",
    description:
      "Quick shipping across Africa and international destinations.",
    badge: "Africa & Worldwide",
    type: "green",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payments",
    description:
      "Protected transactions with trusted and secure payment partners.",
    badge: "100% Protected",
    type: "gold",
  },
  {
    icon: <FaStar />,
    title: "Verified Quality",
    description:
      "Quality products from trusted and verified sellers.",
    badge: "Trusted Sellers",
    type: "green",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Customer Support",
    description:
      "Our support team is always ready to help whenever you need us.",
    badge: "Always Available",
    type: "gold",
  },
];

export default function Benefits() {
  const navigate = useNavigate();

  const [activeBenefit, setActiveBenefit] = useState(null);

  const handleBenefitClick = (benefit) => {
    if (benefit.title === "24/7 Customer Support") {
      navigate("/customer-service");
      return;
    }

    setActiveBenefit(benefit);
  };

  const closeBenefit = () => {
    setActiveBenefit(null);
  };

  return (
    <section className="benefits">

      {/* Background decoration */}
      <div className="benefits-decoration benefits-decoration-one"></div>
      <div className="benefits-decoration benefits-decoration-two"></div>

      <div className="benefits-container">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="benefits-header">

          <div className="benefits-label">
            <span>💚</span>
            Why Choose Us
          </div>

          <h2>
            Why Shop With <span>AfriMarket?</span>
          </h2>

          <p>
            Everything you need for a safe, reliable and enjoyable
            shopping experience.
          </p>

        </div>

        {/* =====================================================
            BENEFITS
        ====================================================== */}

        <div className="benefits-grid">

          {benefits.map((benefit, index) => {

            const isSupport =
              benefit.title === "24/7 Customer Support";

            return (
              <div
                className={`benefit-card ${benefit.type} ${
                  isSupport ? "benefit-card-clickable" : "benefit-card-clickable"
                }`}
                key={index}
                onClick={() => handleBenefitClick(benefit)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    handleBenefitClick(benefit);
                  }
                }}
                role="button"
                tabIndex={0}
                title={`Learn more about ${benefit.title}`}
              >

                {/* Icon */}
                <div className="benefit-icon">
                  {benefit.icon}
                </div>

                {/* Content */}
                <div className="benefit-content">

                  <h3>
                    {benefit.title}
                  </h3>

                  <p>
                    {benefit.description}
                  </p>

                  {/* Badge */}
                  <div className="benefit-badge">

                    <span>
                      <FaCheckCircle />
                    </span>

                    {benefit.badge}

                  </div>

                  {/* Delivery CTA */}
                  {benefit.title === "Fast & Reliable Delivery" && (
                    <div className="benefit-action">
                      Delivery Details
                      <span>→</span>
                    </div>
                  )}

                  {/* Payment CTA */}
                  {benefit.title === "Secure Payments" && (
                    <div className="benefit-action">
                      View Security Details
                      <span>→</span>
                    </div>
                  )}

                  {/* Quality CTA */}
                  {benefit.title === "Verified Quality" && (
                    <div className="benefit-action">
                      Why It Matters
                      <span>→</span>
                    </div>
                  )}

                  {/* Support CTA */}
                  {isSupport && (
                    <div className="benefit-support-link">
                      Get Help →
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

        {/* =====================================================
            TRUST MESSAGE
        ====================================================== */}

        <div className="benefits-trust">

          <span>🌍</span>

          <strong>
            Shop Africa. Shop the World.
          </strong>

          <span className="trust-dot">
            •
          </span>

          <span>
            Trusted by customers everywhere
          </span>

        </div>

      </div>

      {/* =====================================================
          BENEFIT MODAL
      ====================================================== */}

      {activeBenefit && (

        <div
          className="benefit-modal-overlay"
          onClick={closeBenefit}
        >

          <div
            className="benefit-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Close */}
            <button
              className="benefit-modal-close"
              onClick={closeBenefit}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {/* Modal Icon */}
            <div
              className={`benefit-modal-icon ${activeBenefit.type}`}
            >
              {activeBenefit.icon}
            </div>

            <h2>
              {activeBenefit.title}
            </h2>

            {/* =================================================
                DELIVERY
            ================================================= */}

            {activeBenefit.title ===
              "Fast & Reliable Delivery" && (

              <>
                <p className="benefit-modal-intro">
                  AfriMarket is built to connect customers
                  with products across Africa and the world.
                </p>

                <div className="security-features">

                  <div className="security-feature">

                    <div className="security-feature-icon">
                      <FaGlobeAfrica />
                    </div>

                    <div>
                      <h4>
                        Africa & Worldwide
                      </h4>

                      <p>
                        Shop from trusted sellers and
                        discover products from across Africa
                        and international destinations.
                      </p>
                    </div>

                  </div>

                  <div className="security-feature">

                    <div className="security-feature-icon">
                      <FaClock />
                    </div>

                    <div>
                      <h4>
                        Reliable Shipping
                      </h4>

                      <p>
                        Delivery information will be shown
                        during checkout based on your order
                        and destination.
                      </p>
                    </div>

                  </div>

                  <div className="security-feature">

                    <div className="security-feature-icon">
                      <FaBoxOpen />
                    </div>

                    <div>
                      <h4>
                        Order Tracking
                      </h4>

                      <p>
                        Track your orders as AfriMarket's
                        delivery system continues to develop.
                      </p>
                    </div>

                  </div>

                  <div className="security-protected delivery-protected">

                    <FaCheckCircle />

                    <strong>
                      Africa & Worldwide Delivery
                    </strong>

                  </div>

                </div>
              </>
            )}

            {/* =================================================
                SECURE PAYMENTS
            ================================================= */}

            {activeBenefit.title ===
              "Secure Payments" && (

              <>
                <p className="benefit-modal-intro">
                  Your safety is one of AfriMarket's
                  highest priorities.
                </p>

                <div className="security-features">

                  <div className="security-feature">

                    <div className="security-feature-icon">
                      <FaLock />
                    </div>

                    <div>
                      <h4>
                        Protected Transactions
                      </h4>

                      <p>
                        Your payment information is protected
                        during checkout and transaction
                        processing.
                      </p>
                    </div>

                  </div>

                  <div className="security-feature">

                    <div className="security-feature-icon">
                      <FaCreditCard />
                    </div>

                    <div>
                      <h4>
                        Trusted Payment Partners
                      </h4>

                      <p>
                        Payments are designed to be processed
                        through trusted and secure payment
                        providers.
                      </p>
                    </div>

                  </div>

                  <div className="security-feature">

                    <div className="security-feature-icon">
                      <FaUserShield />
                    </div>

                    <div>
                      <h4>
                        Customer Protection
                      </h4>

                      <p>
                        AfriMarket is designed to provide
                        customers with a safer shopping
                        experience.
                      </p>
                    </div>

                  </div>

                  <div className="security-protected">

                    <FaCheckCircle />

                    <strong>
                      100% Protected Shopping Experience
                    </strong>

                  </div>

                </div>
              </>
            )}

            {/* =================================================
                VERIFIED QUALITY
            ================================================= */}

            {activeBenefit.title ===
              "Verified Quality" && (

              <>
                <p className="benefit-modal-intro">
                  We're building AfriMarket around trusted
                  sellers and quality products.
                </p>

                <div className="security-features">

                  <div className="security-feature">

                    <div className="security-feature-icon">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <h4>
                        Trusted Sellers
                      </h4>

                      <p>
                        Products can come from sellers who
                        meet AfriMarket's marketplace standards.
                      </p>
                    </div>

                  </div>

                  <div className="security-feature">

                    <div className="security-feature-icon">
                      <FaStar />
                    </div>

                    <div>
                      <h4>
                        Quality Focus
                      </h4>

                      <p>
                        Customers can review products and
                        sellers to help build marketplace trust.
                      </p>
                    </div>

                  </div>

                  <div className="security-protected">

                    <FaCheckCircle />

                    <strong>
                      Quality You Can Trust
                    </strong>

                  </div>

                </div>
              </>
            )}

            {/* =================================================
                BUTTON
            ================================================= */}

            <button
              className="benefit-modal-button"
              onClick={closeBenefit}
            >
              Continue Shopping
            </button>

          </div>

        </div>
      )}

    </section>
  );
}