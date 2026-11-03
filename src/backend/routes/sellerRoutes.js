
import express from "express";

import {
  getSellerOverview,
  getSellerAnalytics,
  getSellerProducts,
  getSellerOrders,
  updateSellerOrderStatus,
  deleteSellerOrder,
  getSellerProfile,
} from "../controllers/sellerController.js";

import {
  protect,
  sellerOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(sellerOnly);

router.get("/overview", getSellerOverview);
router.get("/analytics", getSellerAnalytics);
router.get("/products", getSellerProducts);

router.get("/orders", getSellerOrders);
router.put("/orders/:orderId/status", updateSellerOrderStatus);
router.delete("/orders/:orderId", deleteSellerOrder);

router.get("/profile", getSellerProfile);

export default router;
