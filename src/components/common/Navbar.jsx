import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaStore,
  FaTags,
  FaGlobe,
  FaMapMarkerAlt,
  FaCamera,
  FaChevronDown,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import "./Navbar.css";

const countries = [
  "Uganda",
  "Kenya",
  "Tanzania",
  "Rwanda",
  "Nigeria",
  "Ghana",
  "South Africa",
];

const languages = [
  { label: "English · UGX", language: "English", currency: "UGX" },
  { label: "English · KES", language: "English", currency: "KES" },
  { label: "English · NGN", language: "English", currency: "NGN" },
  { label: "English · USD", language: "English", currency: "USD" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const imageInputRef = useRef(null);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [country, setCountry] = useState("Uganda");
  const [language, setLanguage] = useState(languages[0]);
  const [activeMenu, setActiveMenu] = useState(null);

  const submitSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }

    if (category !== "All Categories") {
      params.set("category", category);
    }

    const queryString = params.toString();
    navigate(queryString ? `/products?${queryString}` : "/products");
  };

  const handleImageSearch = () => {
    imageInputRef.current?.click();
  };

  const handleImageSelected = (event) => {
    const selectedImage = event.target.files?.[0];

    if (!selectedImage) return;

    navigate(
      `/products?imageSearch=${encodeURIComponent(selectedImage.name)}`
    );
  };

  const selectCountry = (selectedCountry) => {
    setCountry(selectedCountry);
    setActiveMenu(null);
  };

  const selectLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setActiveMenu(null);
  };

  return (
    <header className="navbar">
      <div className="navbar-top">
        <Link to="/" className="logo">
          <span className="logo-icon">🌍</span>
          <span>AfriMarket</span>
        </Link>

        <form className="search-bar" onSubmit={submitSearch}>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Choose a product category"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Groceries</option>
            <option>Phones</option>
            <option>Beauty</option>
            <option>Handmade Crafts</option>
            <option>Agriculture</option>
            <option>Home & Living</option>
            <option>Automotive</option>
          </select>

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="What are you looking for?"
            aria-label="Search products"
          />

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelected}
            hidden
          />

          <button
            type="button"
            className="image-search"
            onClick={handleImageSearch}
            aria-label="Choose an image to search"
            title="Search by image"
          >
            <FaCamera />
          </button>

          <button type="submit" className="search-button">
            <FaSearch />
            <span>Search</span>
          </button>
        </form>

        <div className="top-utilities">
          <div className="utility-menu-wrapper">
            <button
              type="button"
              className="utility-control delivery-control"
              onClick={() =>
                setActiveMenu(
                  activeMenu === "delivery" ? null : "delivery"
                )
              }
              aria-expanded={activeMenu === "delivery"}
            >
              <FaMapMarkerAlt />
              <span>
                <small>Deliver to</small>
                {country}
              </span>
              <FaChevronDown className="utility-chevron" />
            </button>

            {activeMenu === "delivery" && (
              <div className="utility-menu">
                <strong>Deliver to</strong>
                {countries.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={country === item ? "selected" : ""}
                    onClick={() => selectCountry(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="utility-menu-wrapper">
            <button
              type="button"
              className="utility-control language-control"
              onClick={() =>
                setActiveMenu(
                  activeMenu === "language" ? null : "language"
                )
              }
              aria-expanded={activeMenu === "language"}
            >
              <FaGlobe />
              <span>{language.label}</span>
              <FaChevronDown className="utility-chevron" />
            </button>

            {activeMenu === "language" && (
              <div className="utility-menu language-menu">
                <strong>Language & currency</strong>
                {languages.map((item) => (
                  <button
                    type="button"
                    key={item.label}
                    className={
                      language.label === item.label ? "selected" : ""
                    }
                    onClick={() => selectLanguage(item)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="nav-actions">
          <Link to="/wishlist" className="icon-link">
            <FaHeart />
            <span>Wishlist</span>

            {wishlistCount > 0 && (
              <span className="cart-count">{wishlistCount}</span>
            )}
          </Link>

          <Link to="/cart" className="icon-link">
            <FaShoppingCart />
            <span>Cart</span>

            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>

          <Link to="/login" className="icon-link account-link">
            <FaUser />
            <span>Sign in</span>
          </Link>

          <Link to="/register" className="create-account">
            Create account
          </Link>
        </div>
      </div>

      <nav className="navbar-bottom" aria-label="Marketplace navigation">
        <Link to="/products">
          <FaBars />
          All Categories
        </Link>

        <Link to="/">Home</Link>

        <Link to="/products?deal=flash">Deals</Link>

        <Link to="/products?brands=true">
          <FaTags />
          Brands
        </Link>

        <Link to="/seller/dashboard">
          <FaStore />
          Sell on AfriMarket
        </Link>
      </nav>
    </header>
  );
}