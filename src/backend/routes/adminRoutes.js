import express from "express";

import {
  getAdminStats,
  getAdminCustomers,
  getAdminSellers,
} from "../controllers/adminController.js";

const router = express.Router();

// =====================================================
// ADMIN ROUTE DIAGNOSTIC
// =====================================================

console.log("==============================================");
console.log("✅ AfriMarket adminRoutes.js LOADED");
console.log("📁 Admin route: GET /stats");
console.log("📁 Admin route: GET /users");
console.log("📁 Admin route: GET /sellers");
console.log("==============================================");

// =====================================================
// ADMIN STATISTICS
// =====================================================

router.get("/stats", getAdminStats);

// =====================================================
// ADMIN CUSTOMERS
// =====================================================

router.get("/users", getAdminCustomers);

// =====================================================
// ADMIN SELLERS
// =====================================================

router.get("/sellers", getAdminSellers);

// =====================================================
// ADMIN ROUTE TEST
// =====================================================

router.get("/test", (req, res) => {
  console.log("📥 GET /api/admin/test received");

  res.json({
    success: true,
    message: "Admin routes are working!",
    routes: [
      "/api/admin/stats",
      "/api/admin/users",
      "/api/admin/sellers",
      "/api/admin/test",
    ],
  });
});

export default router;