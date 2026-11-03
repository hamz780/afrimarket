import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Dashboard
import SellerDashboard from "./pages/seller/SellerDashboard";

// Products
import SellerProducts from "./pages/seller/SellerProducts";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";

// Orders
import SellerOrders from "./pages/seller/SellerOrders";
import OrderDetails from "./pages/seller/OrderDetails";

// Customers
import SellerCustomers from "./pages/seller/SellerCustomers";
import CustomerDetails from "./pages/seller/CustomerDetails";
import CustomerOrders from "./pages/seller/CustomerOrders";

// Reviews
import SellerReviews from "./pages/seller/reviews/SellerReviews";
import ReviewDetails from "./pages/seller/reviews/ReviewDetails";
import ReviewReplies from "./pages/seller/reviews/ReviewReplies";
import ReviewReports from "./pages/seller/reviews/ReviewReports";

// Contexts
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import { CustomerProvider } from "./context/CustomerContext";
import { ReviewProvider } from "./context/ReviewContext";

// 404
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProductProvider>
              <OrderProvider>
                <SellerDashboard />
              </OrderProvider>
            </ProductProvider>
          }
        />

        <Route
          path="/seller/dashboard"
          element={
            <ProductProvider>
              <OrderProvider>
                <SellerDashboard />
              </OrderProvider>
            </ProductProvider>
          }
        />

        {/* Products */}
        <Route
          path="/seller/products"
          element={
            <ProductProvider>
              <SellerProducts />
            </ProductProvider>
          }
        />

        <Route
          path="/seller/products/add"
          element={
            <ProductProvider>
              <AddProduct />
            </ProductProvider>
          }
        />

        <Route
          path="/seller/products/:id/edit"
          element={
            <ProductProvider>
              <EditProduct />
            </ProductProvider>
          }
        />

        {/* Orders */}
        <Route
          path="/seller/orders"
          element={
            <OrderProvider>
              <SellerOrders />
            </OrderProvider>
          }
        />

        <Route
          path="/seller/orders/:id"
          element={
            <OrderProvider>
              <OrderDetails />
            </OrderProvider>
          }
        />

        {/* Customers */}
        <Route
          path="/seller/customers"
          element={
            <CustomerProvider>
              <SellerCustomers />
            </CustomerProvider>
          }
        />

        <Route
          path="/seller/customers/:id"
          element={
            <CustomerProvider>
              <CustomerDetails />
            </CustomerProvider>
          }
        />

        <Route
          path="/seller/customers/:id/orders"
          element={
            <CustomerProvider>
              <CustomerOrders />
            </CustomerProvider>
          }
        />

        {/* Reviews */}
        <Route
          path="/seller/reviews"
          element={
            <ReviewProvider>
              <SellerReviews />
            </ReviewProvider>
          }
        />

        <Route
          path="/seller/reviews/:id"
          element={
            <ReviewProvider>
              <ReviewDetails />
            </ReviewProvider>
          }
        />

        <Route
          path="/seller/reviews/:id/reply"
          element={
            <ReviewProvider>
              <ReviewReplies />
            </ReviewProvider>
          }
        />

        <Route
          path="/seller/reviews/reports"
          element={
            <ReviewProvider>
              <ReviewReports />
            </ReviewProvider>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
}

export default App;