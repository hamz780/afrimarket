import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { useProducts } from "../context/ProductContext";
import "./MarketplacePages.css";

export default function MarketplaceResults() {
  const { products = [] } = useProducts();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim().toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const deal = searchParams.get("deal") || "";
  const brands = searchParams.get("brands") || "";

  const filteredProducts = products.filter((product) => {
    const searchable = [
      product.name,
      product.category,
      product.brand,
      product.seller,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = !query || searchable.includes(query);

    const matchesCategory =
      !category ||
      product.category?.toLowerCase() === category.toLowerCase();

    const matchesDeal =
      deal !== "flash" || Number(product.discount || 0) > 0;

    const matchesBrand = !brands || Boolean(product.brand);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDeal &&
      matchesBrand
    );
  });

  const pageTitle =
    deal === "flash"
      ? "Flash Sale Deals"
      : category
        ? `${category} Products`
        : brands
          ? "Shop by Brand"
          : query
            ? `Search results for “${searchParams.get("q")}”`
            : "All Products";

  return (
    <main className="marketplace-page">
      <div className="marketplace-page-header">
        <Link to="/" className="back-home">
          ← Back to home
        </Link>

        <h1>{pageTitle}</h1>

        <p>
          {filteredProducts.length} product
          {filteredProducts.length === 1 ? "" : "s"} found
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="marketplace-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="marketplace-empty">
          <h2>No matching products found</h2>

          <p>
            Try a different search, category, or browse all products.
          </p>

          <Link to="/products">Browse all products</Link>
        </div>
      )}
    </main>
  );
}