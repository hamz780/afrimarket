import "./Analytics.css";

const categories = [
  {
    name: "Electronics",
    revenue: "$48,200",
    percentage: 82,
    color: "#4CAF50",
  },
  {
    name: "Fashion",
    revenue: "$31,800",
    percentage: 68,
    color: "#FF9800",
  },
  {
    name: "Beauty",
    revenue: "$22,400",
    percentage: 54,
    color: "#E91E63",
  },
  {
    name: "Groceries",
    revenue: "$18,700",
    percentage: 42,
    color: "#2196F3",
  },
  {
    name: "Crafts",
    revenue: "$13,900",
    percentage: 30,
    color: "#9C27B0",
  },
];

export default function TopCategories() {

  return (

    <div className="analytics-panel">

      <div className="panel-header">

        <h3>📊 Top Categories</h3>

        <button className="panel-link">

          View Report

        </button>

      </div>

      <div className="category-list">

        {categories.map((category) => (

          <div
            key={category.name}
            className="category-item"
          >

            <div className="category-header">

              <span>{category.name}</span>

              <strong>{category.revenue}</strong>

            </div>

            <div className="category-progress">

              <div
                className="category-fill"
                style={{
                  width: `${category.percentage}%`,
                  background: category.color,
                }}
              />

            </div>

            <small>

              {category.percentage}% of total sales

            </small>

          </div>

        ))}

      </div>

    </div>

  );

}