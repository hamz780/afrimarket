import {
  FaEye,
  FaFileInvoice,
  FaStar,
} from "react-icons/fa";

import "./OrderHistory.css";

export default function OrderHistory() {

  const orders = [

    {
      id: "AFM-102341",
      product: "Samsung Galaxy S25",
      image: "/images/products/samsung-s25.jpg",
      date: "06 Aug 2026",
      total: "$899.00",
      status: "Delivered",
    },

    {
      id: "AFM-102122",
      product: "Nike Air Max",
      image: "/images/products/nike-airmax.jpg",
      date: "01 Aug 2026",
      total: "$145.00",
      status: "Shipped",
    },

    {
      id: "AFM-101998",
      product: "HP EliteBook",
      image: "/images/products/hp-elitebook.jpg",
      date: "28 Jul 2026",
      total: "$1,120.00",
      status: "Processing",
    },

  ];

  return (

    <section className="order-history">

      <div className="history-header">

        <h2>📦 Order History</h2>

        <button>

          View All Orders

        </button>

      </div>

      <div className="orders-table">

        <table>

          <thead>

            <tr>

              <th>Order</th>

              <th>Product</th>

              <th>Date</th>

              <th>Total</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td className="product-cell">

                  <img
                    src={order.image}
                    alt={order.product}
                  />

                  <span>

                    {order.product}

                  </span>

                </td>

                <td>{order.date}</td>

                <td>{order.total}</td>

                <td>

                  <span className={`status ${order.status.toLowerCase()}`}>

                    {order.status}

                  </span>

                </td>

                <td>

                  <div className="action-buttons">

                    <button>

                      <FaEye />

                    </button>

                    <button>

                      <FaFileInvoice />

                    </button>

                    <button>

                      <FaStar />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );

}