// =====================================================
// AFRIMARKET SELLER SERVICE
// =====================================================

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// =====================================================
// GET AUTH TOKEN
// =====================================================

const getToken = () => {
  const token =
    localStorage.getItem("afrimarket-token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken");

  console.log("🔐 Seller token check:", token ? "TOKEN FOUND" : "NO TOKEN");

  return token;
};

// =====================================================
// GET SAVED USER
// =====================================================

const getUser = () => {
  try {
    const savedUser = localStorage.getItem("afrimarket-user");

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error("❌ Could not read saved user:", error);
    return null;
  }
};

// =====================================================
// COMMON SELLER REQUEST
// =====================================================

const sellerRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const user = getUser();

  console.log("====================================");
  console.log("🔐 SELLER API REQUEST");
  console.log("Endpoint:", endpoint);
  console.log("User:", user);
  console.log("Role:", user?.role);
  console.log("Token exists:", !!token);
  console.log("====================================");

  // ---------------------------------------------------
  // CHECK LOGIN
  // ---------------------------------------------------

  if (!token) {
    throw new Error(
      "No authentication token found. Please log in again."
    );
  }

  // ---------------------------------------------------
  // CHECK SELLER ROLE
  // ---------------------------------------------------

  if (user && user.role !== "seller") {
    throw new Error(
      "This account is not registered as a seller."
    );
  }

  // ---------------------------------------------------
  // SEND REQUEST
  // ---------------------------------------------------

  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,

        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "📡 Seller HTTP status:",
      response.status
    );

    // -------------------------------------------------
    // READ RESPONSE
    // -------------------------------------------------

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid response."
      );
    }

    console.log(
      `📥 Seller API response ${endpoint}:`,
      data
    );

    // -------------------------------------------------
    // AUTHENTICATION ERROR
    // -------------------------------------------------

    if (
      response.status === 401 ||
      response.status === 403
    ) {
      console.error(
        "❌ Seller authentication rejected by server."
      );

      throw new Error(
        data.message ||
          "Seller authentication failed. Please log in again."
      );
    }

    // -------------------------------------------------
    // OTHER ERROR
    // -------------------------------------------------

    if (!response.ok || data.success === false) {
      throw new Error(
        data.message ||
          `Seller request failed (${response.status})`
      );
    }

    return data;

  } catch (error) {
    console.error(
      `❌ Seller request failed: ${endpoint}`,
      error
    );

    throw error;
  }
};

// =====================================================
// SELLER OVERVIEW
// GET /api/seller/overview
// =====================================================

export const getSellerOverview = async () => {
  return sellerRequest(
    "/api/seller/overview"
  );
};

// =====================================================
// SELLER ANALYTICS
// GET /api/seller/analytics
// =====================================================

export const getSellerAnalytics = async () => {
  return sellerRequest(
    "/api/seller/analytics"
  );
};

// =====================================================
// SELLER PRODUCTS
// GET /api/seller/products
// =====================================================

export const getSellerProducts = async () => {
  return sellerRequest(
    "/api/seller/products"
  );
};

// =====================================================
// SELLER ORDERS
// GET /api/seller/orders
// =====================================================

export const getSellerOrders = async () => {
  return sellerRequest(
    "/api/seller/orders"
  );
};

// =====================================================
// SELLER PROFILE
// GET /api/seller/profile
// =====================================================

export const getSellerProfile = async () => {
  return sellerRequest(
    "/api/seller/profile"
  );
};

// =====================================================
// EXPORT HELPERS
// =====================================================

export {
  getToken,
  getUser,
};
