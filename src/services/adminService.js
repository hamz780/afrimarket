
const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// ==============================
// ADMIN STATISTICS
// ==============================

export const getAdminStats = async () => {
  const response = await fetch(`${API_URL}/api/admin/stats`);

  if (!response.ok) {
    throw new Error("Failed to load admin statistics");
  }

  const data = await response.json();

  return data.stats;
};

// ==============================
// ADMIN CUSTOMERS
// ==============================

export const getAdminUsers = async () => {
  const response = await fetch(`${API_URL}/api/admin/users`);

  if (!response.ok) {
    throw new Error("Failed to load admin customers");
  }

  const data = await response.json();

  return data.customers || [];
};
