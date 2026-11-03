import {
  FaEye,
  FaTruck,
} from "react-icons/fa";

import "./OrdersTable.css";

export default function OrdersTable() {

  const orders = [

    {
      id: "#AF1025",
      customer: "John Kamau",
      date: "07 Aug 2026",
      payment: "Paid",
      delivery: "Shipped",
      total: "$145.50",
    },

    {
      id: "#AF1026",
      customer: "Amina Yusuf",
      date: "07 Aug 2026",
      payment: "Pending",
      delivery: "Processing",
      total: "$89.99",
    },

    {
      id: "#AF1027",
      customer: "David Mwangi",
      date: "06 Aug 2026",
      payment: "Paid",
      delivery: "Delivered",
      total: "$220.00",
    }

  ];

  return (

    <section className="orders-table">

      <div className="orders-header">

        <h2>Recent Orders</h2>

      </div>

      <table>

        <thead>

          <tr>

            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Total</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order)=>(

            <tr key={order.id}>

              <td>{order.id}</td>

              <td>{order.customer}</td>

              <td>{order.date}</td>

              <td>

                <span
                  className={`payment ${order.payment.toLowerCase()}`}
                >

                  {order.payment}

                </span>

              </td>

              <td>

                <span
                  className={`delivery ${order.delivery
                    .replace(/\s/g,"-")
                    .toLowerCase()}`}
                >

                  <FaTruck />

                  {order.delivery}

                </span>

              </td>

              <td>

                <strong>{order.total}</strong>

              </td>

              <td>

                <button className="view-order-btn">

                  <FaEye />

                  View

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>

  );

}