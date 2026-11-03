import SupportTicket from "../models/SupportTicket.js";

// =====================================================
// CREATE SUPPORT TICKET
// POST /api/support/tickets
// =====================================================

export const createTicket = async (req, res) => {
  try {
    const { subject, category, message, priority } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required.",
      });
    }

    const ticket = await SupportTicket.create({
      customer: req.user._id,
      subject: subject.trim(),
      category: category || "Other",
      message: message.trim(),
      priority: priority || "Medium",
    });

    const populatedTicket = await SupportTicket.findById(ticket._id)
      .populate("customer", "name email")
      .populate("replies.sender", "name email role");

    res.status(201).json({
      success: true,
      message: "Support ticket created successfully.",
      ticket: populatedTicket,
    });
  } catch (error) {
    console.error("Create support ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create support ticket.",
      error: error.message,
    });
  }
};

// =====================================================
// GET MY SUPPORT TICKETS
// GET /api/support/tickets
// =====================================================

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({
      customer: req.user._id,
    })
      .populate("customer", "name email")
      .populate("replies.sender", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("Get customer tickets error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load support tickets.",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE TICKET
// GET /api/support/tickets/:id
// =====================================================

export const getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id)
      .populate("customer", "name email")
      .populate("replies.sender", "name email role");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found.",
      });
    }

    // Customers may only access their own tickets.
    if (
      req.user.role === "customer" &&
      ticket.customer._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this ticket.",
      });
    }

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("Get support ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load support ticket.",
      error: error.message,
    });
  }
};

// =====================================================
// REPLY TO TICKET
// POST /api/support/tickets/:id/replies
// =====================================================

export const replyToTicket = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply message is required.",
      });
    }

    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found.",
      });
    }

    if (
      req.user.role === "customer" &&
      ticket.customer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this ticket.",
      });
    }

    if (ticket.status === "Closed") {
      return res.status(400).json({
        success: false,
        message: "This ticket is closed and cannot receive new replies.",
      });
    }

    ticket.replies.push({
      sender: req.user._id,
      senderRole: req.user.role,
      message: message.trim(),
    });

    if (req.user.role === "customer") {
      ticket.status = "Open";
    }

    if (req.user.role === "admin") {
      ticket.status = "In Progress";
    }

    await ticket.save();

    const populatedTicket = await SupportTicket.findById(ticket._id)
      .populate("customer", "name email")
      .populate("replies.sender", "name email role");

    res.status(200).json({
      success: true,
      message: "Reply added successfully.",
      ticket: populatedTicket,
    });
  } catch (error) {
    console.error("Reply to support ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add reply.",
      error: error.message,
    });
  }
};

// =====================================================
// CLOSE SUPPORT TICKET
// POST /api/support/tickets/:id/close
// =====================================================

export const closeTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found.",
      });
    }

    if (
      req.user.role === "customer" &&
      ticket.customer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this ticket.",
      });
    }

    if (ticket.status === "Closed") {
      return res.status(400).json({
        success: false,
        message: "This ticket is already closed.",
      });
    }

    ticket.status = "Closed";
    ticket.closedAt = new Date();

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Support ticket closed successfully.",
      ticket,
    });
  } catch (error) {
    console.error("Close support ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to close support ticket.",
      error: error.message,
    });
  }
};

// =====================================================
// RATE SUPPORT TICKET
// POST /api/support/tickets/:id/rating
// =====================================================

export const rateTicket = async (req, res) => {
  try {
    const { rating, ratingComment } = req.body;

    const numericRating = Number(rating);

    if (
      !numericRating ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found.",
      });
    }

    if (ticket.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only rate your own support tickets.",
      });
    }

    if (!["Resolved", "Closed"].includes(ticket.status)) {
      return res.status(400).json({
        success: false,
        message: "You can only rate a resolved or closed ticket.",
      });
    }

    ticket.rating = numericRating;
    ticket.ratingComment = ratingComment
      ? ratingComment.trim()
      : "";

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Thank you for rating our support service.",
      ticket,
    });
  } catch (error) {
    console.error("Rate support ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to rate support ticket.",
      error: error.message,
    });
  }
};