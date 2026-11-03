import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import "./MarketplacePages.css";

export default function Wishlist() {
  const { wishlistItems = [] } = useWishlist();

  return (
    <main className="marketplace-page">
      <div className="marketplace-page-header">
        <Link to="/" className="marketplace-back-link">
          ← Back to home
        </Link>

        <h1>My Wishlist</h1>

        <p>
          {wishlistItems.length} saved product
          {wishlistItems.length === 1 ? "" : "s"}
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="marketplace-grid">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="marketplace-empty">
          <div className="wishlist-empty-icon">❤️</div>

          <h2>Your wishlist is empty</h2>

          <p>
            Save products you love and return to them anytime.
          </p>

          <Link to="/products" className="marketplace-empty-link">
            Explore products
          </Link>
        </div>
      )}
    </main>
  );
}