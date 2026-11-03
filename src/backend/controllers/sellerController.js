
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// =====================================================
// HELPERS
// =====================================================

const getSellerProductIds = async (sellerId) => {
  const products = await Product.find({
    seller: sellerId,
  }).select("_id");

  return products.map((product) => String(product._id));
};

const productBelongsToSeller = (productId, productIds) => {
  if (!productId) return false;

  return productIds.includes(String(productId));
};

const calculateSellerOrderTotal = (order, productIds) => {
  let total = 0;
  let quantity = 0;

  const items = Array.isArray(order?.items)
    ? order.items
    : [];

  items.forEach((item) => {
    if (!productBelongsToSeller(item.product, productIds)) {
      return;
    }

    const price = Number(item.price) || 0;
    const itemQuantity = Number(item.quantity) || 0;

    total += price * itemQuantity;
    quantity += itemQuantity;
  });

  return { total, quantity };
};

const VALID_ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

// =====================================================
// SELLER DASHBOARD OVERVIEW
// =====================================================

export const getSellerOverview = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const productIds = await getSellerProductIds(sellerId);

    let orders = [];

    if (productIds.length > 0) {
      orders = await Order.find({
        "items.product": { $in: productIds },
      }).sort({ createdAt: -1 });
    }

    let totalRevenue = 0;
    let thisMonthRevenue = 0;
    let totalItemsSold = 0;

    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    orders.forEach((order) => {
      const sellerOrder = calculateSellerOrderTotal(
        order,
        productIds
      );

      totalItemsSold += sellerOrder.quantity;

      const isPaid =
        String(order.paymentStatus).toLowerCase() === "paid";

      const isCancelled = order.status === "Cancelled";

      if (isPaid && !isCancelled) {
        totalRevenue += sellerOrder.total;

        if (
          order.createdAt &&
          new Date(order.createdAt) >= startOfMonth
        ) {
          thisMonthRevenue += sellerOrder.total;
        }
      }
    });

    const customerIds = [
      ...new Set(
        orders
          .filter((order) => order.customer)
          .map((order) => String(order.customer))
      ),
    ];

    const ratingResult = await Product.aggregate([
      { $match: { seller: sellerId } },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: { $ifNull: ["$rating", 0] },
          },
          totalReviews: {
            $sum: { $ifNull: ["$reviews", 0] },
          },
        },
      },
    ]);

    const averageRating =
      ratingResult.length > 0
        ? Number(
            Number(ratingResult[0].averageRating || 0).toFixed(1)
          )
        : 0;

    const totalReviews =
      ratingResult.length > 0
        ? Number(ratingResult[0].totalReviews || 0)
        : 0;

    return res.json({
      success: true,
      seller: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar || null,
      },
      stats: {
        revenue: Number(totalRevenue.toFixed(2)),
        thisMonthRevenue: Number(thisMonthRevenue.toFixed(2)),
        products: productIds.length,
        orders: orders.length,
        customers: customerIds.length,
        itemsSold: totalItemsSold,
        rating: averageRating,
        reviews: totalReviews,
      },
    });
  } catch (error) {
    console.error("Seller overview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load seller dashboard statistics",
    });
  }
};

// =====================================================
// SELLER ANALYTICS
// =====================================================

export const getSellerAnalytics = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const productIds = await getSellerProductIds(sellerId);

    let orders = [];

    if (productIds.length > 0) {
      orders = await Order.find({
        "items.product": { $in: productIds },
      }).sort({ createdAt: 1 });
    }

    let totalSales = 0;
    let paidOrders = 0;
    let totalItemsSold = 0;

    const currentYear = new Date().getFullYear();

    const monthlySales = Array.from(
      { length: 12 },
      (_, index) => ({
        month: new Date(currentYear, index, 1).toLocaleString(
          "en-US",
          { month: "short" }
        ),
        sales: 0,
      })
    );

    orders.forEach((order) => {
      const sellerOrder = calculateSellerOrderTotal(
        order,
        productIds
      );

      const isPaid =
        String(order.paymentStatus).toLowerCase() === "paid";

      if (!isPaid || order.status === "Cancelled") {
        return;
      }

      totalSales += sellerOrder.total;
      totalItemsSold += sellerOrder.quantity;
      paidOrders += 1;

      if (order.createdAt) {
        const orderDate = new Date(order.createdAt);

        if (orderDate.getFullYear() === currentYear) {
          monthlySales[orderDate.getMonth()].sales +=
            sellerOrder.total;
        }
      }
    });

    const averageOrder =
      paidOrders > 0 ? totalSales / paidOrders : 0;

    return res.json({
      success: true,
      analytics: {
        totalSales: Number(totalSales.toFixed(2)),
        totalOrders: orders.length,
        paidOrders,
        totalItemsSold,
        averageOrder: Number(averageOrder.toFixed(2)),
        monthlySales: monthlySales.map((item) => ({
          month: item.month,
          sales: Number(item.sales.toFixed(2)),
        })),
      },
    });
  } catch (error) {
    console.error("Seller analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load seller analytics",
    });
  }
};

// =====================================================
// SELLER PRODUCTS
// =====================================================

export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user._id,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Seller products error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load seller products",
    });
  }
};

// =====================================================
// SELLER ORDERS
// Only the seller's own items and item total are returned.
// =====================================================

export const getSellerOrders = async (req, res) => {
  try {
    const productIds = await getSellerProductIds(req.user._id);

    if (productIds.length === 0) {
      return res.json({
        success: true,
        count: 0,
        orders: [],
      });
    }

    const orders = await Order.find({
      "items.product": { $in: productIds },
    })
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 });

    const sellerOrders = orders.map((order) => {
      const orderObject = order.toObject();

      const sellerItems = orderObject.items.filter((item) =>
        productBelongsToSeller(item.product, productIds)
      );

      const sellerTotal = sellerItems.reduce(
        (sum, item) =>
          sum +
          (Number(item.price) || 0) *
            (Number(item.quantity) || 0),
        0
      );

      return {
        ...orderObject,
        items: sellerItems,
        sellerTotal: Number(sellerTotal.toFixed(2)),
        fullOrderTotal: orderObject.totalAmount,
        totalAmount: Number(sellerTotal.toFixed(2)),
      };
    });

    return res.json({
      success: true,
      count: sellerOrders.length,
      orders: sellerOrders,
    });
  } catch (error) {
    console.error("Seller orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load seller orders",
    });
  }
};

// =====================================================
// UPDATE SELLER ORDER STATUS
// Only allowed when every item belongs to this seller.
// =====================================================

export const updateSellerOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!VALID_ORDER_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const productIds = await getSellerProductIds(req.user._id);

    if (productIds.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const orderItems = Array.isArray(order.items)
      ? order.items
      : [];

    const ownsAtLeastOneItem = orderItems.some((item) =>
      productBelongsToSeller(item.product, productIds)
    );

    if (!ownsAtLeastOneItem) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const ownsEveryItem = orderItems.every((item) =>
      productBelongsToSeller(item.product, productIds)
    );

    if (!ownsEveryItem) {
      return res.status(409).json({
        success: false,
        message:
          "This order contains products from multiple sellers. Its status cannot be changed from the seller dashboard yet.",
      });
    }

    order.status = status;
    await order.save();

    return res.json({
      success: true,
      message: "Order status updated successfully.",
      order: {
        id: order._id,
        status: order.status,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error) {
    console.error("Seller order status update error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status.",
    });
  }
};

// =====================================================
// DELETE SELLER ORDER
// Whole-order deletion is intentionally prohibited.
// =====================================================

export const deleteSellerOrder = async (req, res) => {
  return res.status(405).json({
    success: false,
    message:
      "Orders cannot be deleted from the seller dashboard. This protects customer records and other sellers' items.",
  });
};

// =====================================================
// SELLER PROFILE
// =====================================================

export const getSellerProfile = async (req, res) => {
  try {
    const seller = await User.findById(req.user._id).select(
      "-password"
    );

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    return res.json({
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Seller profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load seller profile",
    });
  }
};
