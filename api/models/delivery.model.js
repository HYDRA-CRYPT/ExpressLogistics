import mongoose from "mongoose";

const locationUpdateSchema = new mongoose.Schema(
  {
    description: { type: String },
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "In Transit",
        "On Hold",
        "Delivered",
      ],
      required: false,
    },
    time: { type: Date, default: Date.now, index: true },
    // Optional: Add explicit date/time fields for better frontend control
    updateDate: { type: String }, // e.g., "2024-01-15"
    updateTime: { type: String }, // e.g., "14:30"
    location: {
      lat: Number,
      lng: Number,
    },
    city: String,
    country: String,
  },
  { _id: false }
);

const itemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  weight: Number,
  value: Number,
});

const deliverySchema = new mongoose.Schema(
  {
    trackingCode: { type: String, unique: true, index: true },

    sender: {
      name: String,
      email: String,
      phone: String,
      address: String,
      country: String,
      city: String,
    },

    receiver: {
      name: String,
      email: { type: String, index: true },
      phone: String,
      address: String,
      country: String,
      city: String,
    },

    shipmentType: {
      type: String,
      enum: ["Document", "Parcel", "Freight", "Other"],
      default: "Parcel",
    },

    items: [itemSchema],
    deliveryFee: Number,
    currency: String,
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "In Transit",
        "On Hold",
        "Delivered",
      ],
      required: true, // Make it required so admin must choose
      index: true,
    },

    history: [locationUpdateSchema],

    dateSent: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    checkEmail: { type: Boolean, default: false },
    invoiceUrl: { type: String },
  },
  { timestamps: true }
);

// Compound index for admin queries (status + recent first)
deliverySchema.index({ status: 1, createdAt: -1 });

// ✅ Pre-save hook to generate 10-digit tracking code
deliverySchema.pre("validate", async function (next) {
  if (!this.trackingCode) {
    // Generate 10-digit random number
    const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
    this.trackingCode = `AGL${randomNum}`;
  }
  next();
});

export default mongoose.model("Delivery", deliverySchema);
