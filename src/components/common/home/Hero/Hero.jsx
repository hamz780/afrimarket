import { useEffect, useState } from "react";
import "./HeroBanner.css";

const slides = [
  {
    eyebrow: "AFRIMARKET MARKETPLACE",
    title: "Africa's Marketplace,",
    highlight: "Connected to the World.",
    subtitle:
      "Discover trusted products, exceptional African brands, and essential services — all in one premium marketplace.",
    button: "Explore Marketplace",
    category: "Electronics",
  },
  {
    eyebrow: "AFRICAN FASHION",
    title: "Discover Africa's",
    highlight: "Distinctive Style.",
    subtitle:
      "Shop authentic fashion, handmade collections, and contemporary African brands from trusted sellers.",
    button: "Explore Fashion",
    category: "Fashion",
  },
  {
    eyebrow: "FRESH FROM AFRICA",
    title: "From African Farms",
    highlight: "To Your Table.",
    subtitle:
      "Discover quality agricultural products and fresh produce from trusted farmers and suppliers.",
    button: "Explore Groceries",
    category: "Agriculture",
  },
  {
    eyebrow: "SMART COMMERCE",
    title: "Everything You Need,",
    highlight: "One Marketplace.",
    subtitle:
      "From products to professional services, AfriMarket brings Africa's digital commerce ecosystem together.",
    button: "Start Shopping",
    category: "Marketplace",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // ==============================
  // AI CHAT STATE
  // ==============================

  const [showAI, setShowAI] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hello! I'm AfriMarket AI. 👋 How can I help you discover products, services, or opportunities on AfriMarket?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // HERO SLIDER
  // ==============================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  // ==============================
  // SEND AI MESSAGE
  // ==============================

  const sendMessage = async () => {
    const message = input.trim();

    if (!message || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "AfriMarket AI is unavailable."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);
    } catch (error) {
      console.error("AfriMarket AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "I'm sorry, I couldn't connect to AfriMarket AI right now. Please make sure the AfriMarket backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // ENTER KEY
  // ==============================

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="hero-banner">

      {/* Decorative background elements */}

      <div className="hero-glow hero-glow-one"></div>

      <div className="hero-glow hero-glow-two"></div>

      <div className="hero-pattern"></div>

      {/* ==========================================
          HERO CONTENT
      ========================================== */}

      <div className="hero-content">

        {/* LEFT SIDE */}

        <div className="hero-copy">

          <div className="hero-eyebrow">
            <span className="eyebrow-line"></span>

            {slide.eyebrow}
          </div>

          <h1>
            {slide.title}

            <span>
              {slide.highlight}
            </span>
          </h1>

          <p className="hero-description">
            {slide.subtitle}
          </p>

          <div className="hero-actions">

            <button className="hero-primary-btn">
              {slide.button}

              <span>→</span>
            </button>

            {/* ==========================
                AI BUTTON
            ========================== */}

            <button
              className="ai-banner-btn"
              onClick={() => setShowAI(true)}
            >
              <span className="ai-icon">
                ✦
              </span>

              Ask AfriMarket AI
            </button>

          </div>

          {/* TRUST */}

          <div className="hero-trust">

            <div className="trust-item">

              <span className="trust-icon">
                ✓
              </span>

              <div>
                <strong>
                  Verified Sellers
                </strong>

                <small>
                  Trusted businesses
                </small>
              </div>

            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">

              <span className="trust-icon">
                ◆
              </span>

              <div>
                <strong>
                  Secure Shopping
                </strong>

                <small>
                  Protected transactions
                </small>
              </div>

            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">

              <span className="trust-icon">
                ◎
              </span>

              <div>
                <strong>
                  Global Reach
                </strong>

                <small>
                  Africa to the world
                </small>
              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <div className="hero-visual">

          <div className="visual-ring ring-one"></div>

          <div className="visual-ring ring-two"></div>

          <div className="hero-card">

            <div className="card-top">

              <div>

                <span className="card-label">
                  AFRIMARKET
                </span>

                <h3>
                  Premium
                  <br />
                  Commerce
                </h3>

              </div>

              <div className="card-symbol">
                ✦
              </div>

            </div>

            <div className="card-center">

              <div className="africa-symbol">
                AFRICA
              </div>

            </div>

            <div className="card-bottom">

              <div>

                <span>
                  Discover
                </span>

                <strong>
                  {slide.category}
                </strong>

              </div>

              <div className="card-arrow">
                →
              </div>

            </div>

          </div>

          {/* FLOATING CARDS */}

          <div className="floating-card floating-card-one">

            <span className="floating-icon">
              ✓
            </span>

            <div>

              <strong>
                Trusted
              </strong>

              <small>
                Marketplace
              </small>

            </div>

          </div>

          <div className="floating-card floating-card-two">

            <span className="floating-icon">
              ✦
            </span>

            <div>

              <strong>
                AI Assistant
              </strong>

              <small>
                Always available
              </small>

            </div>

          </div>

          <div className="floating-card floating-card-three">

            <span className="floating-icon">
              ◆
            </span>

            <div>

              <strong>
                Global
              </strong>

              <small>
                Commerce
              </small>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          HERO BOTTOM
      ========================================== */}

      <div className="hero-bottom">

        <div className="hero-slide-info">

          <span>
            0{current + 1}
          </span>

          <div className="slide-progress">

            <div
              className="slide-progress-fill"
              key={current}
            ></div>

          </div>

          <span>
            0{slides.length}
          </span>

        </div>

        <div className="hero-dots">

          {slides.map((_, index) => (

            <button
              key={index}
              className={
                current === index
                  ? "hero-dot active"
                  : "hero-dot"
              }
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />

          ))}

        </div>

        <div className="hero-location">

          <span>
            🌍
          </span>

          AFRICA • WORLDWIDE

        </div>

      </div>

      {/* =================================================
          AFRIMARKET AI CHAT WINDOW
      ================================================= */}

      {showAI && (

        <div className="ai-overlay">

          <div className="ai-chat">

            {/* HEADER */}

            <div className="ai-chat-header">

              <div className="ai-header-info">

                <div className="ai-avatar">
                  ✦
                </div>

                <div>

                  <strong>
                    AfriMarket AI
                  </strong>

                  <span>
                    ● Online
                  </span>

                </div>

              </div>

              <button
                className="ai-close"
                onClick={() => setShowAI(false)}
                aria-label="Close AfriMarket AI"
              >
                ×
              </button>

            </div>

            {/* MESSAGES */}

            <div className="ai-messages">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={
                    message.role === "user"
                      ? "ai-message user-message"
                      : "ai-message assistant-message"
                  }
                >
                  {message.text}
                </div>

              ))}

              {loading && (

                <div className="ai-message assistant-message ai-typing">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              )}

            </div>

            {/* INPUT */}

            <div className="ai-input-area">

              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask AfriMarket AI..."
                rows="1"
                disabled={loading}
              />

              <button
                className="ai-send"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                ↑
              </button>

            </div>

            <div className="ai-powered">
              Powered by AfriMarket AI
            </div>

          </div>

        </div>

      )}

    </section>
  );
}