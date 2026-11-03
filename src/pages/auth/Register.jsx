import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaStore,
} from "react-icons/fa";

import "./Register.css";

const API_URL = "http://localhost:5000";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =====================================================
  // HANDLE REGISTRATION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      role,
    } = formData;

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      console.log("====================================");
      console.log("📝 REGISTRATION");
      console.log("Name:", `${firstName} ${lastName}`);
      console.log("Email:", email);
      console.log("Role:", role);
      console.log("====================================");

      // ---------------------------------------------------
      // SEND REGISTRATION TO BACKEND
      // ---------------------------------------------------

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${firstName.trim()} ${lastName.trim()}`,
            email: email.trim().toLowerCase(),
            password,
            phone: phone.trim(),
            role,
          }),
        }
      );

      // ---------------------------------------------------
      // READ RESPONSE
      // ---------------------------------------------------

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      console.log("📥 Registration response:", data);

      // ---------------------------------------------------
      // HANDLE BACKEND ERROR
      // ---------------------------------------------------

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      // ---------------------------------------------------
      // GET TOKEN
      // ---------------------------------------------------

      const token =
        data.token ||
        data.accessToken ||
        data.authToken;

      if (!token) {
        throw new Error(
          "Account was created, but no authentication token was returned."
        );
      }

      // ---------------------------------------------------
      // SAVE TOKEN
      // ---------------------------------------------------

      localStorage.setItem(
        "afrimarket-token",
        token
      );

      // Compatibility with existing services
      localStorage.setItem(
        "token",
        token
      );

      // ---------------------------------------------------
      // SAVE USER
      // ---------------------------------------------------

      const user = data.user || {
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim().toLowerCase(),
        role,
      };

      localStorage.setItem(
        "afrimarket-user",
        JSON.stringify(user)
      );

      // Compatibility flag
      localStorage.setItem(
        "afrimarket-authenticated",
        "true"
      );

      // Also support existing spelling used elsewhere
      localStorage.setItem(
        "afrimarket-authentication",
        "true"
      );

      console.log("====================================");
      console.log("✅ REGISTRATION SUCCESSFUL");
      console.log("User:", user);
      console.log("Role:", user.role);
      console.log("Token saved:", !!token);
      console.log("====================================");

      // ---------------------------------------------------
      // REDIRECT BASED ON ROLE
      // ---------------------------------------------------

      if (user.role === "seller") {
        console.log("🏪 Redirecting to Seller Dashboard");
        navigate("/seller/dashboard");
        return;
      }

      if (user.role === "admin") {
        console.log("👑 Redirecting to Admin Dashboard");
        navigate("/admin/dashboard");
        return;
      }

      console.log("👤 Redirecting to Customer Dashboard");
      navigate("/dashboard");

    } catch (error) {
      console.error("❌ Registration error:", error);

      setError(
        error.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
            Create your account and start shopping
            or selling with trusted African businesses.
          </p>

          <div className="register-benefits">

            <div>
              <span>✓</span>
              <p>Shop authentic products</p>
            </div>

            <div>
              <span>✓</span>
              <p>Become an AfriMarket seller</p>
            </div>

            <div>
              <span>✓</span>
              <p>Secure checkout</p>
            </div>

            <div>
              <span>✓</span>
              <p>Track your orders</p>
            </div>

          </div>

        </div>

        {/* =================================================
            REGISTER CARD
        ================================================= */}

        <div className="register-card">

          <div className="register-header">

            <h2>Create Account</h2>

            <p>
              Join AfriMarket today
            </p>

          </div>

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

          <form onSubmit={handleSubmit}>

            {/* =================================================
                ACCOUNT TYPE
            ================================================= */}

            <div className="form-group">

              <label>
                Account Type
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >

                {/* CUSTOMER */}

                <label
                  style={{
                    flex: 1,
                    cursor: "pointer",
                    border:
                      formData.role === "customer"
                        ? "2px solid #f59e0b"
                        : "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "14px",
                    textAlign: "center",
                    background:
                      formData.role === "customer"
                        ? "#fff8e7"
                        : "#fff",
                  }}
                >

                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={
                      formData.role === "customer"
                    }
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                      marginRight: "8px",
                    }}
                  />

                  👤 Customer

                </label>

                {/* SELLER */}

                <label
                  style={{
                    flex: 1,
                    cursor: "pointer",
                    border:
                      formData.role === "seller"
                        ? "2px solid #f59e0b"
                        : "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "14px",
                    textAlign: "center",
                    background:
                      formData.role === "seller"
                        ? "#fff8e7"
                        : "#fff",
                  }}
                >

                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={
                      formData.role === "seller"
                    }
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                      marginRight: "8px",
                    }}
                  />

                  <FaStore
                    style={{
                      marginRight: "6px",
                    }}
                  />

                  Seller

                </label>

              </div>

            </div>

            {/* =================================================
                FIRST + LAST NAME
            ================================================= */}

            <div className="register-row">

              <div className="form-group">

                <label>
                  First Name
                </label>

                <div className="input-wrapper">

                  <FaUser />

                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Last Name
                </label>

                <div className="input-wrapper">

                  <FaUser />

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">

                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                />

              </div>

            </div>

            {/* =================================================
                PHONE
            ================================================= */}

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <div className="input-wrapper">

                <FaPhone />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  disabled={loading}
                />

              </div>

            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <FaLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create password"
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

            </div>

            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <div className="input-wrapper">

                <FaLock />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
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

            </div>

            {/* =================================================
                TERMS
            ================================================= */}

            <label className="terms">

              <input
                type="checkbox"
                required
                disabled={loading}
              />

              <span>
                I agree to the AfriMarket terms and
                privacy policy.
              </span>

            </label>

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
                : formData.role === "seller"
                ? "Create Seller Account"
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