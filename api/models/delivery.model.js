import mongoose from "mongoose";

// Schema for each route/location update
const locationUpdateSchema = new mongoose.Schema(
  {
    description: { type: String },
    time: { type: Date, default: Date.now, index: true },
    location: {
      lat: Number,
      lng: Number,
    },
    city: String,
    country: String,
  },
  { _id: false }
);

const deliverySchema = new mongoose.Schema(
  {
    trackingCode: { type: String, unique: true, index: true },

    sender: {
      name: String,
      email: String,
      phone: String,
      address: String,
      country: String,
    },

    receiver: {
      name: String,
      email: { type: String, index: true },
      phone: String,
      address: String,
      country: String,
    },

    goodsDescription: String, // package content
    deliveryFee: Number, // shipping fee
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
      default: "Pending",
      index: true,
    },

    // Route history (tracking updates)
    history: [locationUpdateSchema],

    // Dates (all set from frontend)
    dateSent: { type: Date, required: true }, // when package is sent
    deliveryDate: { type: Date, required: true }, // when it should arrive

    // ✅ Invoice stored in Cloudinary
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
