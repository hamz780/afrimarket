import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaCheckCircle,
  FaShoppingBag,
  FaGlobeAfrica,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

import "./Login.css";

const API_URL = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      // =====================================================
      // GET JWT TOKEN FROM BACKEND
      // =====================================================

      const token =
        data.token ||
        data.accessToken ||
        data.authToken;

      if (!token) {
        throw new Error(
          "Login succeeded, but the server did not return an authentication token."
        );
      }

      // =====================================================
      // SAVE AUTHENTICATION TOKEN
      // =====================================================

      localStorage.setItem(
        "afrimarket-token",
        token
      );

      localStorage.setItem(
        "token",
        token
      );

      // =====================================================
      // SAVE USER INFORMATION
      // =====================================================

      const user = data.user || data.seller || {
        email: formData.email.trim(),
        loggedIn: true,
      };

      localStorage.setItem(
        "afrimarket-user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "afrimarket-authentication",
        "true"
      );

      // =====================================================
      // DETERMINE USER ROLE
      // =====================================================

      const role =
        data.user?.role ||
        data.seller?.role ||
        data.role ||
        user.role;

      console.log("Logged-in user role:", role);

      // =====================================================
      // REDIRECT TO CORRECT DASHBOARD
      // =====================================================

      if (role === "seller") {
        navigate("/seller/dashboard");
        return;
      }

      if (role === "admin") {
        navigate("/admin/dashboard");
        return;
      }

      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message ||
        "Unable to log in. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* =====================================================
            LEFT PROMOTIONAL SIDE
        ===================================================== */}

        <div className="login-info">

          <div className="login-info-overlay"></div>

          <div className="login-info-content">

            <Link
              to="/"
              className="login-brand"
            >
              <div className="brand-icon">
                <FaShoppingBag />
              </div>

              <span>
                Afri<span>Market</span>
              </span>
            </Link>

            <div className="login-hero-content">

              <div className="africa-badge">
                <FaGlobeAfrica />
                AFRICA'S DIGITAL MARKETPLACE
              </div>

              <h1>
                Welcome to
                <br />
                <span>AfriMarket</span>
              </h1>

              <p>
                Discover authentic products from
                trusted African sellers and shop
                confidently from anywhere in the world.
              </p>

              <div className="login-benefits">

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <strong>Authentic Products</strong>
                    <span>
                      Shop from verified sellers
                    </span>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaShieldAlt />
                  </div>

                  <div>
                    <strong>Secure Shopping</strong>
                    <span>
                      Your account and orders are protected
                    </span>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaTruck />
                  </div>

                  <div>
                    <strong>Reliable Delivery</strong>
                    <span>
                      Get your products delivered safely
                    </span>
                  </div>
                </div>

              </div>

            </div>

            <div className="login-info-footer">
              <span>🌍</span>
              Connecting Africa to the World
            </div>

          </div>

        </div>


        {/* =====================================================
            RIGHT LOGIN SIDE
        ===================================================== */}

        <div className="login-form-container">

          <div className="login-form">

            <div className="mobile-logo">

              <div className="brand-icon">
                <FaShoppingBag />
              </div>

              <span>
                Afri<span>Market</span>
              </span>

            </div>

            <div className="login-heading">

              <p className="login-welcome">
                Welcome back
              </p>

              <h2>
                Sign in to your account
              </h2>

              <p className="login-subtitle">
                Continue shopping from trusted African sellers.
              </p>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div
                className="login-error"
                role="alert"
              >
                {error}
              </div>
            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="login-input">

                  <FaEnvelope className="input-icon" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    disabled={loading}
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="login-input">

                  <FaLock className="input-icon" />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>


              {/* OPTIONS */}

              <div className="login-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                    disabled={loading}
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>


              {/* SIGN IN */}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                <FaSignInAlt />

                <span>
                  {loading
                    ? "Signing In..."
                    : "Sign In"}
                </span>

              </button>

            </form>


            {/* REGISTER */}

            <div className="register-link">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
              </Link>

            </div>


            <div className="login-security">

              <FaShieldAlt />

              <span>
                Secure login powered by AfriMarket
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}