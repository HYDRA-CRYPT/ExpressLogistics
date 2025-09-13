import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = null;

function getMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_USER, EMAIL_PASS } =
    process.env;

  if (transporter) return transporter;

  const emailUser = SMTP_USER || EMAIL_USER;
  const emailPass = SMTP_PASS || EMAIL_PASS;
  const smtpHost = SMTP_HOST || "smtp.gmail.com";
  const smtpPort = SMTP_PORT || 587;

  if (!smtpHost || !emailUser || !emailPass) {
    return {
      sendMail: async (opts) => {
        console.log(
          "📧 Mock Email:",
          JSON.stringify(
            {
              from: opts.from,
              to: opts.to,
              subject: opts.subject,
              attachments: opts.attachments?.length || 0,
              timestamp: new Date().toISOString(),
            },
            null,
            2
          )
        );
        return { messageId: `mock-${Date.now()}` };
      },
      verify: async () => {
        console.log("📧 Mock transporter verified");
        return true;
      },
    };
  }

  const transportConfig = {
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  };

  if (smtpHost.includes("gmail")) {
    transportConfig.service = "gmail";
    transportConfig.tls.rejectUnauthorized = false;
  }

  transporter = nodemailer.createTransport(transportConfig);
  return transporter;
}

// Professional status configuration for logistics
const STATUS_CONFIG = {
  Pending: {
    color: "#f59e0b",
    bgColor: "#fef3c7",
    title: "Package Status: Pending - Action Needed",
    message:
      "Your package is currently in PENDING status and requires attention. Please contact our admin for specific instructions on resolving the pending status to move your package forward in the delivery process.",
    urgency: "medium",
  },
  Processing: {
    color: "#3b82f6",
    bgColor: "#dbeafe",
    title: "Your Package is Being Processed",
    message:
      "Your package is currently being processed at our facility. This status indicates that any previous holds or pending issues have been resolved, and your package is now being prepared for shipment. We expect to move your package to the next stage shortly.",
    urgency: "low",
  },
  Shipped: {
    color: "#8b5cf6",
    bgColor: "#e9d5ff",
    title: "Package Shipped - Registration Complete!",
    message:
      "Excellent news! We have completed the registration of your package and generated your official tracking code. Your shipment is now in our delivery network and will move to 'In Transit' status as it begins its journey to you.",
    urgency: "low",
  },
  "In Transit": {
    color: "#06b6d4",
    bgColor: "#cffafe",
    title: "Your Package is on the Move!",
    message:
      "Great news! Your package is currently in transit and making its way to the destination. We will keep you informed with regular updates regarding any further information about your parcel.",
    urgency: "low",
  },
  "On Hold": {
    color: "#ef4444",
    bgColor: "#fee2e2",
    title: "Package Status Update",
    message:
      "Your package is currently on hold. Please contact our admin for assistance.",
    urgency: "high",
  },
  Delivered: {
    color: "#10b981",
    bgColor: "#d1fae5",
    title: "Package Successfully Delivered!",
    message:
      "Congratulations! Your package has been successfully delivered. Thank you for choosing our delivery service! We hope you're satisfied with your delivery experience.",
    urgency: "low",
  },
};

// Professional email template generator
function generateEmailTemplate(delivery) {
  const status = delivery.status || "Pending";
  const config = STATUS_CONFIG[status];
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const trackingUrl = `${baseUrl}/track/${delivery.trackingCode}`;
  const telegramLink = "https://t.me/AegisExpressSupport";

  const isUrgent = config.urgency === "high";
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Aegis Express - Shipment Update</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #f5f7fa;
          padding: 20px;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        /* Header Styles */
        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: #ffffff;
          padding: 30px;
          text-align: center;
          position: relative;
        }
        
        .company-name {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 5px;
          letter-spacing: -0.5px;
        }
        
        .company-tagline {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 300;
        }
        
        /* Status Badge */
        .status-section {
          padding: 25px 30px;
          background: ${config.bgColor};
          border-left: 5px solid ${config.color};
          ${
            isUrgent
              ? "border: 3px solid #ef4444; animation: urgentPulse 2s ease-in-out infinite;"
              : ""
          }
        }
        
        ${
          isUrgent
            ? `
        @keyframes urgentPulse {
          0%, 100% { background: #fee2e2; }
          50% { background: #fecaca; }
        }
        `
            : ""
        }
        
        .status-badge {
          display: inline-block;
          background: ${config.color};
          color: #ffffff;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 15px;
        }
        
        .status-title {
          font-size: 20px;
          font-weight: 700;
          color: ${config.color};
          margin-bottom: 8px;
        }
        
        .status-message {
          font-size: 16px;
          color: #4a5568;
          line-height: 1.5;
        }
        
        /* Content Styles */
        .content {
          padding: 30px;
        }
        
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 20px;
        }
        
        /* Tracking Card */
        .tracking-card {
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 25px;
          text-align: center;
          margin: 25px 0;
        }
        
        .tracking-label {
          font-size: 12px;
          color: #718096;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        
        .tracking-code {
          font-size: 24px;
          font-weight: 800;
          color: #2b6cb0;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          padding: 10px;
          background: #ffffff;
          border: 2px dashed #2b6cb0;
          border-radius: 8px;
          margin: 10px 0;
        }
        
        /* Package Details Card */
        .package-details {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          margin: 25px 0;
        }
        
        .package-header {
          background: #f7fafc;
          padding: 15px 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .package-title {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
        }
        
        .package-info {
          padding: 20px;
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f7fafc;
        }
        
        .info-row:last-child {
          border-bottom: none;
        }
        
        .info-label {
          font-size: 14px;
          color: #718096;
          font-weight: 500;
        }
        
        .info-value {
          font-size: 14px;
          color: #2d3748;
          font-weight: 600;
        }
        
        /* Action Buttons */
        .action-section {
          text-align: center;
          margin: 30px 0;
        }
        
        .btn {
          display: inline-block;
          padding: 14px 28px;
          margin: 8px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          border-color: #2563eb;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }
        
        .btn-telegram {
          background: linear-gradient(135deg, #0088cc 0%, #006699 100%);
          color: #ffffff;
          border-color: #006699;
        }
        
        .btn-telegram:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 136, 204, 0.3);
        }
        
        /* Urgent Warning for On Hold */
        .urgent-warning {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          padding: 25px;
          border-radius: 10px;
          text-align: center;
          margin: 25px 0;
          animation: urgentBlink 2s ease-in-out infinite;
        }
        
        @keyframes urgentBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        
        .urgent-title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 10px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .urgent-message {
          font-size: 16px;
          margin-bottom: 20px;
        }
        
        /* Footer */
        .footer {
          background: #2d3748;
          color: #ffffff;
          padding: 30px;
          text-align: center;
        }
        
        .footer-content {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .company-info h3 {
          font-size: 18px;
          margin-bottom: 15px;
        }
        
        .contact-info {
          font-size: 14px;
          color: #a0aec0;
          line-height: 1.8;
        }
        
        .disclaimer {
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #4a5568;
          font-size: 12px;
          color: #9ca3af;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
          .email-container {
            margin: 0;
            border-radius: 0;
          }
          
          .content, .header, .footer {
            padding: 20px;
          }
          
          .tracking-code {
            font-size: 20px;
          }
          
          .btn {
            display: block;
            margin: 8px 0;
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <div class="company-name">AEGIS EXPRESS</div>
          <div class="company-tagline">Professional Logistics Solutions</div>
        </div>
        
        <!-- Status Section -->
        <div class="status-section">
          <div class="status-badge">${status.toUpperCase()}</div>
          <div class="status-title">${config.title}</div>
          <div class="status-message">${config.message}</div>
        </div>
        
        <!-- Content -->
        <div class="content">
          <div class="greeting">
            Hello ${delivery.receiver?.name || "Valued Customer"},
          </div>
          
          <!-- Tracking Card -->
          <div class="tracking-card">
            <div class="tracking-label">Tracking Number</div>
            <div class="tracking-code">${delivery.trackingCode}</div>
          </div>
          
          ${
            isUrgent
              ? `
          <!-- Urgent Warning for On Hold Status -->
          <div class="urgent-warning">
            <div class="urgent-title">⚠️ URGENT ACTION REQUIRED</div>
            <div class="urgent-message">
              Your package is currently ON HOLD and requires immediate attention. You must contact our admin immediately to resolve this issue and ensure your package continues to its destination.
            </div>
            <div style="margin: 15px 0; padding: 15px; background: rgba(255,255,255,0.2); border-radius: 8px;">
              <strong>📱 Contact Admin Now:</strong><br>
              <strong>Telegram:</strong> @AegisExpressSupport<br>
              <strong>Available:</strong> 24/7 for urgent matters<br>
              <strong>Reference:</strong> Quote your tracking number ${delivery.trackingCode}
            </div>
            <div style="font-size: 14px; margin-top: 10px;">
              <strong>⏰ Time Sensitive:</strong> Delays in contacting us may result in extended hold periods or additional fees.
            </div>
            <a href="https://t.me/AegisExpressSupport" class="btn btn-primary" style="background: #ffffff; color: #ef4444; margin-top: 15px;">
              Contact Admin Now
            </a>
          </div>
          `
              : `
          <!-- Package Details Card -->
          <div class="package-details">
            <div class="package-header">
              <div class="package-title">📋 Shipment Details</div>
            </div>
            <div class="package-info">
              <div class="info-row">
                <span class="info-label">Service Type</span>
                <span class="info-value">${
                  delivery.shipmentType || "Standard"
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Shipping Date</span>
                <span class="info-value">${
                  delivery.dateSent
                    ? new Date(delivery.dateSent).toLocaleDateString()
                    : "Processing"
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Recipient</span>
                <span class="info-value">${
                  delivery.receiver?.name || "N/A"
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Delivery Address</span>
                <span class="info-value">${
                  delivery.receiver?.city || "N/A"
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Contact Number</span>
                <span class="info-value">${
                  delivery.receiver?.phone || "N/A"
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Delivery Fee</span>
                <span class="info-value">${delivery.currency || "$"}${
                  delivery.deliveryFee || "0.00"
                }</span>
              </div>
            </div>
          </div>
          `
          }
          
          <!-- Action Buttons -->
          <div class="action-section">
            <a href="${trackingUrl}" class="btn btn-primary">
              🔍 Track Your Package
            </a>
            <a href="${telegramLink}" class="btn btn-telegram">
              📱 Contact Admin on Telegram
            </a>
          </div>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-top: 25px; text-align: center;">
            <p style="color: #4a5568; margin: 0; font-size: 14px;">
              <strong>📱 Need Help?</strong><br>
              Our admin is available 24/7 to assist you with any questions or concerns.<br>
              <strong>Telegram:</strong> @AegisExpressSupport | <strong>Email:</strong> aegisexpresslog@gmail.com<br>
              <em>For urgent matters, please contact our admin directly on Telegram.</em>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-content">
            <div class="company-info">
              <h3>Aegis Express Logistics</h3>
              <div class="contact-info">
                📍 123 Logistics Avenue, New York, NY 10001<br>
                � @AegisExpressSupport on Telegram | 📧 aegisexpresslog@gmail.com<br>
                🌐 www.aegisexpresslog.com
              </div>
            </div>
            
            <div class="disclaimer">
              This email was sent on ${currentDate}.<br>
              © ${new Date().getFullYear()} Aegis Express Logistics. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Core email sending function
export async function sendEmail({ to, subject, text, html, attachments = [] }) {
  try {
    const mailer = getMailer();
    const recipients = Array.isArray(to) ? [...new Set(to)] : [to];
    const primaryRecipient = recipients[0];

    console.log(`📧 Sending email to: ${primaryRecipient}`);

    const mailOptions = {
      from: {
        name: "Aegis Express Logistics",
        address: process.env.FROM_EMAIL || "support@aegisexpress.com",
      },
      to: primaryRecipient,
      subject,
      text,
      html,
      attachments: attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType || "application/pdf",
        contentDisposition: "attachment",
      })),
    };

    const result = await mailer.sendMail(mailOptions);
    console.log(`✅ Email sent successfully:`, result.messageId);

    return {
      success: true,
      messageId: result.messageId,
      recipient: primaryRecipient,
      subject,
    };
  } catch (error) {
    console.error(`❌ Email sending failed:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// Status-specific email functions
export async function sendStatusEmail(delivery, emailType = "status_update") {
  try {
    const recipient = delivery.receiver?.email;
    if (!recipient) {
      throw new Error("Receiver email is required");
    }

    const status = delivery.status || "Pending";
    const config = STATUS_CONFIG[status];
    const emailTemplate = generateEmailTemplate(delivery);

    // Generate subject based on status
    const subjects = {
      Pending: `⏸️ Package Status: Pending - Action Needed - ${delivery.trackingCode}`,
      Processing: `⏳ Your Package is Being Processed - ${delivery.trackingCode}`,
      Shipped: `🚚 Package Shipped - Registration Complete! - ${delivery.trackingCode}`,
      "In Transit": `📦 Your Package is on the Move! - ${delivery.trackingCode}`,
      "On Hold": `⚠️ URGENT: Action Required for Your Package - ${delivery.trackingCode}`,
      Delivered: `✅ Package Successfully Delivered! - ${delivery.trackingCode}`,
    };

    const subject =
      subjects[status] || `Shipment Update - ${delivery.trackingCode}`;

    return await sendEmail({
      to: recipient,
      subject: `${subject} | Aegis Express`,
      text: `Your shipment ${delivery.trackingCode} status: ${status}. ${config.message} Track at: ${process.env.FRONTEND_URL}/track/${delivery.trackingCode} | Contact support: @AegisExpressSupport on Telegram`,
      html: emailTemplate,
    });
  } catch (error) {
    console.error("❌ Error sending status email:", error);
    throw error;
  }
}

// Delivery confirmation email with PDF support
export async function sendDeliveryConfirmationEmailWithPDF(
  delivery,
  pdfBuffer
) {
  try {
    const result = await sendStatusEmail(delivery, "confirmation");

    if (pdfBuffer) {
      const attachments = [
        {
          filename: `Invoice_${delivery.trackingCode}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ];

      return await sendEmail({
        to: delivery.receiver?.email,
        subject: `Invoice & Confirmation - ${delivery.trackingCode} | Aegis Express`,
        text: `Your delivery ${delivery.trackingCode} confirmation with invoice attached.`,
        html: generateEmailTemplate(delivery),
        attachments,
      });
    }

    return result;
  } catch (error) {
    console.error("❌ Error sending delivery confirmation with PDF:", error);
    throw error;
  }
}

// Convenience functions that use the main status email function
export const sendDeliveryCreatedEmail = async (delivery) => {
  return await sendStatusEmail(delivery, "created");
};

export const sendDeliveryConfirmationEmail = async (delivery) => {
  return await sendStatusEmail(delivery, "confirmation");
};

export const sendStatusUpdateEmail = async (delivery, newStatus) => {
  const updatedDelivery = { ...delivery, status: newStatus };
  return await sendStatusEmail(updatedDelivery, "status_update");
};

export const sendLocationUpdateEmail = async (delivery, locationUpdate) => {
  return await sendStatusEmail(delivery, "location_update");
};

// Deletion notification email
// TODO: Re-enable when needed later
/* 
export const sendDeliveryDeletionEmail = async (delivery) => {
  try {
    const recipient = delivery.receiver?.email;
    if (!recipient) {
      return { success: false, reason: "No receiver email" };
    }

    const deletionTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; }
          .header { background: #ef4444; color: #fff; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .tracking-code { background: #fee2e2; border: 2px solid #ef4444; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Shipment Cancelled</h1>
            <p>Aegis Express Logistics</p>
          </div>
          <div class="content">
            <h2>Hello ${delivery.receiver?.name || "Valued Customer"},</h2>
            <p>Your shipment has been cancelled.</p>
            <div class="tracking-code">
              <h3>Cancelled Tracking Code</h3>
              <h2 style="color: #ef4444;">${delivery.trackingCode}</h2>
            </div>
            <p>If you have questions, please contact our support team.</p>
            <p>📧 support@aegisexpress.com | � @AegisExpressSupport on Telegram</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await sendEmail({
      to: recipient,
      subject: `Shipment Cancelled - ${delivery.trackingCode} | Aegis Express`,
      text: `Your shipment ${delivery.trackingCode} has been cancelled.`,
      html: deletionTemplate,
    });
  } catch (error) {
    console.error("❌ Error sending deletion email:", error);
    throw error;
  }
};
*/

// Test email function
export const sendTestEmail = async (testEmailAddress = "test@example.com") => {
  try {
    const testDelivery = {
      trackingCode: "TEST" + Date.now().toString().slice(-6),
      receiver: {
        name: "Test Customer",
        email: testEmailAddress,
        city: "Lagos",
      },
      shipmentType: "Express Test",
      status: "Processing",
      dateSent: new Date(),
      deliveryFee: 2500,
      currency: "₦",
    };

    return await sendStatusEmail(testDelivery, "test");
  } catch (error) {
    console.error("❌ Error sending test email:", error);
    throw error;
  }
};

export default {
  sendEmail,
  sendStatusEmail,
  sendDeliveryCreatedEmail,
  sendDeliveryConfirmationEmail,
  sendDeliveryConfirmationEmailWithPDF,
  sendStatusUpdateEmail,
  sendLocationUpdateEmail,
  // sendDeliveryDeletionEmail, // Commented out - will re-enable later
  sendTestEmail,
};
