import { useState } from "react";
import {
  FaEnvelope,
  FaArrowRight,
  FaLock,
  FaGift,
  FaCheck,
  FaGlobeAfrica,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    setStatus("");
    setMessage("");

    if (!cleanEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const existingSubscribers = JSON.parse(
        localStorage.getItem("afrimarket-newsletter-subscribers") || "[]"
      );

      if (existingSubscribers.includes(cleanEmail)) {
        setStatus("error");
        setMessage(
          "This email is already subscribed to AfriMarket."
        );
        setIsSubmitting(false);
        return;
      }

      const updatedSubscribers = [
        ...existingSubscribers,
        cleanEmail,
      ];

      localStorage.setItem(
        "afrimarket-newsletter-subscribers",
        JSON.stringify(updatedSubscribers)
      );

      localStorage.setItem(
        "afrimarket-newsletter-email",
        cleanEmail
      );

      setStatus("success");
      setMessage(
        "You're officially connected! Watch your inbox for AfriMarket updates."
      );

      setEmail("");
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setStatus("");
    setMessage("");
    setEmail("");
  };

  return (
    <section className="newsletter">
      {/* Decorative Background */}
      <div className="newsletter-decoration newsletter-decoration-one"></div>
      <div className="newsletter-decoration newsletter-decoration-two"></div>
      <div className="newsletter-decoration newsletter-decoration-three"></div>

      <div className="newsletter-content">

        {/* Premium Badge */}
        <div className="newsletter-tag">
          <span className="newsletter-tag-icon">
            <FaEnvelope />
          </span>

          <span>Stay Connected</span>

          <span className="newsletter-tag-dot"></span>
        </div>

        {/* Heading */}
        <h2>
          Stay Connected With{" "}
          <span>AfriMarket</span>
        </h2>

        {/* Description */}
        <p className="newsletter-description">
          Get exclusive deals, fresh arrivals, African brands,
          special offers, and marketplace updates delivered
          directly to your inbox.
        </p>

        {/* Africa Callout */}
        <div className="newsletter-callout">
          <div className="newsletter-callout-icon">
            <FaGlobeAfrica />
          </div>

          <div className="newsletter-callout-content">
            <strong>Africa to the World.</strong>

            <span>
              Be the first to discover what is happening
              across the AfriMarket marketplace.
            </span>
          </div>

          <FaArrowRight className="newsletter-callout-arrow" />
        </div>

        {/* Subscription Area */}
        <div className="newsletter-subscription">

          {!status || status === "error" ? (
            <form
              className="newsletter-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="newsletter-input-wrapper">
                <FaEnvelope className="newsletter-input-icon" />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (status) {
                      setStatus("");
                      setMessage("");
                    }
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="newsletter-spinner"></span>
                    Joining...
                  </>
                ) : (
                  <>
                    Subscribe
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>
          ) : null}

          {/* Error Message */}
          {status === "error" && (
            <div className="newsletter-message newsletter-error">
              <span className="newsletter-message-icon">
                !
              </span>

              <span>{message}</span>
            </div>
          )}

          {/* Success Message */}
          {status === "success" && (
            <div className="newsletter-success">

              <div className="newsletter-success-icon">
                <FaCheck />
              </div>

              <div className="newsletter-success-content">
                <strong>Welcome to AfriMarket!</strong>

                <span>{message}</span>
              </div>

              <button
                type="button"
                className="newsletter-success-close"
                onClick={handleReset}
                aria-label="Subscribe another email"
              >
                Subscribe another
              </button>

            </div>
          )}

        </div>

        {/* Trust Indicators */}
        <div className="newsletter-trust">

          <div className="newsletter-trust-item">
            <div className="newsletter-trust-icon">
              <FaLock />
            </div>

            <div>
              <strong>Secure & Private</strong>
              <span>Your email stays protected</span>
            </div>
          </div>

          <div className="newsletter-trust-item">
            <div className="newsletter-trust-icon">
              <FaGift />
            </div>

            <div>
              <strong>Exclusive Deals</strong>
              <span>Special offers & promotions</span>
            </div>
          </div>

          <div className="newsletter-trust-item">
            <div className="newsletter-trust-icon">
              <FaCheck />
            </div>

            <div>
              <strong>No Spam</strong>
              <span>Only valuable updates</span>
            </div>
          </div>

          <div className="newsletter-trust-item">
            <div className="newsletter-trust-icon">
              <FaGlobeAfrica />
            </div>

            <div>
              <strong>Africa & Worldwide</strong>
              <span>Connecting markets globally</span>
            </div>
          </div>

        </div>

        {/* Bottom Trust Message */}
        <div className="newsletter-bottom-trust">

          <div className="newsletter-bottom-rating">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>

          <span>
            Trusted by shoppers and sellers across Africa
          </span>

          <div className="newsletter-bottom-security">
            <FaShieldAlt />
            Secure Marketplace
          </div>

        </div>

        {/* Social Media */}
        <div className="newsletter-social">

          <div className="newsletter-social-heading">
            <span className="newsletter-social-line"></span>

            <span className="newsletter-social-title">
              Follow AfriMarket
            </span>

            <span className="newsletter-social-line"></span>
          </div>

          <div className="newsletter-social-links">

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
    </section>
  );
}