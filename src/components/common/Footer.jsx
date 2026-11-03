import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand">

          <h2 className="footer-logo">
            🌍 AfriMarket
          </h2>

          <p className="footer-description">
            Africa's Digital Marketplace connecting buyers and sellers
            across the continent. Shop confidently with verified
            sellers, secure payments and fast delivery.
          </p>

          <div className="footer-trust">

            <span>🔒 Secure Payments</span>
            <span>✔ Verified Sellers</span>
            <span>🚚 Fast Delivery</span>
            <span>💬 24/7 Support</span>

          </div>

        </div>

        {/* Links */}
        <div className="footer-links">

          <div className="footer-column">

            <h3>Marketplace</h3>

            <ul>

              <li>Home</li>
              <li>Categories</li>
              <li>Products</li>
              <li>Flash Sale</li>
              <li>Featured Products</li>
              <li>Best Sellers</li>
              <li>Trending Products</li>
              <li>New Arrivals</li>

            </ul>

          </div>

          <div className="footer-column">

            <h3>Customer</h3>

            <ul>

              <li>My Account</li>
              <li>Wishlist</li>
              <li>Shopping Cart</li>
              <li>Orders</li>
              <li>Checkout</li>
              <li>Track Order</li>
              <li>Returns</li>
              <li>Help Centre</li>

            </ul>

          </div>

          <div className="footer-column">

            <h3>Seller Centre</h3>

            <ul>

              <li>Become a Seller</li>
              <li>Seller Dashboard</li>
              <li>Seller Support</li>
              <li>Advertising</li>
              <li>Affiliate Program</li>

            </ul>

          </div>

          <div className="footer-column">

            <h3>Payment Methods</h3>

            <ul>

              <li>MTN Mobile Money</li>
              <li>Airtel Money</li>
              <li>M-Pesa</li>
              <li>Visa</li>
              <li>Mastercard</li>
              <li>PayPal</li>
              <li>Bitcoin</li>
              <li>USDT</li>

            </ul>

          </div>

        </div>

      </div>

      {/* Contact */}
      <div className="footer-middle">

        <div className="footer-region">

          <h3>🌍 African Marketplace</h3>

          <div className="countries">

            <span>🇺🇬 Uganda</span>
            <span>🇰🇪 Kenya</span>
            <span>🇹🇿 Tanzania</span>
            <span>🇷🇼 Rwanda</span>
            <span>🇳🇬 Nigeria</span>
            <span>🇬🇭 Ghana</span>
            <span>🇿🇦 South Africa</span>

          </div>

        </div>

        <div className="footer-contact">

          <h3>Contact Us</h3>

          <p>📞 +256 788 886 366</p>

          <p>📧 support@afrimarket.africa</p>

          <p>📍 Kampala, Uganda</p>

          <p>🕒 24/7 Customer Support</p>

          <div className="social-links">

            <span>📘 Facebook</span>
            <span>📸 Instagram</span>
            <span>𝕏 X</span>
            <span>▶ YouTube</span>
            <span>💼 LinkedIn</span>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} AfriMarket. All Rights Reserved.
        </p>

        <p>
          🌍 Built for Africa • Trusted Worldwide
        </p>

      </div>

    </footer>
  );
}