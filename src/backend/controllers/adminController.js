import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// =====================================================
// ADMIN STATISTICS
// =====================================================

export const getAdminStats = async (req, res) => {
  try {
    const [
      totalCustomers,
      totalSellers,
      totalProducts,
      totalOrders,
      pendingOrders,
      revenueResult,
    ] = await Promise.all([
      // Total customers
      User.countDocuments({
        role: "customer",
      }),

      // Total sellers
      User.countDocuments({
        role: "seller",
      }),

      // Total products
      Product.countDocuments(),

      // Total orders
      Order.countDocuments(),

      // Pending orders
      Order.countDocuments({
        status: "Pending",
      }),

      // Total revenue
      Order.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].total
        : 0;

    res.json({
      success: true,

      stats: {
        totalCustomers,
        totalSellers,
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load admin statistics",
    });
  }
};

// =====================================================
// GET ALL CUSTOMERS
// =====================================================

export const getAdminCustomers = async (req, res) => {
  try {
    const customers = await User.find({
      role: "customer",
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Admin customers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load customers",
    });
  }
};

// =====================================================
// GET ALL SELLERS
// =====================================================

export const getAdminSellers = async (req, res) => {
  try {
    const sellers = await User.find({
      role: "seller",
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: sellers.length,
      sellers,
    });
  } catch (error) {
    console.error("Admin sellers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load sellers",
    });
  }
};