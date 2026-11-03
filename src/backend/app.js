
import express from "express";
import cors from "cors";

import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials: true,
  })
);

// =====================================================
// BODY PARSING
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AfriMarket API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// =====================================================
// DIRECT TEST ROUTES
// =====================================================

app.get("/test-direct", (req, res) => {
  console.log("/test-direct was called!");

  res.json({
    success: true,
    message: "Direct test route works!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/test-direct", (req, res) => {
  console.log("/api/test-direct was called!");

  res.json({
    success: true,
    message: "Direct test route in /api works!",
    timestamp: new Date().toISOString(),
  });
});

// =====================================================
// AUTH API
// =====================================================

console.log("Mounting auth routes at /api/auth");
app.use("/api/auth", authRoutes);

// =====================================================
// ADMIN API
// =====================================================

console.log("Mounting admin routes at /api/admin");
app.use("/api/admin", adminRoutes);

// =====================================================
// SELLER API
// =====================================================

console.log("Mounting seller routes at /api/seller");
app.use("/api/seller", sellerRoutes);

// =====================================================
// CUSTOMER ORDERS API
// =====================================================

console.log("Mounting order routes at /api/orders");
app.use("/api/orders", orderRoutes);

// =====================================================
// TEMPORARY ORDERS DIAGNOSTIC
// =====================================================

app.get("/api/orders-diagnostic", (req, res) => {
  console.log("DIRECT ORDERS DIAGNOSTIC ROUTE REACHED");

  res.status(200).json({
    success: true,
    message: "Direct orders diagnostic route works",
    timestamp: new Date().toISOString(),
  });
});

// =====================================================
// CUSTOMER SUPPORT API
// =====================================================

console.log("Mounting support routes at /api/support");
app.use("/api/support", supportRoutes);

// =====================================================
// AFRIMARKET AI API
// =====================================================

console.log("Mounting AfriMarket AI routes at /api/ai");
app.use("/api/ai", aiRoutes);

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("Backend Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// =====================================================
// EXPORT APP
// =====================================================

export default app;
