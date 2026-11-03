import "./Analytics.css";

const topProducts = [
  {
    id: 1,
    name: "Beauty Care Collection",
    category: "Beauty",
    sold: 824,
    revenue: "$21,430",
    stock: 42,
    image: "https://via.placeholder.com/60"
  },
  {
    id: 2,
    name: "Smartphone",
    category: "Electronics",
    sold: 712,
    revenue: "$198,600",
    stock: 18,
    image: "https://via.placeholder.com/60"
  },
  {
    id: 3,
    name: "Ankara Dress",
    category: "Fashion",
    sold: 640,
    revenue: "$29,900",
    stock: 56,
    image: "https://via.placeholder.com/60"
  },
  {
    id: 4,
    name: "Fresh Fruits",
    category: "Groceries",
    sold: 596,
    revenue: "$8,720",
    stock: 120,
    image: "https://via.placeholder.com/60"
  }
];

export default function TopProducts() {

  return (

    <div className="analytics-panel">

      <div className="panel-header">

        <h3>🏆 Top Selling Products</h3>

        <button className="panel-link">

          View All

        </button>

      </div>

      <div className="top-products">

        {topProducts.map((product) => (

          <div
            className="top-product"
            key={product.id}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <div className="product-details">

              <h4>{product.name}</h4>

              <p>{product.category}</p>

            </div>

            <div className="product-stats">

              <strong>{product.sold}</strong>

              <small>Sold</small>

            </div>

            <div className="product-stats">

              <strong>{product.revenue}</strong>

              <small>Revenue</small>

            </div>

            <div
              className={`stock-status ${
                product.stock < 20
                  ? "low-stock"
                  : "good-stock"
              }`}
            >

              {product.stock} left

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}