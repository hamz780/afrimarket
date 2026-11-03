import { Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/Home";

// Authentication
import Register from "./pages/auth/Register";
import Login from "./pages/Login";

// Customer Dashboard
import Dashboard from "./pages/Dashboard";

// Customer Service
import CustomerService from "./pages/CustomerService";

// Admin Dashboard
import AdminDashboard from "./pages/admin/AdminDashboard";

// Cart & Checkout
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout";

// Marketplace
import MarketplaceResults from "./pages/MarketplaceResults";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/Wishlist";

// Seller Dashboard
import SellerDashboard from "./pages/seller/SellerDashboard";

// Seller Products
import SellerProducts from "./pages/seller/SellerProducts";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditProduct from "./pages/EditProduct/EditProduct";

// Seller Orders
import SellerOrders from "./pages/seller/SellerOrders";
import OrderDetails from "./pages/seller/OrderDetails";

// Seller Customers
import SellerCustomers from "./pages/seller/SellerCustomers";
import CustomerDetails from "./pages/CustomerDetails";
import CustomerOrders from "./pages/CustomerOrders";

// Seller Reviews
import SellerReviews from "./pages/seller/SellerReviews";
import ReviewDetails from "./pages/seller/ReviewDetails";
import ReviewReplies from "./pages/seller/ReviewReplies";
import ReviewReports from "./pages/seller/ReviewReports";

// Seller Messages
import SellerMessages from "./pages/seller/SellerMessages";

// Seller Coupons
import SellerCoupons from "./pages/seller/SellerCoupons";

// Seller Analytics
import SellerAnalytics from "./pages/seller/SellerAnalytics";

// Seller Settings
import SellerSettings from "./pages/seller/SellerSettings";

// 404
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      {/* =====================================================
          HOME
      ===================================================== */}
      <Route path="/" element={<Home />} />


      {/* =====================================================
          AUTHENTICATION
      ===================================================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* =====================================================
          CUSTOMER
      ===================================================== */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/wishlist" element={<Wishlist />} />

      {/* Customer Service */}
      <Route
        path="/customer-service"
        element={<CustomerService />}
      />


      {/* =====================================================
          MARKETPLACE
      ===================================================== */}
      <Route
        path="/products"
        element={<MarketplaceResults />}
      />

      <Route
        path="/categories"
        element={<MarketplaceResults />}
      />

      <Route
        path="/deals"
        element={<MarketplaceResults />}
      />

      <Route
        path="/brands"
        element={<MarketplaceResults />}
      />

      <Route
        path="/product/:slug"
        element={<ProductDetails />}
      />


      {/* =====================================================
          CART & CHECKOUT
      ===================================================== */}
      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/checkout"
        element={<Checkout />}
      />


      {/* =====================================================
          ADMIN DASHBOARD
      ===================================================== */}
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />


      {/* =====================================================
          SELLER DASHBOARD
      ===================================================== */}
      <Route
        path="/seller/dashboard"
        element={<SellerDashboard />}
      />


      {/* =====================================================
          SELLER PRODUCTS
      ===================================================== */}
      <Route
        path="/seller/products"
        element={<SellerProducts />}
      />

      <Route
        path="/seller/products/add"
        element={<AddProduct />}
      />

      <Route
        path="/seller/products/:id/edit"
        element={<EditProduct />}
      />


      {/* =====================================================
          SELLER ORDERS
      ===================================================== */}
      <Route
        path="/seller/orders"
        element={<SellerOrders />}
      />

      <Route
        path="/seller/orders/:id"
        element={<OrderDetails />}
      />


      {/* =====================================================
          SELLER CUSTOMERS
      ===================================================== */}
      <Route
        path="/seller/customers"
        element={<SellerCustomers />}
      />

      <Route
        path="/seller/customers/:id"
        element={<CustomerDetails />}
      />

      <Route
        path="/seller/customers/:id/orders"
        element={<CustomerOrders />}
      />


      {/* =====================================================
          SELLER REVIEWS
      ===================================================== */}
      <Route
        path="/seller/reviews"
        element={<SellerReviews />}
      />

      <Route
        path="/seller/reviews/:id"
        element={<ReviewDetails />}
      />

      <Route
        path="/seller/reviews/:id/reply"
        element={<ReviewReplies />}
      />

      <Route
        path="/seller/reviews/reports"
        element={<ReviewReports />}
      />


      {/* =====================================================
          SELLER MESSAGES
      ===================================================== */}
      <Route
        path="/seller/messages"
        element={<SellerMessages />}
      />


      {/* =====================================================
          SELLER COUPONS
      ===================================================== */}
      <Route
        path="/seller/coupons"
        element={<SellerCoupons />}
      />


      {/* =====================================================
          SELLER ANALYTICS
      ===================================================== */}
      <Route
        path="/seller/analytics"
        element={<SellerAnalytics />}
      />


      {/* =====================================================
          SELLER SETTINGS
      ===================================================== */}
      <Route
        path="/seller/settings"
        element={<SellerSettings />}
      />


      {/* =====================================================
          404
      ===================================================== */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;