import express from "express";
import { register, login } from "../controllers/authController.js";

console.log("🔥 authRoutes.js is being loaded!");

const router = express.Router();

console.log("📝 Setting up routes...");

// Public routes
router.post("/register", (req, res, next) => {
  console.log("📥 POST /register received");
  next();
}, register);

router.post("/login", (req, res, next) => {
  console.log("📥 POST /login received");
  next();
}, login);

// Test route
router.get("/test", (req, res) => {
  console.log("📥 GET /test received!"); // ← ADD THIS
  res.json({
    success: true,
    message: "Auth routes are working!",
  });
});

console.log("✅ Auth routes configured!");

export default router;