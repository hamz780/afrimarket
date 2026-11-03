import "./Categories.css";

const categories = [
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    items: "12,000+ Products",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
    items: "8,500+ Products",
  },
  {
    name: "Groceries",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    items: "15,000+ Products",
  },
  {
    name: "Handmade Crafts",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80",
    items: "4,300+ Products",
  },
  {
    name: "Agriculture",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    items: "7,800+ Products",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    items: "5,200+ Products",
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    items: "9,400+ Products",
  },
  {
    name: "Automotive",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    items: "3,900+ Products",
  },
];

export default function Categories() {
  return (
    <section className="categories">
      <div className="section-title">
        <h2>Shop by Category</h2>

        <p>
          Discover thousands of authentic African products across every
          category.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.name}>
            <div className="category-image-container">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />

              <div className="category-overlay">
                <h3>{category.name}</h3>

                <p>{category.items}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}