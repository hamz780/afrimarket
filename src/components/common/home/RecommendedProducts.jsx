import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../../context/ProductContext";

import "./RecommendedProducts.css";

export default function RecommendedProducts() {

  const { products } = useProducts();

  const recommendedProducts = products
    .filter(
      (product) =>
        product.featured ||
        product.bestSeller ||
        product.rating >= 4.5
    )
    .slice(0, 8);

  return (

    <section className="recommended-section">

      {/* Header */}

      <div className="recommended-header">

        <div>

          <span className="recommended-tag">

            ⭐ Recommended For You

          </span>

          <h2>Recommended Products</h2>

          <p>

            Hand-picked products based on quality,
            popularity and customer satisfaction.

          </p>

        </div>

      </div>

      {/* Products */}

      <div className="recommended-grid">

        {

          recommendedProducts.length > 0 ?

          recommendedProducts.map((product) => (

            <div
              className="recommended-card"
              key={product.id || product._id}
            >

              <div className="recommended-badge">

                ⭐ Recommended

              </div>

              <ProductCard product={product} />

              <div className="recommended-extra">

                <div className="recommended-rating">

                  ⭐ {product.rating || 4.8}

                  <span>

                    ({product.reviews || 0} Reviews)

                  </span>

                </div>

                <div className="recommended-meta">

                  <span>

                    📦 {product.stock || 0} In Stock

                  </span>

                  <span>

                    🚚 {product.delivery || "Free Delivery"}

                  </span>

                </div>

                <button className="recommended-btn">

                  🛒 Add to Cart

                </button>

              </div>

            </div>

          ))

          :

          <div className="no-products">

            <h3>

              No Recommendations Yet

            </h3>

            <p>

              Recommended products will appear here soon.

            </p>

          </div>

        }

      </div>

      {/* Footer */}

      <div className="recommended-footer">

        <button className="view-more-btn">

          View More Products →

        </button>

      </div>

    </section>

  );

}