import ProductCard from "../ProductCard";
import { useProducts } from "../../../context/ProductContext";

import "./RecommendedProducts.css";

export default function RecommendedProducts() {

  const { products } = useProducts();

  const recommendedProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (

    <section className="recommended-products">

      <div className="recommended-header">

        <span className="recommended-tag">
          ⭐ Recommended For You
        </span>

        <h2>
          You May Also Like
        </h2>

        <p>
          Customers who bought these products also loved these items.
        </p>

      </div>

      <div className="recommended-grid">

        {recommendedProducts.map((product) => (

          <div
            key={product.id}
            className="recommended-card"
          >

            <ProductCard product={product} />

          </div>

        ))}

      </div>

    </section>

  );

}