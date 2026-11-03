
import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Diagnostic: confirm requests enter this router
router.use((req, res, next) => {
  console.log("🔥 ORDER ROUTER RECEIVED:", req.method, req.originalUrl);
  next();
});

// Authentication
router.use(protect);

// Order endpoints
router.post("/", createOrder);
router.get("/my-orders", getMyOrders);
router.get("/:orderId", getOrderById);
router.put("/:orderId/cancel", cancelOrder);

export default router;
