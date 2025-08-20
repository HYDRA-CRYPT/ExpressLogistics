import Delivery from "../models/delivery.model.js";
import {
  cacheTracking,
  getCachedTracking,
  pushAdminLog,
} from "../services/cacheService.js";
import { sendEmail } from "../services/emailService.js";
import {
  createDeliverySchema,
  updateLocationSchema,
  updateStatusSchema,
} from "../utils/validators.js";

const CACHE_TTL = process.env.REDIS_CACHE_TTL || 3600; // default 1h

// Create delivery (admin)
export const createDelivery = async (req, res) => {
  try {
    const { error, value } = createDeliverySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const exists = await Delivery.findOne({
      trackingCode: value.trackingCode,
    }).lean();
    if (exists)
      return res.status(409).json({ message: "Tracking code already exists" });

    const delivery = await Delivery.create(value);

    // Admin log
    await pushAdminLog({
      type: "CREATE_DELIVERY",
      adminId: req.user?._id,
      trackingCode: delivery.trackingCode,
    });

    // Auto email (if recipient has email)
    if (delivery.recipient?.email) {
      await sendEmail({
        to: delivery.recipient.email,
        subject: `Your package ${delivery.trackingCode} has been created`,
        html: `
          <p>Hi ${delivery.recipient.name || ""},</p>
          <p>Your delivery has been created. Tracking Code: <b>${
            delivery.trackingCode
          }</b></p>
          <p>Status: ${delivery.status}</p>
        `,
      });
    }

    // Cache delivery
    await cacheTracking(delivery.trackingCode, delivery.toObject(), CACHE_TTL);

    res
      .status(201)
      .json({ id: delivery._id, trackingCode: delivery.trackingCode });
  } catch (err) {
    console.error("Create Delivery Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Public: get delivery by tracking code (with Redis caching + projection)
export const getByTrackingCode = async (req, res) => {
  try {
    const { code } = req.params;

    const cached = await getCachedTracking(code);
    if (cached) return res.json(cached);

    const doc = await Delivery.findOne({ trackingCode: code })
      .select(
        "trackingCode status goodsDescription deliveryFee history recipient.name sender.name updatedAt"
      )
      .lean();

    if (!doc) return res.status(404).json({ message: "Not found" });

    await cacheTracking(code, doc, CACHE_TTL);
    res.json(doc);
  } catch (err) {
    console.error("Get Delivery Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: list deliveries
export const listDeliveries = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "20", 10), 1),
      100
    );
    const status = req.query.status;
    const q = {};
    if (status) q.status = status;

    const projection =
      "trackingCode status recipient.name sender.name createdAt updatedAt";
    const [items, total] = await Promise.all([
      Delivery.find(q)
        .select(projection)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Delivery.countDocuments(q),
    ]);

    res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      items,
    });
  } catch (err) {
    console.error("List Deliveries Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: update status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateStatusSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const doc = await Delivery.findByIdAndUpdate(
      id,
      { $set: { status: value.status } },
      {
        new: true,
        projection: "trackingCode status recipient.email recipient.name",
      }
    ).lean();

    if (!doc) return res.status(404).json({ message: "Not found" });

    // Update cache
    await cacheTracking(doc.trackingCode, doc, CACHE_TTL);

    await pushAdminLog({
      type: "UPDATE_STATUS",
      adminId: req.user?._id,
      trackingCode: doc.trackingCode,
      status: doc.status,
    });

    // Optional notify
    if (doc.recipient?.email) {
      await sendEmail({
        to: doc.recipient.email,
        subject: `Update: ${doc.trackingCode} is now ${doc.status}`,
        html: `<p>Hi ${doc.recipient.name || ""}, your package <b>${
          doc.trackingCode
        }</b> status is now <b>${doc.status}</b>.</p>`,
      });
    }

    res.json(doc);
  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: add location update
export const addLocationUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateLocationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const update = {
      description: value.description,
      time: value.time ? new Date(value.time) : new Date(),
      location: { lat: value.lat, lng: value.lng },
    };

    const doc = await Delivery.findByIdAndUpdate(
      id,
      { $push: { history: update } },
      {
        new: true,
        projection: "trackingCode history recipient.email recipient.name",
      }
    ).lean();

    if (!doc) return res.status(404).json({ message: "Not found" });

    await cacheTracking(doc.trackingCode, doc, CACHE_TTL);

    await pushAdminLog({
      type: "ADD_LOCATION",
      adminId: req.user?._id,
      trackingCode: doc.trackingCode,
      point: update,
    });

    res.json(doc);
  } catch (err) {
    console.error("Add Location Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: recent logs
export const getAdminLogsController = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset || "0", 10);
    const limit = parseInt(req.query.limit || "50", 10);
    const logs = await (
      await import("../services/cacheService.js")
    ).getAdminLogs({ offset, limit });
    res.json({ offset, limit, items: logs });
  } catch (err) {
    console.error("Get Admin Logs Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
