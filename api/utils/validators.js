import Joi from "joi";

export const createDeliverySchema = Joi.object({
  trackingCode: Joi.string().trim().min(4).max(64),

  sender: Joi.object({
    name: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    phone: Joi.string().allow(""),
    address: Joi.string().allow(""),
    country: Joi.string().allow(""),
  }).required(),

  receiver: Joi.object({
    name: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    phone: Joi.string().allow(""),
    address: Joi.string().allow(""),
    country: Joi.string().allow(""),
  }).required(),

  goodsDescription: Joi.string().allow(""),
  deliveryFee: Joi.number().min(0).default(0),
  currency: Joi.string().default("USD"),

  // ✅ Added fields for frontend-provided dates
  dateSent: Joi.date().required(),
  deliveryDate: Joi.date().required(),

  status: Joi.string()
    .valid(
      "Pending",
      "Processing",
      "Shipped",
      "In Transit",
      "On Hold",
      "Delivered"
    )
    .default("Pending"),
});

export const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid(
      "Pending",
      "Processing",
      "Shipped",
      "In Transit",
      "On Hold",
      "Delivered"
    )
    .required(),
});

export const updateLocationSchema = Joi.object({
  description: Joi.string().allow(""),
  time: Joi.date().optional(),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
  city: Joi.string().allow(""),
  country: Joi.string().allow(""),
});
