import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserTie,
  FaUserPlus,
} from "react-icons/fa";

import "./Register.css";

const API_URL = "http://localhost:5000";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // SEND REGISTRATION TO BACKEND
      // =================================================

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Registration response:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Registration failed."
        );
      }

      // =================================================
      // SAVE TOKEN IF BACKEND RETURNS ONE
      // =================================================

      const token =
        data.token ||
        data.accessToken ||
        data.authToken;

      if (token) {
        localStorage.setItem(
          "afrimarket-token",
          token
        );

        localStorage.setItem(
          "token",
          token
        );
      }

      // =================================================
      // SAVE USER
      // =================================================

      const user =
        data.user ||
        data.seller || {
          name,
          email,
          role: formData.role,
        };

      localStorage.setItem(
        "afrimarket-user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "afrimarket-authentication",
        "true"
      );

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        "Account created successfully!"
      );

      // =================================================
      // REDIRECT
      // =================================================

      setTimeout(() => {
        if (formData.role === "seller") {
          navigate("/seller/dashboard");
          return;
        }

        navigate("/dashboard");
      }, 700);
    } catch (err) {
      console.error(
        "Registration error:",
        err
      );

      setError(
        err.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="register-page">

      <div className="register-container">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="register-info">

          <div className="register-logo">
            🛍️
          </div>

          <h1>
            Join <span>AfriMarket</span>
          </h1>

          <p>
            Create your AfriMarket account and
            connect with customers and trusted
            African sellers.
          </p>

          <div className="register-benefits">

            <div>✓ Shop authentic products</div>

            <div>✓ Become an AfriMarket seller</div>

            <div>✓ Reach customers worldwide</div>

            <div>✓ Secure marketplace</div>

          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="register-form-container">

          <h2>
            Create Account
          </h2>

          <p className="register-subtitle">
            Join AfriMarket today
          </p>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="register-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <div
              className="register-success"
              role="status"
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* =================================================
                NAME
            ================================================= */}

            <label htmlFor="name">
              Full Name
            </label>

            <div className="register-input">

              <FaUser />

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                disabled={loading}
              />

            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <label htmlFor="email">
              Email Address
            </label>

            <div className="register-input">

              <FaEnvelope />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={loading}
              />

            </div>

            {/* =================================================
                ACCOUNT TYPE
            ================================================= */}

            <label htmlFor="role">
              Account Type
            </label>

            <div className="register-input">

              <FaUserTie />

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="customer">
                  Customer
                </option>

                <option value="seller">
                  Seller
                </option>
              </select>

            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <label htmlFor="password">
              Password
            </label>

            <div className="register-input">

              <FaLock />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
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

            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="register-input">

              <FaLock />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm your password"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                disabled={loading}
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {/* =================================================
                REGISTER BUTTON
            ================================================= */}

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >

              <FaUserPlus />

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>

          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="login-link">

            Already have an account?

            <Link to="/login">
              Sign In
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}