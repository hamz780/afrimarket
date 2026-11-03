import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaStar,
  FaFire,
  FaCrown,
  FaBoxOpen,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

import Sidebar from "../../components/seller/Sidebar";
import Topbar from "../../components/seller/Topbar";

import { useProducts } from "../../context/ProductContext";

import "./SellerProducts.css";

export default function SellerProducts() {

  const { products = [], deleteProduct } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [page, setPage] = useState(1);

  const perPage = 10;

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean))
  ];

  const brands = [
    "All",
    ...new Set(products.map((p) => p.brand).filter(Boolean))
  ];

  const filteredProducts = useMemo(() => {

    let data = [...products];

    if (search.trim()) {

      const value = search.toLowerCase();

      data = data.filter((product) =>
        (product.name || "").toLowerCase().includes(value) ||
        (product.brand || "").toLowerCase().includes(value) ||
        (product.category || "").toLowerCase().includes(value)
      );

    }

    if (category !== "All") {
      data = data.filter(
        (product) => product.category === category
      );
    }

    if (brand !== "All") {
      data = data.filter(
        (product) => product.brand === brand
      );
    }

    return data;

  }, [products, search, category, brand]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const currentProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const totalProducts = products.length;

  const featuredProducts = products.filter(
    (p) => p.featured
  ).length;

  const trendingProducts = products.filter(
    (p) => p.trending
  ).length;

  const bestSellerProducts = products.filter(
    (p) => p.bestSeller
  ).length;

  const lowStock = products.filter(
    (p) => p.stock > 0 && p.stock <= 10
  ).length;

  const outOfStock = products.filter(
    (p) => p.stock <= 0
  ).length;

  function stockClass(stock) {

    if (stock <= 0) return "out";

    if (stock <= 10) return "low";

    return "good";

  }return (

<div className="seller-dashboard">

  <Sidebar />

  <div className="seller-main">

    <Topbar />

    <div className="seller-content">

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <div className="products-header">

        <div>

          <h1>Products</h1>

          <p>
            Manage your marketplace inventory
          </p>

        </div>

        <Link
          to="/seller/products/add"
          className="add-product-btn"
        >

          <FaPlus />

          Add Product

        </Link>

      </div>

      {/* ============================= */}
      {/* Statistics */}
      {/* ============================= */}

      <div className="product-stats">

        <div className="stat-card">

          <FaBoxOpen className="stat-icon blue" />

          <div>

            <h2>{totalProducts}</h2>

            <span>Total Products</span>

          </div>

        </div>

        <div className="stat-card">

          <FaStar className="stat-icon gold" />

          <div>

            <h2>{featuredProducts}</h2>

            <span>Featured</span>

          </div>

        </div>

        <div className="stat-card">

          <FaFire className="stat-icon orange" />

          <div>

            <h2>{trendingProducts}</h2>

            <span>Trending</span>

          </div>

        </div>

        <div className="stat-card">

          <FaCrown className="stat-icon green" />

          <div>

            <h2>{bestSellerProducts}</h2>

            <span>Best Sellers</span>

          </div>

        </div>

        <div className="stat-card">

          <FaExclamationTriangle className="stat-icon yellow" />

          <div>

            <h2>{lowStock}</h2>

            <span>Low Stock</span>

          </div>

        </div>

        <div className="stat-card">

          <FaTimesCircle className="stat-icon red" />

          <div>

            <h2>{outOfStock}</h2>

            <span>Out of Stock</span>

          </div>

        </div>

      </div>

      {/* ============================= */}
      {/* Toolbar */}
      {/* ============================= */}

      <div className="products-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >

          {categories.map((item)=>(

            <option key={item} value={item}>
              {item}
            </option>

          ))}

        </select>

        <select
          value={brand}
          onChange={(e)=>setBrand(e.target.value)}
        >

          {brands.map((item)=>(

            <option key={item} value={item}>
              {item}
            </option>

          ))}

        </select>

      </div>

      {/* ============================= */}
      {/* Products Table */}
      {/* ============================= */}

      <div className="products-table">

        <table>

          <thead>

            <tr>

              <th>Product</th>

              <th>Category</th>

              <th>Brand</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>            {currentProducts.length > 0 ? (

              currentProducts.map((product) => (

                <tr key={product.id || product._id}>

                  <td>

                    <div className="product-info">

                      <img
                        src={
                          product.image ||
                          "/images/placeholder.png"
                        }
                        alt={product.name}
                      />

                      <div>

                        <strong>{product.name}</strong>

                        <span>
                          SKU: {product.sku || "N/A"}
                        </span>

                      </div>

                    </div>

                  </td>

                  <td>

                    {product.category}

                  </td>

                  <td>

                    {product.brand}

                  </td>

                  <td>

                    <strong>

                      ${Number(product.price).toFixed(2)}

                    </strong>

                    {product.discount > 0 && (

                      <div className="discount-text">

                        {product.discount}% OFF

                      </div>

                    )}

                  </td>

                  <td>

                    <span
                      className={`stock-badge ${stockClass(product.stock)}`}
                    >

                      {product.stock}

                    </span>

                  </td>

                  <td>

                    <div className="badges">

                      {product.featured && (

                        <span className="badge featured">

                          <FaStar />

                        </span>

                      )}

                      {product.trending && (

                        <span className="badge trending">

                          <FaFire />

                        </span>

                      )}

                      {product.bestSeller && (

                        <span className="badge bestseller">

                          <FaCrown />

                        </span>

                      )}

                      {product.stock <= 0 ? (

                        <span className="status out">

                          Out

                        </span>

                      ) : product.stock <= 10 ? (

                        <span className="status low">

                          Low

                        </span>

                      ) : (

                        <span className="status good">

                          <FaCheckCircle />

                          In Stock

                        </span>

                      )}

                    </div>

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="icon-btn view"
                        title="View"
                      >

                        <FaEye />

                      </button>

                      <Link
                        to={`/seller/products/${product.id}/edit`}
                        className="icon-btn edit"
                        title="Edit"
                      >

                        <FaEdit />

                      </Link>

                      <button
                        className="icon-btn delete"
                        title="Delete"
                        onClick={() => {

                          if (
                            window.confirm(
                              `Delete "${product.name}"?`
                            )
                          ) {

                            deleteProduct(
                              product.id || product._id
                            );

                          }

                        }}
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="empty-table"
                >

                  No products found.

                </td>

              </tr>

            )}          </tbody>

        </table>

      </div>

      {/* ============================= */}
      {/* Pagination */}
      {/* ============================= */}

      {totalPages > 1 && (

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (

              <button
                key={index}
                className={
                  page === index + 1
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPage(index + 1)
                }
              >
                {index + 1}
              </button>

            )
          )}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>

        </div>

      )}

      {/* ============================= */}
      {/* Footer */}
      {/* ============================= */}

      <div className="products-footer">

        <p>

          Showing

          <strong>

            {" "}
            {currentProducts.length}
            {" "}

          </strong>

          of

          <strong>

            {" "}
            {filteredProducts.length}
            {" "}

          </strong>

          products

        </p>

      </div>

    </div>

  </div>

</div>

);

}