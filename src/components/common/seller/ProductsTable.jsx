import {
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import "./ProductsTable.css";

export default function ProductsTable() {

  const products = [

    {
      id: 1,
      image: "https://via.placeholder.com/70",
      name: "Organic Honey",
      category: "Groceries",
      price: "$18.99",
      stock: 45,
      status: "In Stock",
    },

    {
      id: 2,
      image: "https://via.placeholder.com/70",
      name: "African Coffee",
      category: "Beverages",
      price: "$12.50",
      stock: 18,
      status: "Low Stock",
    },

    {
      id: 3,
      image: "https://via.placeholder.com/70",
      name: "Leather Sandals",
      category: "Fashion",
      price: "$39.99",
      stock: 0,
      status: "Out of Stock",
    }

  ];

  return (

    <section className="products-table">

      <div className="table-header">

        <h2>Products</h2>

        <button>

          <FaPlus />

          Add Product

        </button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Product</th>

            <th>Category</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product)=>(

            <tr key={product.id}>

              <td className="product-cell">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <span>{product.name}</span>

              </td>

              <td>{product.category}</td>

              <td>{product.price}</td>

              <td>{product.stock}</td>

              <td>

                <span
                  className={`status ${product.status
                    .replace(/\s/g,"-")
                    .toLowerCase()}`}
                >

                  {product.status}

                </span>

              </td>

              <td>

                <button className="edit-btn">

                  <FaEdit />

                </button>

                <button className="delete-btn">

                  <FaTrash />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>

  );

}