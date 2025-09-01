import Delivery from "../models/delivery.model.js";
import {
  cacheTracking,
  getCachedTracking,
  pushAdminLog,
} from "../services/cacheService.js";

import {
  sendTestEmail,
  sendEmail,
  sendDeliveryCreatedEmail,
  sendDeliveryConfirmationEmail,
  sendDeliveryConfirmationEmailWithPDF, // New enhanced function
} from "../services/emailService.js";

import {
  createDeliverySchema,
  updateLocationSchema,
  combinedUpdateSchema,
} from "../utils/validators.js";

import {
  generateInvoicePDF,
  uploadInvoiceToCloudinary,
} from "../services/pdfService.js";
const CACHE_TTL = process.env.REDIS_CACHE_TTL || 3600; // default 1h

// Admin: create new delivery with PDF invoice and enhanced email

export const createDelivery = async (req, res) => {
  try {
    const { error, value } = createDeliverySchema.validate(req.body);
    if (error) {
      console.warn("CreateDelivery validation failed:", {
        message: error.message,
        details: error.details,
        payload: req.body,
      });
      return res.status(400).json({
        message: error.message,
        details: error.details, // return details for client debugging (dev only)
      });
    }

    const exists = await Delivery.findOne({
      trackingCode: value.trackingCode,
    }).lean();
    if (exists)
      return res.status(409).json({ message: "Tracking code already exists" });

    const delivery = await Delivery.create(value);

    // Generate invoice PDF
    console.log("Generating invoice PDF for delivery:", delivery.trackingCode);
    const pdfBuffer = await generateInvoicePDF(delivery);

    // Upload to Cloudinary for online access
    let invoiceUrl = null;
    try {
      invoiceUrl = await uploadInvoiceToCloudinary(
        pdfBuffer,
        delivery.trackingCode
      );
      console.log("PDF uploaded to Cloudinary:", invoiceUrl);
    } catch (uploadError) {
      console.warn("Cloudinary upload failed:", uploadError.message);
      // Create fallback download URL
      const baseUrl =
        process.env.FRONTEND_URL ||
        process.env.BACKEND_URL ||
        "http://localhost:3001";
      invoiceUrl = `${baseUrl}/api/invoice/download/${delivery.trackingCode}`;
    }

    // Save invoice document
    // const invoice = await Invoice.create({
    //   delivery: delivery._id,
    //   company: "TechAgba Logistics",
    //   sender: delivery.sender,
    //   receiver: delivery.receiver,
    //   goodsDescription: delivery.items?.map((i) => i.description).join(", "),
    //   amount: delivery.deliveryFee,
    //   currency: delivery.currency,
    //   issueDate: new Date(),
    // });

    // Link invoice URL to delivery
    delivery.invoiceUrl = invoiceUrl;
    await delivery.save();

    // Admin log
    await pushAdminLog({
      type: "CREATE_DELIVERY",
      adminId: req.user?._id,
      trackingCode: delivery.trackingCode,
    });

    // Enhanced email sending with PDF attachment
    if (value.checkEmail && delivery.receiver?.email) {
      try {
        console.log(
          `Sending confirmation email with PDF attachment to ${delivery.receiver.email}`
        );

        // Use the enhanced function that sends PDF as attachment
        const emailResult = await sendDeliveryConfirmationEmailWithPDF(
          { ...delivery.toObject(), invoiceUrl },
          pdfBuffer
        );

        if (emailResult.success) {
          console.log(`Email sent successfully to ${delivery.receiver.email}`);
          console.log(
            `PDF attachment: ${emailResult.pdfAttachmentSent ? "YES" : "NO"}`
          );
          if (emailResult.fallbackUsed) {
            console.warn(
              `Fallback email used due to: ${emailResult.originalError}`
            );
          }
        }
      } catch (emailError) {
        console.error("Email failed:", emailError.message);
        // Don't fail the entire request due to email issues
      }
    }

    // Cache delivery
    await cacheTracking(delivery.trackingCode, delivery.toObject(), CACHE_TTL);

    res.status(201).json({
      id: delivery._id,
      trackingCode: delivery.trackingCode,
      invoiceUrl,
      message: "Delivery created successfully",
      emailSent: value.checkEmail && delivery.receiver?.email ? true : false,
    });
  } catch (err) {
    console.error("Create Delivery Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: edit delivery
export const editDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const doc = await Delivery.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!doc) return res.status(404).json({ message: "Delivery not found" });

    // Update cache
    await cacheTracking(doc.trackingCode, doc, CACHE_TTL);

    // Admin log
    await pushAdminLog({
      type: "EDIT_DELIVERY",
      adminId: req.user?._id,
      trackingCode: doc.trackingCode,
    });

    res.json(doc);
  } catch (err) {
    console.error("Edit Delivery Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: get delivery by ID with full information
export const getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Delivery.findById(id).lean();

    if (!doc) return res.status(404).json({ message: "Delivery not found" });

    // Admin gets full delivery information including timeline
    const deliveryWithTimeline = {
      ...doc,
      timeline: generateTimeline(doc),
    };

    res.json(deliveryWithTimeline);
  } catch (err) {
    console.error("Get Delivery by ID Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Public: get delivery by tracking code with minimal information (with Redis caching)
export const getByTrackingCode = async (req, res) => {
  try {
    const { code } = req.params;

    const cached = await getCachedTracking(code);
    if (cached) {
      // Return minimal public information from cache
      const publicInfo = {
        trackingCode: cached.trackingCode,
        status: cached.status,
        sender: {
          name: cached.sender?.name,
          country: cached.sender?.country,
        },
        receiver: {
          name: cached.receiver?.name,
          country: cached.receiver?.country,
        },
        items: cached.items?.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          weight: item.weight,
        })),
        history: cached.history,
        createdAt: cached.createdAt,
      };
      return res.json(publicInfo);
    }

    const doc = await Delivery.findOne({ trackingCode: code }).lean();

    if (!doc) return res.status(404).json({ message: "Not found" });

    // Cache full document for admin use
    await cacheTracking(code, doc, CACHE_TTL);

    // Return minimal public information
    const publicInfo = {
      trackingCode: doc.trackingCode,
      status: doc.status,
      sender: {
        name: doc.sender?.name,
        country: doc.sender?.country,
      },
      receiver: {
        name: doc.receiver?.name,
        country: doc.receiver?.country,
      },
      items: doc.items?.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        weight: item.weight,
      })),
      history: doc.history,
      createdAt: doc.createdAt,
    };

    res.json(publicInfo);
  } catch (err) {
    console.error("Get Delivery Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// NEW: Combined endpoint - get delivery by tracking code AND ID

// Admin: list deliveries with frontend-ready data structure

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

    // Include necessary fields
    const projection =
      "_id trackingCode status sender receiver items history createdAt updatedAt";

    const [rawItems, total] = await Promise.all([
      Delivery.find(q)
        .select(projection)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Delivery.countDocuments(q),
    ]);

    // Transform for frontend table
    const transformedItems = rawItems.map((delivery, index) => {
      const getOrigin = (delivery) => {
        if (delivery.history?.length) {
          const first = delivery.history.sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
          )[0];
          if (first.city && first.country)
            return `${first.city}, ${first.country}`;
        }
        return delivery.sender?.country || "N/A";
      };

      const getDestination = (delivery) => {
        if (delivery.history?.length) {
          const latest = delivery.history.sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
          )[0];
          if (latest.city && latest.country)
            return `${latest.city}, ${latest.country}`;
        }
        return delivery.receiver?.country || "N/A";
      };

      return {
        id: (page - 1) * limit + index + 1, // numeric index for table row
        _id: delivery._id.toString(), // used for action buttons
        Package: delivery.items?.[0]?.description || "Package",
        Weight: delivery.items?.[0]?.weight || 0,
        status: delivery.status || "Unknown",
        receiver: delivery.receiver?.name || "N/A",
        sender: delivery.sender?.name || "N/A",
        origin: getOrigin(delivery),
        destination: getDestination(delivery),
        trackingCode: delivery.trackingCode || "N/A",
      };
    });

    res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      items: transformedItems,
    });
  } catch (err) {
    console.error("List Deliveries Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Combined status and location update endpoint
export const updateStatusAndLocation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Invalid delivery ID" });
    }
    const { error, value } = combinedUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    // Build the update object
    const updateObj = {};
    const locationUpdate = {};

    // If status is provided, update the main status
    if (value.status) {
      updateObj.status = value.status;
    }

    // Build location update if any location data is provided
    if (
      value.description ||
      value.city ||
      value.country ||
      value.lat ||
      value.lng ||
      value.status
    ) {
      locationUpdate.description =
        value.description ||
        `Status updated to ${value.status || "current status"}`;
      locationUpdate.time = value.time ? new Date(value.time) : new Date();

      // Add updateDate and updateTime
      const now = locationUpdate.time;
      locationUpdate.updateDate = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
      locationUpdate.updateTime = now.toTimeString().slice(0, 5); // "HH:MM"

      if (value.city) locationUpdate.city = value.city;
      if (value.country) locationUpdate.country = value.country;
      if (value.lat && value.lng) {
        locationUpdate.location = {
          lat: value.lat,
          lng: value.lng,
        };
      }
      if (value.status) {
        locationUpdate.status = value.status;
      }

      updateObj.$push = { history: locationUpdate };
    }

    const doc = await Delivery.findByIdAndUpdate(id, updateObj, {
      new: true,
      runValidators: true,
    }).lean();

    if (!doc) return res.status(404).json({ message: "Delivery not found" });

    // Generate updated timeline
    const deliveryWithTimeline = {
      ...doc,
      timeline: generateTimeline(doc),
    };

    // Update cache
    await cacheTracking(doc.trackingCode, deliveryWithTimeline, CACHE_TTL);

    // Admin log
    await pushAdminLog({
      type: "COMBINED_UPDATE",
      adminId: req.user?._id,
      trackingCode: doc.trackingCode,
      status: value.status,
      location: locationUpdate,
    });

    // Enhanced email notification
    if (value.checkEmail && value.status) {
      const statusMessages = {
        Pending: "Your delivery is pending and being prepared for shipment.",
        Processing: "Your delivery is being processed at our facility.",
        Shipped: "Your delivery has been shipped and is on its way!",
        "In Transit":
          "Your delivery is currently in transit to the destination.",
        "On Hold":
          "Your delivery is temporarily on hold. We will update you soon.",
        Delivered: "Your delivery has been successfully delivered!",
      };

      const statusMessage =
        statusMessages[value.status] ||
        "Your delivery status has been updated.";
      const locationText =
        value.city && value.country
          ? `Currently at: ${value.city}, ${value.country}`
          : "";

      // Send to both receiver and sender
      const recipients = [doc.receiver?.email, doc.sender?.email].filter(
        Boolean
      );

      if (recipients.length > 0) {
        try {
          await sendEmail({
            to: recipients,
            subject: `Delivery Update: ${doc.trackingCode} is now ${value.status}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; font-size: 24px;">Delivery Update</h1>
                  <p style="margin: 8px 0 0 0; opacity: 0.9;">TechAgba Logistics</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <div style="background: #f8fafc; border: 2px solid #16a34a; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 20px; font-weight: bold; color: #16a34a; margin-bottom: 8px;">${
                      doc.trackingCode
                    }</div>
                    <div style="font-size: 16px; font-weight: bold; color: #1f2937;">Status: ${
                      value.status
                    }</div>
                    ${
                      locationText
                        ? `<div style="font-size: 14px; color: #6b7280; margin-top: 4px;">${locationText}</div>`
                        : ""
                    }
                  </div>
                  
                  <p style="font-size: 16px; line-height: 1.6; color: #374151;">${statusMessage}</p>
                  ${
                    value.description
                      ? `<p style="font-size: 14px; color: #6b7280; font-style: italic;">${value.description}</p>`
                      : ""
                  }
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="${
                      process.env.FRONTEND_URL || "http://localhost:5173"
                    }/track/${doc.trackingCode}" 
                       style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                      Track Your Package
                    </a>
                  </div>
                  
                  <p style="margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center;">
                    This is an automated message from TechAgba Logistics. Please do not reply to this email.
                  </p>
                </div>
              </div>
            `,
          });
          console.log(`Combined update email sent for ${doc.trackingCode}`);
        } catch (emailError) {
          console.error("Combined update email failed:", emailError.message);
        }
      }
    }

    res.json(deliveryWithTimeline);
  } catch (err) {
    console.error("Combined Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Updated timeline generation with icons and combined display
const generateTimelineWithIcons = (delivery) => {
  const parseDate = (dateValue) => {
    if (!dateValue) return null;
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? null : date;
  };

  const formatDate = (dateValue) => {
    const date = parseDate(dateValue);
    if (!date) return new Date().toISOString().split("T")[0];
    return date.toISOString().split("T")[0];
  };

  const formatTime = (dateValue) => {
    const date = parseDate(dateValue);
    if (!date) return "Pending";
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status icons
  const statusIcons = {
    Pending: "📦",
    Processing: "⚙️",
    Shipped: "🚚",
    "In Transit": "🛣️",
    "On Hold": "⏸️",
    Delivered: "✅",
  };

  // Base timeline structure with status mapping
  const statusTimeline = [
    {
      status: "Pending",
      title: "Package Received",
      defaultLocation: delivery.sender?.country || "Origin",
      icon: "📦",
    },
    {
      status: "Processing",
      title: "Processing",
      defaultLocation: delivery.sender?.country || "Origin",
      icon: "⚙️",
    },
    {
      status: "Shipped",
      title: "Package Shipped",
      defaultLocation: "Shipping Facility",
      icon: "🚚",
    },
    {
      status: "In Transit",
      title: "In Transit",
      defaultLocation: "Distribution Center",
      icon: "🛣️",
    },
    {
      status: "On Hold",
      title: "Package On Hold",
      defaultLocation: "Transit Hub",
      icon: "⏸️",
    },
    {
      status: "Delivered",
      title: "Delivered",
      defaultLocation: delivery.receiver?.country || "Destination",
      icon: "✅",
    },
  ];

  const currentStatusIndex = statusTimeline.findIndex(
    (item) => item.status === delivery.status
  );

  // Process history entries and combine status + location + description
  const processedHistory = [];

  if (delivery.history && delivery.history.length > 0) {
    // Sort history by time
    const sortedHistory = [...delivery.history].sort(
      (a, b) =>
        new Date(a.time || a.date).getTime() -
        new Date(b.time || b.date).getTime()
    );

    sortedHistory.forEach((entry) => {
      const entryStatus = entry.status || delivery.status;
      const icon = statusIcons[entryStatus] || "📍";

      // Combine status, description, and location
      let combinedTitle = "";

      if (entry.status) {
        combinedTitle += `${entry.status}`;
      }

      if (entry.description) {
        combinedTitle += (combinedTitle ? " - " : "") + entry.description;
      }

      if (entry.city || entry.country) {
        const location = entry.city
          ? `${entry.city}, ${entry.country || ""}`
          : entry.country;
        combinedTitle += (combinedTitle ? " - " : "") + location;
      }

      processedHistory.push({
        id: `history-${processedHistory.length + 1}`,
        title: combinedTitle || "Location Update",
        location: entry.city
          ? `${entry.city}, ${entry.country || ""}`
          : entry.country || "Unknown Location",
        date: formatDate(entry.time || entry.date),
        time: formatTime(entry.time || entry.date),
        completed: true,
        coordinates: entry.location
          ? {
              lat: entry.location.lat,
              lng: entry.location.lng,
            }
          : null,
        description: entry.description,
        status: entry.status,
        icon: icon,
      });
    });
  }

  // If no history, create default timeline
  if (processedHistory.length === 0) {
    return statusTimeline.map((statusItem, index) => ({
      id: (index + 1).toString(),
      title: `${statusItem.icon} ${statusItem.status} - ${statusItem.title}`,
      location: statusItem.defaultLocation,
      date:
        index <= currentStatusIndex
          ? new Date().toISOString().split("T")[0]
          : null,
      time:
        index <= currentStatusIndex
          ? new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Pending",
      completed: index <= currentStatusIndex,
      coordinates: null,
      description: null,
      status: statusItem.status,
      icon: statusItem.icon,
    }));
  }

  return processedHistory;
};

// Replace the old generateTimeline function with this new one
export const generateTimeline = generateTimelineWithIcons;

// // Admin: update status with enhanced email notification
// export const updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { error, value } = updateStatusSchema.validate(req.body);
//     if (error) return res.status(400).json({ message: error.message });

//     const doc = await Delivery.findByIdAndUpdate(
//       id,
//       { $set: { status: value.status } },
//       {
//         new: true,
//         projection:
//           "trackingCode status receiver.email receiver.name sender.email sender.name",
//       }
//     ).lean();

//     if (!doc) return res.status(404).json({ message: "Not found" });

//     // Update cache
//     await cacheTracking(doc.trackingCode, doc, CACHE_TTL);

//     await pushAdminLog({
//       type: "UPDATE_STATUS",
//       adminId: req.user?._id,
//       trackingCode: doc.trackingCode,
//       status: doc.status,
//     });

//     // Enhanced status update notification
//     if (value.checkEmail) {
//       const statusMessages = {
//         Pending: "Your delivery is pending and being prepared for shipment.",
//         Shipped: "Your delivery has been shipped and is on its way!",
//         "In Transit":
//           "Your delivery is currently in transit to the destination.",
//         "On Hold":
//           "Your delivery is temporarily on hold. We will update you soon.",
//         Delivered: "Your delivery has been successfully delivered!",
//       };

//       const statusMessage =
//         statusMessages[doc.status] || "Your delivery status has been updated.";

//       // Send to both receiver and sender
//       const recipients = [doc.receiver?.email, doc.sender?.email].filter(
//         Boolean
//       );

//       if (recipients.length > 0) {
//         try {
//           await sendEmail({
//             to: recipients,
//             subject: `Delivery Update: ${doc.trackingCode} is now ${doc.status}`,
//             html: `
//               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//                 <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
//                   <h1 style="margin: 0; font-size: 24px;">Delivery Status Update</h1>
//                   <p style="margin: 8px 0 0 0; opacity: 0.9;">TechAgba Logistics</p>
//                 </div>

//                 <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//                   <div style="background: #f8fafc; border: 2px solid #16a34a; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 20px;">
//                     <div style="font-size: 20px; font-weight: bold; color: #16a34a; margin-bottom: 8px;">${
//                       doc.trackingCode
//                     }</div>
//                     <div style="font-size: 16px; font-weight: bold; color: #1f2937;">Status: ${
//                       doc.status
//                     }</div>
//                   </div>

//                   <p style="font-size: 16px; line-height: 1.6; color: #374151;">${statusMessage}</p>

//                   <div style="text-align: center; margin-top: 30px;">
//                     <a href="${
//                       process.env.FRONTEND_URL || "http://localhost:5173"
//                     }/track/${doc.trackingCode}"
//                        style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
//                       Track Your Package
//                     </a>
//                   </div>

//                   <p style="margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center;">
//                     This is an automated message from TechAgba Logistics. Please do not reply to this email.
//                   </p>
//                 </div>
//               </div>
//             `,
//           });
//           console.log(`Status update email sent for ${doc.trackingCode}`);
//         } catch (emailError) {
//           console.error("Status update email failed:", emailError.message);
//         }
//       }
//     }

//     res.json(doc);
//   } catch (err) {
//     console.error("Update Status Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Admin: add location update
// export const addLocationUpdate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { error, value } = updateLocationSchema.validate(req.body);
//     if (error) return res.status(400).json({ message: error.message });

//     const update = {
//       description: value.description,
//       time: value.time ? new Date(value.time) : new Date(),
//       city: value.city,
//       country: value.country,
//       location: { lat: value.lat, lng: value.lng },
//     };

//     const doc = await Delivery.findByIdAndUpdate(
//       id,
//       { $push: { history: update } },
//       {
//         new: true,
//         projection:
//           "trackingCode history receiver.email receiver.name sender.email sender.name",
//       }
//     ).lean();

//     if (!doc) return res.status(404).json({ message: "Not found" });

//     await cacheTracking(doc.trackingCode, doc, CACHE_TTL);

//     await pushAdminLog({
//       type: "ADD_LOCATION",
//       adminId: req.user?._id,
//       trackingCode: doc.trackingCode,
//       point: update,
//     });

//     res.json(doc);
//   } catch (err) {
//     console.error("Add Location Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Admin: delete delivery
export const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    // Find delivery before deleting to get tracking code for cache cleanup
    const delivery = await Delivery.findById(id).lean();
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // Delete from database
    await Delivery.findByIdAndDelete(id);

    // TODO: Remove from cache when deleteCachedTracking is implemented
    // await deleteCachedTracking(delivery.trackingCode);

    // Log admin action
    await pushAdminLog({
      type: "DELETE_DELIVERY",
      adminId: req.user?._id,
      trackingCode: delivery.trackingCode,
    });

    // Notify recipient about deletion
    if (delivery.receiver?.email) {
      try {
        await sendEmail({
          to: delivery.receiver.email,
          subject: `Delivery ${delivery.trackingCode} has been cancelled`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Delivery Cancelled</h1>
                <p style="margin: 8px 0 0 0; opacity: 0.9;">TechAgba Logistics</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <p>Hi ${delivery.receiver.name || ""},</p>
                <p>Your delivery with tracking code <strong style="color: #dc2626;">${
                  delivery.trackingCode
                }</strong> has been cancelled and removed from our system.</p>
                <p>If you have any questions about this cancellation, please contact our support team immediately.</p>
                
                <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
                  <p style="margin: 0; color: #dc2626; font-weight: 600;">Contact Support:</p>
                  <p style="margin: 5px 0 0 0; color: #7f1d1d;">
                    Email: <a href="mailto:techagbadev@gmail.com" style="color: #dc2626;">techagbadev@gmail.com</a><br>
                    Phone: +234-801-234-5678
                  </p>
                </div>
                
                <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
                  This is an automated message from TechAgba Logistics. Please do not reply to this email.
                </p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error(
          "Deletion notification email failed:",
          emailError.message
        );
      }
    }

    res.json({
      message: "Delivery deleted successfully",
      trackingCode: delivery.trackingCode,
    });
  } catch (err) {
    console.error("Delete Delivery Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Calculate stats including package count
export const getDeliveryStats = async (req, res) => {
  try {
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Revenue this month
    const revenueThisMonthResult = await Delivery.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, revenue: { $sum: "$deliveryFee" } } },
    ]);
    const revenueThisMonth = revenueThisMonthResult[0]?.revenue || 0;

    // Revenue last month
    const revenueLastMonthResult = await Delivery.aggregate([
      {
        $match: { createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } },
      },
      { $group: { _id: null, revenue: { $sum: "$deliveryFee" } } },
    ]);
    const revenueLastMonth = revenueLastMonthResult[0]?.revenue || 0;

    let revenueTrend = 0;
    if (revenueLastMonth > 0) {
      revenueTrend =
        ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;
    }

    // Deliveries growth
    const deliveriesThisMonth = await Delivery.countDocuments({
      createdAt: { $gte: startOfMonth },
    });
    const deliveriesLastMonth = await Delivery.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    let growthRate = 0;
    if (deliveriesLastMonth > 0) {
      growthRate =
        ((deliveriesThisMonth - deliveriesLastMonth) / deliveriesLastMonth) *
        100;
    }

    // Count total deliveries
    const totalPackages = await Delivery.countDocuments();

    // Count total items (packages) this month
    const packagesThisMonthResult = await Delivery.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $unwind: "$items" },
      { $count: "total" },
    ]);

    const packagesThisMonth = packagesThisMonthResult[0]?.total || 0;

    // Count packages last month
    const packagesLastMonthResult = await Delivery.aggregate([
      {
        $match: { createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } },
      },
      { $unwind: "$items" },
      { $count: "total" },
    ]);
    const packagesLastMonth = packagesLastMonthResult[0]?.total || 0;

    let packageTrend = 0;
    if (packagesLastMonth > 0) {
      packageTrend =
        ((packagesThisMonth - packagesLastMonth) / packagesLastMonth) * 100;
    }

    res.json({
      totalRevenue: revenueThisMonth,
      revenueTrend: parseFloat(revenueTrend.toFixed(2)),
      growthRate: parseFloat(growthRate.toFixed(2)),
      totalPackages,
      packagesThisMonth,
      packageTrend: parseFloat(packageTrend.toFixed(2)),
    });
  } catch (err) {
    console.error("getDeliveryStats Error:", err);
    res.status(500).json({ message: "Failed to get delivery stats" });
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

// Enhanced test email endpoint with PDF attachment testing
export const testEmail = async (req, res) => {
  try {
    console.log("Testing email system...");

    const testEmailAddress = req.query.email || "boltdropa@gmail.com";

    const result = await sendTestEmail(testEmailAddress);

    res.json({
      message: "Test email sent successfully",
      emailSent: testEmailAddress,
      messageId: result.messageId,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Test email failed:", error);

    res.status(500).json({
      message: "Email test failed",
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      suggestion: "Check your email configuration in .env file",
      config: {
        hasEmailUser: !!process.env.EMAIL_USER || !!process.env.SMTP_USER,
        hasEmailPass: !!process.env.EMAIL_PASS || !!process.env.SMTP_PASS,
        smtpHost: process.env.SMTP_HOST || "gmail (default)",
        smtpPort: process.env.SMTP_PORT || "587 (default)",
      },
    });
  }
};

// Test PDF email functionality
export const testPDFEmail = async (req, res) => {
  try {
    const testEmail = req.query.email || "boltdropa@gmail.com";

    // Create fake delivery data for PDF email testing
    const fakeDelivery = {
      _id: "test123",
      trackingCode: `TESTPDF${Date.now()}`,
      status: "Pending",
      sender: {
        name: "TechAgba Test Sender",
        email: "techagbadev@gmail.com",
        address: "123 Test Sender Street, Victoria Island",
        city: "Lagos",
        country: "Nigeria",
        phone: "+234-801-234-5678",
      },
      receiver: {
        name: "PDF Test Receiver",
        email: testEmail,
        address: "456 Test Receiver Avenue, Central Business District",
        city: "Abuja",
        country: "Nigeria",
        phone: "+234-807-654-3210",
      },
      items: [
        {
          description: "Test PDF Email Package",
          quantity: 1,
          weight: 2.5,
          value: 35000,
        },
        {
          description: "Sample Documentation",
          quantity: 2,
          weight: 1.0,
          value: 15000,
        },
      ],
      deliveryFee: 4500,
      currency: "NGN",
      deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      createdAt: new Date(),
      invoiceUrl: null, // Will be set by the function
    };

    console.log("Generating PDF for test email...");
    const pdfBuffer = await generateInvoicePDF(fakeDelivery);

    console.log("Sending test email with PDF attachment...");
    const result = await sendDeliveryConfirmationEmailWithPDF(
      fakeDelivery,
      pdfBuffer
    );

    res.json({
      message: "Test PDF email sent successfully",
      recipient: testEmail,
      trackingCode: fakeDelivery.trackingCode,
      messageId: result.messageId,
      pdfAttachmentSent: result.pdfAttachmentSent,
      pdfSize: result.pdfSize,
      fallbackUsed: result.fallbackUsed || false,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Test PDF email failed:", error);
    res.status(500).json({
      message: "Test PDF email failed",
      error: error.message,
      success: false,
      timestamp: new Date().toISOString(),
    });
  }
};

// Alternative simple test function
export const simpleEmailTest = async (req, res) => {
  try {
    const testEmail = req.query.email || "boltdropa@gmail.com";

    await sendEmail({
      to: testEmail,
      subject: "Simple Test Email - TechAgba Logistics",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #16a34a;">Email Test Successful!</h2>
          <p>This is a simple test email sent at: <strong>${new Date().toLocaleString()}</strong></p>
          <p>Your TechAgba Logistics email system is working correctly.</p>
          
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>Recipient: ${testEmail}</li>
              <li>Sent from: ${
                process.env.EMAIL_USER || process.env.SMTP_USER || "System"
              }</li>
              <li>Environment: ${process.env.NODE_ENV || "development"}</li>
            </ul>
          </div>
        </div>
      `,
      text: `Email Test Successful! This is a simple test email sent at: ${new Date().toLocaleString()}. Your TechAgba Logistics email system is working correctly.`,
    });

    res.json({
      message: "Simple test email sent successfully",
      recipient: testEmail,
      timestamp: new Date().toISOString(),
      success: true,
    });
  } catch (error) {
    console.error("Simple email test failed:", error);
    res.status(500).json({
      message: "Simple email test failed",
      error: error.message,
      success: false,
    });
  }
};

// Bulk test to all your real emails

// Bulk test to all your real emails
export const testAllEmails = async (req, res) => {
  const testEmails = [
    "boltdropa@gmail.com",
    "edehchinedu59@gmail.com",
    "godwinchristain45@gmail.com",
  ];

  const results = [];

  try {
    console.log(
      `Starting bulk email test to ${testEmails.length} addresses...`
    );

    for (let i = 0; i < testEmails.length; i++) {
      const email = testEmails[i];
      try {
        console.log(
          `Sending test email ${i + 1}/${testEmails.length} to ${email}...`
        );

        const result = await sendTestEmail(email);
        results.push({
          email,
          success: true,
          messageId: result.messageId,
          timestamp: new Date().toISOString(),
        });
        console.log(`✅ Test email sent to ${email} (${result.messageId})`);

        // Small delay to avoid rate limiting
        if (i < testEmails.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        results.push({
          email,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
        console.error(`❌ Failed to send to ${email}:`, error.message);
      }
    }

    const successCount = results.filter((r) => r.success).length;

    res.json({
      message: `Bulk email test completed: ${successCount}/${testEmails.length} successful`,
      results,
      summary: {
        total: testEmails.length,
        successful: successCount,
        failed: testEmails.length - successCount,
        successRate: `${Math.round((successCount / testEmails.length) * 100)}%`,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Bulk email test failed:", error);
    res.status(500).json({
      message: "Bulk email test failed",
      error: error.message,
      results,
      timestamp: new Date().toISOString(),
    });
  }
};

// Test delivery email creation (with fake data)
export const testDeliveryEmail = async (req, res) => {
  try {
    const testEmail = req.query.email || "boltdropa@gmail.com";

    // Create fake delivery data for email testing
    const fakeDelivery = {
      trackingCode: `TEST${Date.now()}`,
      status: "Pending",
      sender: {
        name: "TechAgba Test Sender",
        email: "techagbadev@gmail.com",
        address: "Test Sender Address, Lagos",
        country: "Nigeria",
        phone: "+234-801-234-5678",
      },
      receiver: {
        name: "Test Receiver",
        email: testEmail,
        address: "Test Receiver Address, Abuja",
        country: "Nigeria",
        phone: "+234-807-654-3210",
      },
      items: [
        {
          description: "Test Email Package",
          quantity: 1,
          weight: 1.5,
          value: 25000,
        },
      ],
      deliveryFee: 3500,
      currency: "NGN",
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      invoiceUrl: "https://example.com/test-invoice.pdf",
    };

    const result = await sendDeliveryCreatedEmail(fakeDelivery);

    res.json({
      message: "Test delivery email sent successfully",
      recipient: testEmail,
      trackingCode: fakeDelivery.trackingCode,
      messageId: result.messageId,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Test delivery email failed:", error);
    res.status(500).json({
      message: "Test delivery email failed",
      error: error.message,
      success: false,
      timestamp: new Date().toISOString(),
    });
  }
};

export const getByTrackingCodeAndId = async (req, res) => {
  try {
    const { code } = req.params;

    // First try cache
    const cached = await getCachedTracking(code);
    if (cached) {
      // Return full delivery information with timeline for admin use
      const fullDeliveryInfo = {
        ...cached,
        timeline: generateTimeline(cached),
      };
      return res.json(fullDeliveryInfo);
    }

    // Find by tracking code
    const doc = await Delivery.findOne({ trackingCode: code }).lean();

    if (!doc) return res.status(404).json({ message: "Delivery not found" });

    // Cache full document
    await cacheTracking(code, doc, CACHE_TTL);

    // Return full delivery information with timeline
    const fullDeliveryInfo = {
      ...doc,
      timeline: generateTimeline(doc),
    };

    res.json(fullDeliveryInfo);
  } catch (err) {
    console.error("Get Delivery by Tracking Code and ID Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Enhanced getByTrackingCode with timeline
export const getByTrackingCodeWithTimeline = async (req, res) => {
  try {
    const { code } = req.params;

    const cached = await getCachedTracking(code);
    if (cached) {
      // Add timeline to cached data
      const deliveryWithTimeline = {
        ...cached,
        timeline: generateTimeline(cached),
      };
      return res.json(deliveryWithTimeline);
    }

    const doc = await Delivery.findOne({ trackingCode: code }).lean();
    if (!doc) return res.status(404).json({ message: "Not found" });

    // Generate timeline
    const deliveryWithTimeline = {
      ...doc,
      timeline: generateTimeline(doc),
    };

    await cacheTracking(code, deliveryWithTimeline, CACHE_TTL);
    res.json(deliveryWithTimeline);
  } catch (err) {
    console.error("Get Delivery Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Enhanced addLocationUpdate with timeline regeneration
export const addLocationUpdateEnhanced = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateLocationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const update = {
      description: value.description,
      time: value.time ? new Date(value.time) : new Date(),
      city: value.city,
      country: value.country,
      location: { lat: value.lat, lng: value.lng },
    };

    const doc = await Delivery.findByIdAndUpdate(
      id,
      {
        $push: { history: update },
        // Optionally update status if provided
        ...(value.status && { status: value.status }),
      },
      {
        new: true,
        projection: "trackingCode history status sender receiver",
      }
    ).lean();

    if (!doc) return res.status(404).json({ message: "Not found" });

    // Generate updated timeline
    const deliveryWithTimeline = {
      ...doc,
      timeline: generateTimeline(doc),
    };

    await cacheTracking(doc.trackingCode, deliveryWithTimeline, CACHE_TTL);

    await pushAdminLog({
      type: "ADD_LOCATION",
      adminId: req.user?._id,
      trackingCode: doc.trackingCode,
      point: update,
    });

    // Send location update email if requested
    if (value.checkEmail) {
      const recipients = [doc.receiver?.email, doc.sender?.email].filter(
        Boolean
      );

      if (recipients.length > 0) {
        try {
          await sendEmail({
            to: recipients,
            subject: `Location Update: ${doc.trackingCode}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; font-size: 24px;">📍 Location Update</h1>
                  <p style="margin: 8px 0 0 0; opacity: 0.9;">TechAgba Logistics</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <div style="background: #f8fafc; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 20px; font-weight: bold; color: #3b82f6; margin-bottom: 8px;">${
                      doc.trackingCode
                    }</div>
                    <div style="font-size: 16px; color: #1f2937;">${
                      update.description
                    }</div>
                  </div>
                  
                  <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0; font-weight: bold; color: #1e40af;">Current Location:</p>
                    <p style="margin: 5px 0 0 0; color: #374151;">
                      📍 ${
                        update.city
                          ? `${update.city}, ${update.country || ""}`
                          : "Location updating..."
                      }
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                      🕐 ${new Date(update.time).toLocaleString()}
                    </p>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="${
                      process.env.FRONTEND_URL || "http://localhost:5173"
                    }/track/${doc.trackingCode}" 
                       style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                      View Full Timeline
                    </a>
                  </div>
                  
                  <p style="margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center;">
                    This is an automated location update from TechAgba Logistics.
                  </p>
                </div>
              </div>
            `,
          });
          console.log(`Location update email sent for ${doc.trackingCode}`);
        } catch (emailError) {
          console.error("Location update email failed:", emailError.message);
        }
      }
    }

    res.json(deliveryWithTimeline);
  } catch (err) {
    console.error("Add Location Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// New endpoint: Get delivery timeline only
export const getDeliveryTimeline = async (req, res) => {
  try {
    const { code } = req.params;

    const doc = await Delivery.findOne({ trackingCode: code })
      .select("trackingCode status history sender receiver")
      .lean();

    if (!doc) return res.status(404).json({ message: "Delivery not found" });

    const timeline = generateTimeline(doc);

    res.json({
      trackingCode: doc.trackingCode,
      status: doc.status,
      timeline,
    });
  } catch (err) {
    console.error("Get Timeline Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Bulk location updates endpoint
export const addBulkLocationUpdates = async (req, res) => {
  try {
    const { id } = req.params;
    const { updates } = req.body; // Array of location updates

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: "Updates array is required" });
    }

    // Validate each update
    const validatedUpdates = [];
    for (const update of updates) {
      const { error, value } = updateLocationSchema.validate(update);
      if (error) {
        return res.status(400).json({
          message: `Invalid update: ${error.message}`,
          update,
        });
      }

      validatedUpdates.push({
        description: value.description,
        time: value.time ? new Date(value.time) : new Date(),
        city: value.city,
        country: value.country,
        location: { lat: value.lat, lng: value.lng },
      });
    }

    const doc = await Delivery.findByIdAndUpdate(
      id,
      { $push: { history: { $each: validatedUpdates } } },
      { new: true, projection: "trackingCode history status sender receiver" }
    ).lean();

    if (!doc) return res.status(404).json({ message: "Not found" });

    // Generate updated timeline
    const deliveryWithTimeline = {
      ...doc,
      timeline: generateTimeline(doc),
    };

    await cacheTracking(doc.trackingCode, deliveryWithTimeline, CACHE_TTL);

    await pushAdminLog({
      type: "BULK_LOCATION_UPDATE",
      adminId: req.user?._id,
      trackingCode: doc.trackingCode,
      updateCount: validatedUpdates.length,
    });

    res.json({
      message: `${validatedUpdates.length} location updates added successfully`,
      delivery: deliveryWithTimeline,
    });
  } catch (err) {
    console.error("Bulk Location Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get deliveries with timeline for admin dashboard
export const getDeliveriesWithTimeline = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "20", 10), 1),
      100
    );
    const status = req.query.status;
    const includeTimeline = req.query.timeline === "true";

    const q = {};
    if (status) q.status = status;

    const [rawItems, total] = await Promise.all([
      Delivery.find(q)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Delivery.countDocuments(q),
    ]);

    // Add timeline if requested
    const itemsWithTimeline = includeTimeline
      ? rawItems.map((delivery) => ({
          ...delivery,
          timeline: generateTimeline(delivery),
        }))
      : rawItems;

    res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      items: itemsWithTimeline,
    });
  } catch (err) {
    console.error("Get Deliveries with Timeline Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Other controller functions...
