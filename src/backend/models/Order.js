
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Customer who placed the order
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Products purchased
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        image: {
          type: String,
          default: "",
        },
      },
    ],

    // Order pricing
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Delivery information
    deliveryOption: {
      type: String,
      enum: ["standard", "express", "home", "pickup"],
      default: "standard",
    },

    deliveryStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },

    // Order status
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    // Payment information
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "cod",
        "mtn",
        "airtel",
        "mpesa",
        "visa",
        "mastercard",
        "bank",
        "btc",
        "eth",
        "usdt_trc20",
        "usdt_erc20",
        "usdc",
      ],
      required: true,
    },

    transactionId: {
      type: String,
      default: "",
      trim: true,
    },

    paymentNetwork: {
      type: String,
      default: "",
    },

    walletAddress: {
      type: String,
      default: "",
    },

    // Shipping address
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      district: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        default: "",
      },

      deliveryNotes: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
