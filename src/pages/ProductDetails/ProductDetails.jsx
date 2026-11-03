import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import "../MarketplacePages.css";

export default function ProductDetails() {
  const { slug } = useParams();
  const { products = [] } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (item) =>
      String(item.slug) === String(slug) ||
      String(item.id) === String(slug)
  );

  if (!product) {
    return (
      <main className="marketplace-page">
        <div className="marketplace-empty">
          <h2>Product not found</h2>
          <p>This item may no longer be available.</p>
          <Link to="/products">Browse all products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="marketplace-page">
      <Link to="/products" className="back-home">
        ← Continue shopping
      </Link>

      <section className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <p className="product-detail-category">
            {product.category || "AfriMarket"}
          </p>

          <h1>{product.name}</h1>

          <p className="product-detail-seller">
            Sold by {product.brand || product.seller || "AfriMarket Seller"}
          </p>

          <div className="product-detail-price">
            <span>${product.price}</span>

            {product.oldPrice && <del>${product.oldPrice}</del>}

            {product.discount > 0 && (
              <small>-{product.discount}%</small>
            )}
          </div>

          <p>
            {product.delivery ||
              "Delivery details will be confirmed at checkout."}
          </p>

          <p>✓ {product.status || "Verified product"}</p>

          <button
            type="button"
            className="detail-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <Link to="/cart" className="detail-checkout-link">
            View Cart →
          </Link>
        </div>
      </section>
    </main>
  );
}