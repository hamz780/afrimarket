import React, { useEffect, useMemo, useState } from "react";

import {
  FaHeadset,
  FaSearch,
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
  FaUserCircle,
  FaUndo,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
  FaTicketAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaQuestionCircle,
  FaTimes,
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaStar,
} from "react-icons/fa";

import "./CustomerService.css";

const API_URL = "http://localhost:5000";

const CustomerService = () => {
  // =====================================================
  // FAQ STATE
  // =====================================================

  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  // =====================================================
  // TICKET STATE
  // =====================================================

  const [showTicketForm, setShowTicketForm] = useState(false);

  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "Other",
    priority: "Medium",
    message: "",
  });

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [replyMessage, setReplyMessage] = useState("");

  const [loadingTickets, setLoadingTickets] = useState(false);
  const [submittingTicket, setSubmittingTicket] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [closingTicket, setClosingTicket] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // AUTH
  // =====================================================

  const token =
    localStorage.getItem("afrimarket-token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken");

  // =====================================================
  // SUPPORT CATEGORIES
  // =====================================================

  const supportCategories = [
    {
      icon: <FaShoppingBag />,
      title: "Orders & Purchases",
      description:
        "Track orders, manage purchases and get order help.",
      category: "Order",
    },
    {
      icon: <FaTruck />,
      title: "Delivery & Shipping",
      description:
        "Get help with delivery, tracking and shipping.",
      category: "Delivery",
    },
    {
      icon: <FaCreditCard />,
      title: "Payments",
      description:
        "Payment issues, refunds and transaction support.",
      category: "Payment",
    },
    {
      icon: <FaUndo />,
      title: "Returns & Refunds",
      description:
        "Learn about returns, refunds and cancellations.",
      category: "Refund",
    },
    {
      icon: <FaUserCircle />,
      title: "Account & Profile",
      description:
        "Manage your account, password and profile.",
      category: "Account",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safety & Security",
      description:
        "Report suspicious activity and protect your account.",
      category: "Technical",
    },
  ];

  // =====================================================
  // FAQS
  // =====================================================

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order from your customer dashboard. Open My Orders, select the order you want to track, and you will see the latest delivery status.",
    },
    {
      question: "How do I cancel an order?",
      answer:
        "Open My Orders and select the order. If the order has not yet been shipped, you may be able to cancel it. Once an order has shipped, cancellation may no longer be available.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery time depends on the seller, destination and shipping method. Your estimated delivery date will be displayed with your order information.",
    },
    {
      question: "How do I request a refund?",
      answer:
        "Go to My Orders, select the relevant order and choose the return or refund option when available. Follow the instructions to submit your request.",
    },
    {
      question:
        "What payment methods does AfriMarket support?",
      answer:
        "AfriMarket is designed to support multiple payment options depending on your country, including cards, mobile money and other available payment methods.",
    },
    {
      question: "How do I contact a seller?",
      answer:
        "Open the relevant product or order and use the available seller communication option. Never share your password, PIN or other sensitive account information with a seller.",
    },
  ];

  // =====================================================
  // FILTER FAQS
  // =====================================================

  const filteredFaqs = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      return faqs;
    }

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm)
    );
  }, [search]);

  // =====================================================
  // CLEAR MESSAGES
  // =====================================================

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  // =====================================================
  // GET TICKETS
  // =====================================================

  const fetchTickets = async () => {
    if (!token) {
      return;
    }

    try {
      setLoadingTickets(true);

      const response = await fetch(
        `${API_URL}/api/support/tickets`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load your support tickets."
        );
      }

      setTickets(data.tickets || []);
    } catch (error) {
      console.error("Fetch support tickets error:", error);

      setErrorMessage(
        error.message || "Unable to load support tickets."
      );
    } finally {
      setLoadingTickets(false);
    }
  };

  // =====================================================
  // LOAD TICKETS ON PAGE LOAD
  // =====================================================

  useEffect(() => {
    fetchTickets();
  }, [token]);

  // =====================================================
  // OPEN TICKET FORM
  // =====================================================

  const openTicketForm = (category = "Other") => {
    clearMessages();

    setTicketForm({
      subject: "",
      category,
      priority: "Medium",
      message: "",
    });

    setShowTicketForm(true);

    setTimeout(() => {
      document
        .getElementById("support-ticket-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  };

  // =====================================================
  // CLOSE TICKET FORM
  // =====================================================

  const closeTicketForm = () => {
    setShowTicketForm(false);

    setTicketForm({
      subject: "",
      category: "Other",
      priority: "Medium",
      message: "",
    });
  };

  // =====================================================
  // FORM INPUT
  // =====================================================

  const handleTicketChange = (event) => {
    const { name, value } = event.target;

    setTicketForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE TICKET
  // =====================================================

  const handleCreateTicket = async (event) => {
    event.preventDefault();

    clearMessages();

    if (!token) {
      setErrorMessage(
        "Please log in to your AfriMarket account before creating a support ticket."
      );
      return;
    }

    if (!ticketForm.subject.trim()) {
      setErrorMessage("Please enter a support ticket subject.");
      return;
    }

    if (!ticketForm.message.trim()) {
      setErrorMessage("Please describe your issue.");
      return;
    }

    try {
      setSubmittingTicket(true);

      const response = await fetch(
        `${API_URL}/api/support/tickets`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: ticketForm.subject.trim(),
            category: ticketForm.category,
            priority: ticketForm.priority,
            message: ticketForm.message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create support ticket."
        );
      }

      setSuccessMessage(
        "Your support ticket has been created successfully."
      );

      setShowTicketForm(false);

      setTicketForm({
        subject: "",
        category: "Other",
        priority: "Medium",
        message: "",
      });

      await fetchTickets();

      if (data.ticket) {
        setSelectedTicket(data.ticket);
      }
    } catch (error) {
      console.error("Create support ticket error:", error);

      setErrorMessage(
        error.message || "Failed to create support ticket."
      );
    } finally {
      setSubmittingTicket(false);
    }
  };

  // =====================================================
  // VIEW TICKET
  // =====================================================

  const handleViewTicket = async (ticketId) => {
    clearMessages();

    if (!token) {
      setErrorMessage("Please log in to view your support tickets.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/support/tickets/${ticketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load support ticket."
        );
      }

      setSelectedTicket(data.ticket);
      setReplyMessage("");

      setTimeout(() => {
        document
          .getElementById("ticket-details")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (error) {
      console.error("View ticket error:", error);

      setErrorMessage(
        error.message || "Failed to load support ticket."
      );
    }
  };

  // =====================================================
  // REPLY TO TICKET
  // =====================================================

  const handleReply = async (event) => {
    event.preventDefault();

    clearMessages();

    if (!selectedTicket) {
      return;
    }

    if (!replyMessage.trim()) {
      setErrorMessage("Please enter a reply message.");
      return;
    }

    try {
      setSubmittingReply(true);

      const response = await fetch(
        `${API_URL}/api/support/tickets/${selectedTicket._id}/replies`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: replyMessage.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send reply."
        );
      }

      setSelectedTicket(data.ticket);
      setReplyMessage("");

      setSuccessMessage("Your reply has been sent successfully.");

      await fetchTickets();
    } catch (error) {
      console.error("Reply error:", error);

      setErrorMessage(
        error.message || "Failed to send reply."
      );
    } finally {
      setSubmittingReply(false);
    }
  };

  // =====================================================
  // CLOSE TICKET
  // =====================================================

  const handleCloseTicket = async () => {
    if (!selectedTicket) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to close this support ticket?"
    );

    if (!confirmed) {
      return;
    }

    clearMessages();

    try {
      setClosingTicket(true);

      const response = await fetch(
        `${API_URL}/api/support/tickets/${selectedTicket._id}/close`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to close support ticket."
        );
      }

      setSelectedTicket(data.ticket);

      setSuccessMessage("Support ticket closed successfully.");

      await fetchTickets();
    } catch (error) {
      console.error("Close ticket error:", error);

      setErrorMessage(
        error.message || "Failed to close support ticket."
      );
    } finally {
      setClosingTicket(false);
    }
  };

  // =====================================================
  // FAQ TOGGLE
  // =====================================================

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Open":
        return "ticket-status-open";

      case "In Progress":
        return "ticket-status-progress";

      case "Waiting for Customer":
        return "ticket-status-waiting";

      case "Resolved":
        return "ticket-status-resolved";

      case "Closed":
        return "ticket-status-closed";

      default:
        return "ticket-status-open";
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="customer-service-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="customer-service-hero">
        <div className="customer-service-hero-content">

          <div className="customer-service-icon">
            <FaHeadset />
          </div>

          <span className="customer-service-label">
            AfriMarket Customer Care
          </span>

          <h1>How Can We Help You?</h1>

          <p>
            Find answers, get help with your orders, or contact
            the AfriMarket support team.
          </p>

          <div className="customer-service-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search for help..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("faq-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Search
            </button>
          </div>

        </div>
      </section>

      {/* =================================================
          MESSAGES
      ================================================= */}

      {(successMessage || errorMessage) && (
        <section className="customer-service-message-wrapper">
          <div className="customer-service-container">

            {successMessage && (
              <div className="customer-service-success">
                <FaCheckCircle />
                <span>{successMessage}</span>

                <button
                  type="button"
                  onClick={() => setSuccessMessage("")}
                  aria-label="Close message"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="customer-service-error">
                <FaExclamationCircle />
                <span>{errorMessage}</span>

                <button
                  type="button"
                  onClick={() => setErrorMessage("")}
                  aria-label="Close error"
                >
                  <FaTimes />
                </button>
              </div>
            )}

          </div>
        </section>
      )}

      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <section className="customer-service-section">
        <div className="customer-service-container">

          <div className="customer-service-heading">
            <span>GET SUPPORT</span>

            <h2>What Do You Need Help With?</h2>

            <p>
              Choose a category below to quickly find the
              support you need.
            </p>
          </div>

          <div className="support-category-grid">

            {supportCategories.map((category, index) => (
              <div
                className="support-category-card"
                key={index}
              >
                <div className="support-category-icon">
                  {category.icon}
                </div>

                <h3>{category.title}</h3>

                <p>{category.description}</p>

                <button
                  type="button"
                  onClick={() =>
                    openTicketForm(category.category)
                  }
                >
                  Get Help
                </button>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =================================================
          TICKET AREA
      ================================================= */}

      <section className="support-ticket-section">
        <div className="customer-service-container">

          <div className="support-ticket-card">

            <div className="support-ticket-icon">
              <FaTicketAlt />
            </div>

            <div className="support-ticket-content">

              <span>NEED PERSONALIZED HELP?</span>

              <h2>Submit a Support Ticket</h2>

              <p>
                Can't find what you're looking for? Send our
                support team a message and we'll help you
                resolve your issue.
              </p>

              <button
                type="button"
                className="support-ticket-button"
                onClick={() => openTicketForm("Other")}
              >
                <FaTicketAlt />
                Create Support Ticket
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* =================================================
          CREATE TICKET FORM
      ================================================= */}

      {showTicketForm && (
        <section
          className="support-ticket-form-section"
          id="support-ticket-form"
        >
          <div className="customer-service-container">

            <div className="support-ticket-form-card">

              <div className="support-ticket-form-header">

                <div>
                  <span>CONTACT SUPPORT</span>

                  <h2>Create a Support Ticket</h2>

                  <p>
                    Tell us what happened and our support
                    team will help you.
                  </p>
                </div>

                <button
                  type="button"
                  className="ticket-close-button"
                  onClick={closeTicketForm}
                  aria-label="Close ticket form"
                >
                  <FaTimes />
                </button>

              </div>

              {!token && (
                <div className="customer-service-login-warning">
                  <FaExclamationCircle />

                  <span>
                    You must be logged in to create a support
                    ticket.
                  </span>
                </div>
              )}

              <form onSubmit={handleCreateTicket}>

                <div className="ticket-form-grid">

                  <div className="ticket-form-group ticket-form-full">
                    <label htmlFor="ticket-subject">
                      Subject
                    </label>

                    <input
                      id="ticket-subject"
                      name="subject"
                      type="text"
                      placeholder="What do you need help with?"
                      value={ticketForm.subject}
                      onChange={handleTicketChange}
                      maxLength={200}
                      disabled={submittingTicket}
                    />
                  </div>

                  <div className="ticket-form-group">
                    <label htmlFor="ticket-category">
                      Category
                    </label>

                    <select
                      id="ticket-category"
                      name="category"
                      value={ticketForm.category}
                      onChange={handleTicketChange}
                      disabled={submittingTicket}
                    >
                      <option value="Order">
                        Orders
                      </option>

                      <option value="Payment">
                        Payments
                      </option>

                      <option value="Delivery">
                        Delivery
                      </option>

                      <option value="Account">
                        Account
                      </option>

                      <option value="Product">
                        Product
                      </option>

                      <option value="Refund">
                        Refunds
                      </option>

                      <option value="Seller">
                        Seller
                      </option>

                      <option value="Technical">
                        Technical
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="ticket-form-group">
                    <label htmlFor="ticket-priority">
                      Priority
                    </label>

                    <select
                      id="ticket-priority"
                      name="priority"
                      value={ticketForm.priority}
                      onChange={handleTicketChange}
                      disabled={submittingTicket}
                    >
                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>

                      <option value="Urgent">
                        Urgent
                      </option>
                    </select>
                  </div>

                  <div className="ticket-form-group ticket-form-full">
                    <label htmlFor="ticket-message">
                      Describe Your Issue
                    </label>

                    <textarea
                      id="ticket-message"
                      name="message"
                      placeholder="Please describe your issue in as much detail as possible..."
                      value={ticketForm.message}
                      onChange={handleTicketChange}
                      rows="7"
                      maxLength={5000}
                      disabled={submittingTicket}
                    />
                  </div>

                </div>

                <div className="ticket-form-actions">

                  <button
                    type="button"
                    className="ticket-cancel-button"
                    onClick={closeTicketForm}
                    disabled={submittingTicket}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="ticket-submit-button"
                    disabled={submittingTicket || !token}
                  >
                    {submittingTicket ? (
                      "Creating Ticket..."
                    ) : (
                      <>
                        <FaPaperPlane />
                        Submit Ticket
                      </>
                    )}
                  </button>

                </div>

              </form>

            </div>

          </div>
        </section>
      )}

      {/* =================================================
          MY TICKETS
      ================================================= */}

      <section className="my-tickets-section">
        <div className="customer-service-container">

          <div className="customer-service-heading">
            <span>MY SUPPORT</span>

            <h2>My Support Tickets</h2>

            <p>
              View your support requests and continue your
              conversation with AfriMarket support.
            </p>
          </div>

          {!token ? (
            <div className="tickets-login-card">
              <FaUserCircle />

              <h3>Log in to view your tickets</h3>

              <p>
                Your support tickets are securely linked to
                your AfriMarket account.
              </p>
            </div>
          ) : loadingTickets ? (
            <div className="tickets-loading">
              <FaClock />
              <p>Loading your support tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="tickets-empty-card">
              <FaTicketAlt />

              <h3>No support tickets yet</h3>

              <p>
                If you need assistance, create your first
                support ticket and our team will help you.
              </p>

              <button
                type="button"
                onClick={() => openTicketForm("Other")}
              >
                Create Support Ticket
              </button>
            </div>
          ) : (
            <div className="tickets-list">

              {tickets.map((ticket) => (
                <div
                  className="ticket-list-card"
                  key={ticket._id}
                >

                  <div className="ticket-list-main">

                    <div className="ticket-list-icon">
                      <FaTicketAlt />
                    </div>

                    <div className="ticket-list-info">

                      <h3>{ticket.subject}</h3>

                      <p>
                        {ticket.category} •{" "}
                        {formatDate(ticket.createdAt)}
                      </p>

                    </div>

                  </div>

                  <div className="ticket-list-meta">

                    <span
                      className={`ticket-status ${getStatusClass(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleViewTicket(ticket._id)
                      }
                    >
                      View Ticket
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* =================================================
          TICKET DETAILS
      ================================================= */}

      {selectedTicket && (
        <section
          className="ticket-details-section"
          id="ticket-details"
        >
          <div className="customer-service-container">

            <div className="ticket-details-card">

              <div className="ticket-details-header">

                <div>

                  <span>SUPPORT TICKET</span>

                  <h2>{selectedTicket.subject}</h2>

                  <p>
                    Ticket ID: {selectedTicket._id}
                  </p>

                </div>

                <button
                  type="button"
                  className="ticket-close-button"
                  onClick={() => setSelectedTicket(null)}
                >
                  <FaTimes />
                </button>

              </div>

              <div className="ticket-details-meta">

                <div>
                  <strong>Status</strong>

                  <span
                    className={`ticket-status ${getStatusClass(
                      selectedTicket.status
                    )}`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>

                <div>
                  <strong>Category</strong>
                  <span>{selectedTicket.category}</span>
                </div>

                <div>
                  <strong>Priority</strong>
                  <span>{selectedTicket.priority}</span>
                </div>

                <div>
                  <strong>Created</strong>
                  <span>
                    {formatDate(selectedTicket.createdAt)}
                  </span>
                </div>

              </div>

              {/* ORIGINAL MESSAGE */}

              <div className="ticket-original-message">

                <div className="ticket-message-header">
                  <div className="ticket-message-avatar">
                    <FaUserCircle />
                  </div>

                  <div>
                    <strong>
                      {selectedTicket.customer?.name ||
                        "You"}
                    </strong>

                    <span>
                      {formatDate(selectedTicket.createdAt)}
                    </span>
                  </div>
                </div>

                <p>{selectedTicket.message}</p>

              </div>

              {/* REPLIES */}

              {selectedTicket.replies?.length > 0 && (
                <div className="ticket-replies">

                  <h3>Conversation</h3>

                  {selectedTicket.replies.map(
                    (reply, index) => (
                      <div
                        className={`ticket-reply ${
                          reply.senderRole === "customer"
                            ? "ticket-reply-customer"
                            : "ticket-reply-support"
                        }`}
                        key={
                          reply._id || `${reply.createdAt}-${index}`
                        }
                      >

                        <div className="ticket-message-header">

                          <div className="ticket-message-avatar">
                            {reply.senderRole ===
                            "customer" ? (
                              <FaUserCircle />
                            ) : (
                              <FaHeadset />
                            )}
                          </div>

                          <div>

                            <strong>
                              {reply.sender?.name ||
                                (reply.senderRole ===
                                "customer"
                                  ? "You"
                                  : "AfriMarket Support")}
                            </strong>

                            <span>
                              {formatDate(reply.createdAt)}
                            </span>

                          </div>

                        </div>

                        <p>{reply.message}</p>

                      </div>
                    )
                  )}

                </div>
              )}

              {/* REPLY FORM */}

              {selectedTicket.status !== "Closed" && (
                <form
                  className="ticket-reply-form"
                  onSubmit={handleReply}
                >
                  <label htmlFor="ticket-reply">
                    Send a Reply
                  </label>

                  <textarea
                    id="ticket-reply"
                    value={replyMessage}
                    onChange={(event) =>
                      setReplyMessage(event.target.value)
                    }
                    placeholder="Write your reply..."
                    rows="5"
                    maxLength={5000}
                    disabled={submittingReply}
                  />

                  <div className="ticket-reply-actions">

                    <button
                      type="submit"
                      className="ticket-submit-button"
                      disabled={submittingReply}
                    >
                      {submittingReply ? (
                        "Sending..."
                      ) : (
                        <>
                          <FaPaperPlane />
                          Send Reply
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="ticket-close-action"
                      onClick={handleCloseTicket}
                      disabled={closingTicket}
                    >
                      {closingTicket
                        ? "Closing..."
                        : "Close Ticket"}
                    </button>

                  </div>

                </form>
              )}

              {selectedTicket.status === "Closed" && (
                <div className="ticket-closed-message">
                  <FaCheckCircle />

                  <div>
                    <strong>
                      This ticket is closed.
                    </strong>

                    <p>
                      Thank you for contacting AfriMarket
                      Customer Support.
                    </p>
                  </div>
                </div>
              )}

              {/* RATING */}

              {["Resolved", "Closed"].includes(
                selectedTicket.status
              ) &&
                !selectedTicket.rating && (
                  <div className="ticket-rating-section">

                    <div className="ticket-rating-icon">
                      <FaStar />
                    </div>

                    <div>
                      <h3>
                        How was your support experience?
                      </h3>

                      <p>
                        Rating functionality will be
                        available here.
                      </p>
                    </div>

                  </div>
                )}

            </div>

          </div>
        </section>
      )}

      {/* =================================================
          FAQ
      ================================================= */}

      <section
        className="customer-service-section faq-section"
        id="faq-section"
      >
        <div className="customer-service-container">

          <div className="customer-service-heading">

            <span>FAQ</span>

            <h2>Frequently Asked Questions</h2>

            <p>
              Find quick answers to common AfriMarket
              questions.
            </p>

          </div>

          <div className="faq-list">

            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  className="faq-item"
                  key={index}
                >

                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>
                      <FaQuestionCircle />
                      {faq.question}
                    </span>

                    {openFaq === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>

                  {openFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}

                </div>
              ))
            ) : (
              <div className="faq-no-results">

                <FaSearch />

                <h3>No results found</h3>

                <p>
                  We couldn't find an answer matching your
                  search. Try a different search term or
                  contact support.
                </p>

                <button
                  type="button"
                  onClick={() => openTicketForm("Other")}
                >
                  Contact Support
                </button>

              </div>
            )}

          </div>

        </div>
      </section>

      {/* =================================================
          CONTACT SUPPORT
      ================================================= */}

      <section className="contact-support-section">
        <div className="customer-service-container">

          <div className="contact-support-heading">

            <span>CONTACT US</span>

            <h2>We're Here to Help</h2>

            <p>
              Our customer support team is ready to assist
              you.
            </p>

          </div>

          <div className="contact-support-grid">

            <div className="contact-support-card">

              <div className="contact-support-icon">
                <FaEnvelope />
              </div>

              <h3>Email Support</h3>

              <p>
                Send us an email and our team will get back
                to you.
              </p>

              <a href="mailto:support@afrimarket.com">
                support@afrimarket.com
              </a>

            </div>

            <div className="contact-support-card">

              <div className="contact-support-icon">
                <FaPhoneAlt />
              </div>

              <h3>Phone Support</h3>

              <p>
                Speak directly with an AfriMarket support
                representative.
              </p>

              <a href="tel:+256700000000">
                +256 700 000 000
              </a>

            </div>

            <div className="contact-support-card">

              <div className="contact-support-icon">
                <FaWhatsapp />
              </div>

              <h3>WhatsApp Support</h3>

              <p>
                Get quick assistance through WhatsApp.
              </p>

              <a
                href="https://wa.me/256700000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default CustomerService;