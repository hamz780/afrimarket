import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// =====================================================
// PAYMENT CONFIGURATION
// =====================================================

const cryptoWallets = {
  btc: {
    network: "Bitcoin Network",
    address: "156PgjypkidoYsg7B4TyTveAtfveLVaYUt",
  },
  eth: {
    network: "Ethereum Network (ERC20)",
    address: "0xf76a09c736e26973d61bc285cbd1feb2fb67f332",
  },
  usdt_trc20: {
    network: "Tron Network (TRC20)",
    address: "TM6Pq2iVPSGAukkoNqKm7nzbQr99oSskYk",
  },
  usdt_erc20: {
    network: "Ethereum Network (ERC20)",
    address: "0xf76a09c736e26973d61bc285cbd1feb2fb67f332",
  },
};

// Only these methods are currently accepted.
// MTN and Airtel will be enabled after their payment
// integration and business payment details are configured.
const acceptedPaymentMethods = [
  "cod",
  "btc",
  "eth",
  "usdt_trc20",
  "usdt_erc20",
];

// All delivery fees are in UGX.
const deliveryOptions = {
  standard: { name: "Standard Delivery", fee: 7000 },
  express: { name: "Express Delivery", fee: 15000 },
  home: { name: "Home Delivery", fee: 10000 },
  pickup: { name: "Pickup Station", fee: 0 },
};

// Demo coupons. Frontend and backend definitions must match.
const promoCodes = {
  AFRI10: { type: "percentage", value: 10 },
  WELCOME5: { type: "percentage", value: 5 },
  AFRI5000: { type: "fixed", value: 5000 },
};

// Existing checkout tax rate retained for now.
const TAX_RATE = 0.05;

// =====================================================
// CREATE ORDER
// =====================================================

export const createOrder = async (req, res) => {
  const updatedProducts = [];

  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      deliveryOption = "standard",
      transactionId = "",
      promoCode = "",
    } = req.body;

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Please log in to place an order.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your order must contain at least one product.",
      });
    }

    // Validate shipping information.
    const requiredAddressFields = [
      "fullName",
      "address",
      "city",
      "country",
      "phone",
    ];

    for (const field of requiredAddressFields) {
      if (
        typeof shippingAddress?.[field] !== "string" ||
        !shippingAddress[field].trim()
      ) {
        return res.status(400).json({
          success: false,
          message: `Please provide your shipping ${field}.`,
        });
      }
    }

    // Validate payment method.
    if (!acceptedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "This payment method is not currently available.",
      });
    }

    // Validate delivery option.
    const selectedDelivery = deliveryOptions[deliveryOption];

    if (!selectedDelivery) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid delivery option.",
      });
    }

    // Validate transaction reference.
    if (
      typeof transactionId !== "string" ||
      transactionId.length > 200
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction reference.",
      });
    }

    const cryptoWallet = cryptoWallets[paymentMethod];

    if (cryptoWallet && !transactionId.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide your cryptocurrency transaction ID.",
      });
    }

    // Validate promo code.
    if (
      typeof promoCode !== "string" ||
      promoCode.trim().length > 40
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid promo code.",
      });
    }

    const normalizedPromoCode = promoCode.trim().toUpperCase();

    // Combine duplicate products and validate quantities.
    const quantities = new Map();

    for (const item of items) {
      const productId = item.product || item.productId;
      const quantity = Number(item.quantity);

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: "An order contains an invalid product ID.",
        });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Product quantities must be positive whole numbers.",
        });
      }

      const id = productId.toString();

      quantities.set(
        id,
        (quantities.get(id) || 0) + quantity
      );
    }

    const productIds = [...quantities.keys()];

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== productIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more products could not be found.",
      });
    }

    // Calculate subtotal using trusted database prices.
    const orderItems = [];
    let subtotal = 0;

    for (const product of products) {
      const quantity = quantities.get(product._id.toString());

      if (product.stock < quantity) {
        return res.status(409).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}.`,
        });
      }

      const price = Number(product.price);

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid price for ${product.name}.`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity,
        price,
        image: product.image || "",
      });

      subtotal += price * quantity;
    }

    // UGX is calculated in whole shillings.
    subtotal = Math.round(subtotal);

    // Calculate coupon discount.
    let discount = 0;

    if (normalizedPromoCode) {
      const coupon = promoCodes[normalizedPromoCode];

      if (!coupon) {
        return res.status(400).json({
          success: false,
          message: "This promo code is invalid.",
        });
      }

      if (coupon.type === "percentage") {
        discount = subtotal * (coupon.value / 100);
      } else if (coupon.type === "fixed") {
        discount = coupon.value;
      }

      discount = Math.min(discount, subtotal);
      discount = Math.round(discount);
    }

    // Calculate tax and delivery.
    const tax = Math.round(subtotal * TAX_RATE);
    const deliveryFee = selectedDelivery.fee;

    const totalAmount = Math.max(
      0,
      subtotal + tax + deliveryFee - discount
    );

    // Reserve stock using atomic updates.
    for (const item of orderItems) {
      const result = await Product.updateOne(
        {
          _id: item.product,
          stock: { $gte: item.quantity },
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );

      if (result.modifiedCount !== 1) {
        throw new Error(
          `Stock changed while placing your order for ${item.name}. Please try again.`
        );
      }

      updatedProducts.push(item);
    }

    // Save order.
    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,

      subtotal,
      tax,
      deliveryFee,
      promoCode: normalizedPromoCode,
      discount,
      totalAmount,

      deliveryOption,
      deliveryStatus: "Pending",
      status: "Pending",
      paymentStatus: "Pending",
      paymentMethod,

      transactionId: cryptoWallet
        ? transactionId.trim()
        : "",

      paymentNetwork: cryptoWallet
        ? cryptoWallet.network
        : "",

      walletAddress: cryptoWallet
        ? cryptoWallet.address
        : "",

      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        district: shippingAddress.district?.trim() || "",
        country: shippingAddress.country.trim(),
        phone: shippingAddress.phone.trim(),
        postalCode: shippingAddress.postalCode?.trim() || "",
        deliveryNotes: shippingAddress.deliveryNotes?.trim() || "",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your order has been placed successfully.",
      order,
    });

  } catch (error) {
    // Restore reserved stock if order creation fails.
    for (const item of updatedProducts) {
      try {
        await Product.updateOne(
          { _id: item.product },
          {
            $inc: {
              stock: item.quantity,
            },
          }
        );
      } catch (rollbackError) {
        console.error(
          "Stock restoration failed:",
          rollbackError
        );
      }
    }

    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to place your order.",
    });
  }
};

// =====================================================
// GET CUSTOMER ORDERS
// =====================================================

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get customer orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve your orders.",
    });
  }
};

// =====================================================
// GET SINGLE CUSTOMER ORDER
// =====================================================

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      customer: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve this order.",
    });
  }
};

// =====================================================
// CANCEL CUSTOMER ORDER
// =====================================================

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    // Atomically cancel only a pending, unpaid order.
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        customer: req.user._id,
        status: "Pending",
        paymentStatus: { $ne: "Paid" },
      },
      {
        $set: {
          status: "Cancelled",
        },
      },
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "This order cannot be cancelled. It may already be paid or processed.",
      });
    }

    // Restore stock after successful cancellation.
    for (const item of order.items) {
      await Product.updateOne(
        { _id: item.product },
        {
          $inc: {
            stock: item.quantity,
          },
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Your order has been cancelled.",
      order,
    });

  } catch (error) {
    console.error("Cancel order error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to cancel this order.",
    });
  }
};