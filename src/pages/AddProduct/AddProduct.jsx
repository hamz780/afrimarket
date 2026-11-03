import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Sidebar from "../../components/seller/Sidebar";
import Topbar from "../../components/seller/Topbar";
import { useProducts } from "../../context/ProductContext";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import ImageUploader from "../../components/ui/ImageUploader";

import "./AddProduct.css";

// Extract validation logic
const validateProduct = (product) => {
  const errors = {};
  
  if (!product.name.trim()) errors.name = "Product name is required";
  if (!product.category.trim()) errors.category = "Category is required";
  if (!product.brand.trim()) errors.brand = "Brand is required";
  if (!product.price || product.price <= 0) errors.price = "Price must be greater than 0";
  if (!product.stock || product.stock < 0) errors.stock = "Stock must be 0 or greater";
  if (product.discount && (product.discount < 0 || product.discount > 100)) {
    errors.discount = "Discount must be between 0 and 100";
  }
  if (!product.sku.trim()) errors.sku = "SKU is required";
  if (!product.description.trim()) errors.description = "Description is required";
  
  return errors;
};

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Initial state
  const initialProductState = {
    name: "",
    category: "",
    brand: "",
    sku: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    featured: false,
    trending: false,
    bestSeller: false,
    status: "Published",
    image: "",
  };

  const [product, setProduct] = useState(initialProductState);

  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setProduct((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateProduct(product);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare product data
      const productData = {
        ...product,
        price: Number(product.price),
        discount: Number(product.discount) || 0,
        stock: Number(product.stock),
        // Add timestamps or other metadata
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addProduct(productData);
      
      // Success - navigate to products page
      navigate("/seller/products", { 
        state: { message: "Product added successfully!" } 
      });
    } catch (error) {
      console.error("Error adding product:", error);
      // Show error message to user
      setErrors({ submit: "Failed to add product. Please try again." });
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setProduct(initialProductState);
      setErrors({});
    }
  }

  // Category options - could be fetched from API
  const categoryOptions = [
    { label: "Electronics", value: "Electronics" },
    { label: "Clothing", value: "Clothing" },
    { label: "Books", value: "Books" },
    { label: "Home & Garden", value: "Home & Garden" },
    { label: "Sports", value: "Sports" },
    { label: "Toys", value: "Toys" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="seller-dashboard">
      <Sidebar />
      <div className="seller-main">
        <Topbar />
        <div className="seller-content">
          <PageHeader
            title="Add Product"
            subtitle="Create a new product for your store."
            action={
              <Link to="/seller/products">
                <Button variant="secondary">
                  <FaArrowLeft />
                  Back
                </Button>
              </Link>
            }
          />

          {/* Display submit error if any */}
          {errors.submit && (
            <div className="error-message" role="alert">
              {errors.submit}
            </div>
          )}

          <Card>
            <form className="product-form" onSubmit={handleSubmit} noValidate>
              {/* Product Information Section */}
              <div className="form-section">
                <h3 className="section-title">Product Information</h3>
                <div className="form-grid">
                  <Input
                    label="Product Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    error={errors.name}
                    placeholder="Enter product name"
                  />
                  <Input
                    label="SKU"
                    name="sku"
                    value={product.sku}
                    onChange={handleChange}
                    required
                    error={errors.sku}
                    placeholder="Enter SKU"
                  />
                  <Select
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categoryOptions}
                    required
                    error={errors.category}
                    placeholder="Select category"
                  />
                  <Input
                    label="Brand"
                    name="brand"
                    value={product.brand}
                    onChange={handleChange}
                    required
                    error={errors.brand}
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              {/* Pricing & Stock Section */}
              <div className="form-section">
                <h3 className="section-title">Pricing & Stock</h3>
                <div className="form-grid">
                  <Input
                    type="number"
                    label="Price ($)"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    error={errors.price}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <Input
                    type="number"
                    label="Discount (%)"
                    name="discount"
                    value={product.discount}
                    onChange={handleChange}
                    error={errors.discount}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <Input
                    type="number"
                    label="Stock Quantity"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                    error={errors.stock}
                    placeholder="0"
                    min="0"
                  />
                  <Select
                    label="Status"
                    name="status"
                    value={product.status}
                    onChange={handleChange}
                    options={[
                      { label: "Published", value: "Published" },
                      { label: "Draft", value: "Draft" },
                      { label: "Archived", value: "Archived" },
                    ]}
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="form-section">
                <h3 className="section-title">Description</h3>
                <Textarea
                  label="Product Description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={6}
                  required
                  error={errors.description}
                  placeholder="Describe your product in detail..."
                  maxLength={1000}
                  showCharCount
                />
              </div>

              {/* Image Section */}
              <div className="form-section">
                <h3 className="section-title">Product Image</h3>
                <ImageUploader
                  label="Upload Image"
                  image={product.image}
                  setImage={(image) =>
                    setProduct((current) => ({
                      ...current,
                      image,
                    }))
                  }
                  maxSize={5} // MB
                  acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                />
              </div>

              {/* Flags Section */}
              <div className="form-section">
                <h3 className="section-title">Product Flags</h3>
                <div className="checkbox-group">
                  <div className="checkbox-row">
                    <label>
                      <input
                        type="checkbox"
                        name="featured"
                        checked={product.featured}
                        onChange={handleChange}
                      />
                      <span>Featured Product</span>
                    </label>
                    <small>Display on homepage featured section</small>
                  </div>
                  <div className="checkbox-row">
                    <label>
                      <input
                        type="checkbox"
                        name="trending"
                        checked={product.trending}
                        onChange={handleChange}
                      />
                      <span>Trending Product</span>
                    </label>
                    <small>Mark as trending in the store</small>
                  </div>
                  <div className="checkbox-row">
                    <label>
                      <input
                        type="checkbox"
                        name="bestSeller"
                        checked={product.bestSeller}
                        onChange={handleChange}
                      />
                      <span>Best Seller</span>
                    </label>
                    <small>Highlight as top-selling product</small>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Product"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}