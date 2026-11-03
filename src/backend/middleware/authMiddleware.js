import jwt from "jsonwebtoken";
import User from "../models/User.js";

// =====================================================
// JWT SECRET
// =====================================================

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured in .env");
  }

  return secret;
};

// =====================================================
// VERIFY LOGIN TOKEN
// =====================================================

export const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in.",
      });
    }

    const token = authorization.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in.",
      });
    }

    // Verify token using the exact JWT_SECRET from .env
    const decoded = jwt.verify(token, getJwtSecret());

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // Find current user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "This account has been disabled.",
      });
    }

    // Attach authenticated user to request
    req.user = user;

    next();
  } catch (error) {
    console.error(
      "Auth middleware error:",
      error.name,
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Authentication token has expired. Please log in again."
          : "Invalid authentication token.",
    });
  }
};

// =====================================================
// ADMIN ONLY
// =====================================================

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }

  next();
};

// =====================================================
// SELLER ONLY
// =====================================================

export const sellerOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  if (req.user.role !== "seller") {
    return res.status(403).json({
      success: false,
      message: "Seller access required.",
    });
  }

  next();
};

// =====================================================
// ADMIN OR SELLER
// =====================================================

export const adminOrSeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  if (!["admin", "seller"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Admin or seller access required.",
    });
  }

  next();
};
