import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaTrash,
  FaStar,
} from "react-icons/fa";

import "./WishlistPanel.css";

export default function WishlistPanel() {

  const wishlist = [

    {
      id: 1,
      name: "iPhone 16 Pro Max",
      image: "/images/products/iphone16.jpg",
      price: 1499,
      oldPrice: 1599,
      rating: 4.9,
    },

    {
      id: 2,
      name: "Sony WH-1000XM6",
      image: "/images/products/sony-headphones.jpg",
      price: 449,
      oldPrice: 499,
      rating: 4.8,
    },

    {
      id: 3,
      name: "Nike Air Max 2026",
      image: "/images/products/nike-airmax.jpg",
      price: 180,
      oldPrice: 220,
      rating: 4.7,
    },

  ];

  return (

    <section className="wishlist-panel">

      <div className="wishlist-header">

        <h2>

          ❤️ My Wishlist

        </h2>

        <button>

          View Wishlist

        </button>

      </div>

      <div className="wishlist-grid">

        {wishlist.map((item) => (

          <div
            className="wishlist-card"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <h3>{item.name}</h3>

            <div className="rating">

              <FaStar />

              {item.rating}

            </div>

            <div className="prices">

              <span className="price">

                ${item.price}

              </span>

              <span className="old-price">

                ${item.oldPrice}

              </span>

            </div>

            <div className="wishlist-actions">

              <button className="cart">

                <FaShoppingCart />

              </button>

              <button className="view">

                <FaEye />

              </button>

              <button className="remove">

                <FaTrash />

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}