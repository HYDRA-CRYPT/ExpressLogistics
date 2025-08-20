import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },

    company: { type: String, default: "My Logistics Co." },

    sender: {
      name: String,
      email: String,
      phone: String,
      address: String,
      country: String,
    },

    receiver: {
      name: String,
      email: String,
      phone: String,
      address: String,
      country: String,
    },

    goodsDescription: String, // what was shipped
    amount: { type: Number, required: true }, // shipping fee or total cost
    currency: { type: String, required: true }, // frontend will send this
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date }, // optional if you want payment terms
    paid: { type: Boolean, default: false }, // track if invoice is settled
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
