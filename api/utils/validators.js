import Joi from "joi";

export const createDeliverySchema = Joi.object({
  trackingCode: Joi.string().trim().min(4).max(64),

  sender: Joi.object({
    name: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    phone: Joi.string().allow(""),
    address: Joi.string().allow(""),
    country: Joi.string().allow(""),
    city: Joi.string().allow(""),
  }).required(),

  receiver: Joi.object({
    name: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    phone: Joi.string().allow(""),
    address: Joi.string().allow(""),
    country: Joi.string().allow(""),
    city: Joi.string().allow(""),
  }).required(),

  // ✅ Added items validation
  items: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().allow(""),
        quantity: Joi.number().min(0).default(1),
        weight: Joi.number().min(0).default(0),
        value: Joi.number().min(0).default(0),
      })
    )
    .min(1)
    .required(), // At least 1 item required

  goodsDescription: Joi.string().allow(""),
  deliveryFee: Joi.number().min(0).default(0),
  currency: Joi.string().default("USD"),

  // ✅ Added fields for frontend-provided dates
  checkEmail: Joi.boolean().default(false),
  dateSent: Joi.date().required(),
  deliveryDate: Joi.date().required(),
  invoiceUrl: Joi.string().allow(""),

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

export const combinedUpdateSchema = Joi.object({
  status: Joi.string()
    .valid(
      "Pending",
      "Processing",
      "Shipped",
      "In Transit",
      "On Hold",
      "Delivered"
    )
    .optional(),
  description: Joi.string().optional(),
  time: Joi.date().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
  checkEmail: Joi.boolean().optional().default(false),
});
