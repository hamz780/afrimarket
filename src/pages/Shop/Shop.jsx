import { useEffect, useMemo, useState } from "react";

import ProductCard from "../../components/common/ProductCard";
import { useProducts } from "../../context/ProductContext";

import "./Shop.css";

export default function Shop() {

  const {
    products
  } = useProducts();

  /* ===========================
     STATES
  =========================== */

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [brand, setBrand] = useState("All");

  const [priceRange, setPriceRange] = useState("All");

  const [sortBy, setSortBy] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  /* ===========================
     FILTER OPTIONS
  =========================== */

  const categories = [
    "All",
    "Beauty",
    "Crafts",
    "Electronics",
    "Fashion",
    "Groceries"
  ];

  const brands = [
    "All",
    ...new Set(
      products.map(
        (product) => product.brand
      )
    )
  ];

  /* ===========================
     FILTER PRODUCTS
  =========================== */

  const filteredProducts = useMemo(() => {

    let result = [...products];

    // SEARCH

    if (search.trim()) {

      const value = search.toLowerCase();

      result = result.filter(
        (product) =>

          product.name
            .toLowerCase()
            .includes(value)

          ||

          product.category
            .toLowerCase()
            .includes(value)

          ||

          product.brand
            .toLowerCase()
            .includes(value)

      );

    }

    // CATEGORY

    if (category !== "All") {

      result = result.filter(
        (product) =>
          product.category === category
      );

    }

    // BRAND

    if (brand !== "All") {

      result = result.filter(
        (product) =>
          product.brand === brand
      );

    }

    // PRICE

    switch (priceRange) {

      case "under20":

        result = result.filter(
          (product) =>
            product.price < 20
        );

        break;

      case "20to50":

        result = result.filter(
          (product) =>
            product.price >= 20 &&
            product.price <= 50
        );

        break;

      case "50to100":

        result = result.filter(
          (product) =>
            product.price > 50 &&
            product.price <= 100
        );

        break;

      case "100plus":

        result = result.filter(
          (product) =>
            product.price > 100
        );

        break;

      default:

        break;

    }

    // SORT

    switch (sortBy) {

      case "price-low":

        result.sort(
          (a, b) =>
            a.price - b.price
        );

        break;

      case "price-high":

        result.sort(
          (a, b) =>
            b.price - a.price
        );

        break;

      case "rating":

        result.sort(
          (a, b) =>
            (b.rating || 0) - (a.rating || 0)
        );

        break;

      case "newest":

        result.sort(
          (a, b) =>
            b.id - a.id
        );

        break;

      default:

        result.sort(
          (a, b) =>
            Number(b.featured) -
            Number(a.featured)
        );

    }

    return result;

  }, [
    products,
    search,
    category,
    brand,
    priceRange,
    sortBy
  ]);

  /* ===========================
     RESET PAGE AFTER FILTER
  =========================== */

  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    category,
    brand,
    priceRange,
    sortBy
  ]);

  /* ===========================
     PAGINATION
  =========================== */

  const totalPages = Math.ceil(
    filteredProducts.length /
    productsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  /* ===========================
     CLEAR FILTERS
  =========================== */

  const clearFilters = () => {

    setSearch("");

    setCategory("All");

    setBrand("All");

    setPriceRange("All");

    setSortBy("featured");

  };

  return (

    <section className="shop-page">

      <div className="shop-header">

        <h1>
          Shop
        </h1>

        <p>
          Discover authentic African products from trusted sellers.
        </p>

      </div>

      <div className="shop-toolbar">

        <input

          type="text"

          placeholder="Search products..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

        <select

          value={sortBy}

          onChange={(e) =>
            setSortBy(e.target.value)
          }

        >

          <option value="featured">
            Featured
          </option>

          <option value="newest">
            Newest
          </option>

          <option value="rating">
            Highest Rated
          </option>

          <option value="price-low">
            Price Low → High
          </option>

          <option value="price-high">
            Price High → Low
          </option>

        </select>

      </div>

      <div className="shop-layout">

        <aside className="shop-sidebar">

          <h3>
            Categories
          </h3>

          {

            categories.map((item) => (

              <button

                key={item}

                className={
                  category === item
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setCategory(item)
                }

              >

                {item}

              </button>

            ))

          }

          <h3 className="sidebar-title">
            Brands
          </h3>

          <select

            value={brand}

            onChange={(e) =>
              setBrand(e.target.value)
            }

          >

            {

              brands.map((item) => (

                <option
                  key={item}
                  value={item}
                >

                  {item}

                </option>

              ))

            }

          </select>

          <h3 className="sidebar-title">
            Price
          </h3>

          <select

            value={priceRange}

            onChange={(e) =>
              setPriceRange(e.target.value)
            }

          >

            <option value="All">
              All Prices
            </option>

            <option value="under20">
              Under $20
            </option>

            <option value="20to50">
              $20 - $50
            </option>

            <option value="50to100">
              $50 - $100
            </option>

            <option value="100plus">
              Above $100
            </option>

          </select>

          <button

            className="clear-filters"

            onClick={clearFilters}

          >

            Clear Filters

          </button>

        </aside>

        <main className="shop-content">

          <div className="shop-results">

            Showing

            <strong>

              {" "}

              {filteredProducts.length}

              {" "}

            </strong>

            Products

          </div>

          {

            currentProducts.length === 0

              ? (

                <div className="empty-products">

                  <h2>
                    No products found
                  </h2>

                  <p>
                    Try another search or filter.
                  </p>

                </div>

              )

              : (

                <div className="shop-grid">

                  {

                    currentProducts.map((product) => (

                      <ProductCard

                        key={product.id}

                        product={product}

                      />

                    ))

                  }

                </div>

              )

          }

          {

            totalPages > 1 && (

              <div className="pagination">

                <button

                  disabled={
                    currentPage === 1
                  }

                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }

                >

                  ← Previous

                </button>

                {

                  Array.from(
                    {
                      length: totalPages
                    },
                    (_, index) => (

                      <button

                        key={index}

                        className={
                          currentPage === index + 1
                            ? "active"
                            : ""
                        }

                        onClick={() =>
                          setCurrentPage(
                            index + 1
                          )
                        }

                      >

                        {index + 1}

                      </button>

                    )
                  )

                }

                <button

                  disabled={
                    currentPage === totalPages
                  }

                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }

                >

                  Next →

                </button>

              </div>

            )

          }

        </main>

      </div>

    </section>

  );

}