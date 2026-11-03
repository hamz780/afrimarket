import "./HeroBanner.css";

export default function HeroBanner() {
  return (
    <div className="hero-banner">

      <div className="deal-tag">
        🔥 TODAY'S FEATURED DEAL
      </div>

      <h2>Samsung Galaxy A56</h2>

      <p>
        Save up to
      </p>

      <div className="discount">
        40% OFF
      </div>

      <button className="banner-btn">
        Shop Now →
      </button>

      <button className="ai-banner-btn">
        🤖 Ask AfriMarket AI
      </button>

      <div className="banner-footer">
        ✓ Free Delivery
        <br />
        ✓ Verified Seller
      </div>

    </div>
  );
}