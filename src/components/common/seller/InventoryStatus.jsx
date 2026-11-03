import {
  FaBoxOpen,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

import "./InventoryStatus.css";

export default function InventoryStatus() {

  const inventory = [

    {
      name: "Organic Honey",
      stock: 45,
      status: "In Stock",
    },

    {
      name: "African Coffee",
      stock: 12,
      status: "Low Stock",
    },

    {
      name: "Leather Sandals",
      stock: 0,
      status: "Out of Stock",
    },

    {
      name: "Shea Butter",
      stock: 82,
      status: "In Stock",
    }

  ];

  return (

    <section className="inventory-status">

      <div className="inventory-header">

        <h2>

          <FaBoxOpen />

          Inventory Status

        </h2>

      </div>

      <div className="inventory-list">

        {inventory.map((item,index)=>(

          <div
            key={index}
            className="inventory-item"
          >

            <div>

              <h4>{item.name}</h4>

              <small>{item.stock} items remaining</small>

            </div>

            <div>

              {item.status === "In Stock" && (

                <span className="stock in-stock">

                  <FaCheckCircle />

                  In Stock

                </span>

              )}

              {item.status === "Low Stock" && (

                <span className="stock low-stock">

                  <FaExclamationTriangle />

                  Low Stock

                </span>

              )}

              {item.status === "Out of Stock" && (

                <span className="stock out-stock">

                  <FaExclamationTriangle />

                  Out of Stock

                </span>

              )}

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}