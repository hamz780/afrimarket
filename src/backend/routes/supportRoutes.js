import express from "express";

import {
  createTicket,
  getMyTickets,
  getTicketById,
  replyToTicket,
  closeTicket,
  rateTicket,
} from "../controllers/supportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// ALL CUSTOMER SUPPORT ROUTES REQUIRE LOGIN
// =====================================================

router.use(protect);

// Create a new support ticket
router.post("/tickets", createTicket);

// Get logged-in customer's tickets
router.get("/tickets", getMyTickets);

// Get one ticket
router.get("/tickets/:id", getTicketById);

// Reply to a ticket
router.post("/tickets/:id/replies", replyToTicket);

// Close a ticket
router.post("/tickets/:id/close", closeTicket);

// Rate a resolved/closed ticket
router.post("/tickets/:id/rating", rateTicket);

export default router;