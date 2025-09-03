import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = null;

function getMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_USER, EMAIL_PASS } =
    process.env;

  if (transporter) return transporter;

  // Support both naming conventions for environment variables
  const emailUser = SMTP_USER || EMAIL_USER;
  const emailPass = SMTP_PASS || EMAIL_PASS;

  const smtpHost = SMTP_HOST || "smtp.gmail.com";
  const smtpPort = SMTP_PORT || 587;

  if (!smtpHost || !emailUser || !emailPass) {
    // Dev-friendly mock (logs emails instead of sending)
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

  // Real transporter configuration
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

  // Gmail-specific optimizations
  if (smtpHost.includes("gmail")) {
    transportConfig.service = "gmail";
    transportConfig.tls.rejectUnauthorized = false;
  }

  transporter = nodemailer.createTransport(transportConfig);

  return transporter;
}

// Enhanced status configuration with colors and professional messages
const STATUS_CONFIG = {
  Pending: {
    icon: "⏳",
    color: "#f59e0b",
    bgColor: "#fef3c7",
    lightBg: "#fffbeb",
    title: "Order Received",
    message:
      "Your package has been received and is being prepared for processing. Our team will begin handling your shipment shortly.",
    actionText: "Package preparation in progress",
    showFullDetails: false,
  },
  Processing: {
    icon: "⚙️",
    color: "#3b82f6",
    bgColor: "#dbeafe",
    lightBg: "#eff6ff",
    title: "Shipment Registration Required",
    message:
      "To complete your shipping registration and process your package, please provide your phone number and tracking code via our official Telegram channel.",
    actionText: "Registration pending - Action required",
    showFullDetails: false,
    telegramRequired: true,
    urgent: false,
  },
  Shipped: {
    icon: "🚚",
    color: "#8b5cf6",
    bgColor: "#e9d5ff",
    lightBg: "#f5f3ff",
    title: "Package Shipped",
    message:
      "Great news! Your package has been shipped and is now on its way to the destination. You can track its progress in real-time.",
    actionText: "In transit to destination",
    showFullDetails: true,
  },
  "In Transit": {
    icon: "✈️",
    color: "#06b6d4",
    bgColor: "#cffafe",
    lightBg: "#ecfeff",
    title: "Package In Transit",
    message:
      "Your package is currently traveling to its destination. It's moving through our logistics network and making good progress.",
    actionText: "Moving through transit network",
    showFullDetails: true,
  },
  "On Hold": {
    icon: "⚠️",
    color: "#ef4444",
    bgColor: "#fee2e2",
    lightBg: "#fef2f2",
    title: "URGENT: Package On Hold",
    message:
      "Your parcel is currently on Hold. Please contact support immediately to resolve this issue and continue delivery.",
    actionText: "IMMEDIATE ACTION REQUIRED",
    showFullDetails: false,
    urgent: true,
    emergencyContact: true,
  },
  Delivered: {
    icon: "✅",
    color: "#10b981",
    bgColor: "#d1fae5",
    lightBg: "#ecfdf5",
    title: "Successfully Delivered",
    message:
      "Excellent! Your package has been successfully delivered to the destination address. Thank you for choosing Aegis Express Logistics!",
    actionText: "Delivery completed successfully",
    showFullDetails: true,
  },
};

// Professional email template generator with status-based content
function generateDeliveryEmailTemplate(
  delivery,
  invoiceUrl = null,
  hasPdfAttachment = false
) {
  const statusConfig = STATUS_CONFIG[delivery.status] || STATUS_CONFIG.Pending;
  const showFullDetails = statusConfig.showFullDetails !== false;
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // For Processing status and On Hold, don't show tracking URL or invoice
  const shouldShowTracking = showFullDetails && !statusConfig.telegramRequired;
  const shouldShowInvoice = showFullDetails && !statusConfig.telegramRequired;

  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const trackingUrl = shouldShowTracking
    ? `${baseUrl}/track/${delivery.trackingCode}`
    : null;
  const finalInvoiceUrl =
    shouldShowInvoice && invoiceUrl
      ? invoiceUrl
      : shouldShowInvoice
      ? `${baseUrl}/track/${delivery.trackingCode}/invoice`
      : null;

  // Telegram contact information
  const telegramLink = "https://t.me/AegisExpressSupport"; // Replace with actual Telegram link

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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        
        .email-container {
          max-width: 700px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          position: relative;
        }
        
        .header {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: #ffffff;
          padding: 40px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="50" r="0.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          animation: float 20s ease-in-out infinite;
          z-index: 1;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(180deg); }
        }
        
        .logo-section {
          position: relative;
          z-index: 2;
          margin-bottom: 20px;
        }
        
        .company-name {
          font-size: 42px;
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 8px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .company-tagline {
          font-size: 16px;
          opacity: 0.9;
          font-weight: 300;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .status-badge {
          display: inline-block;
          background: ${statusConfig.color};
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 2;
          ${
            statusConfig.urgent
              ? "animation: urgentPulse 1.5s ease-in-out infinite;"
              : ""
          }
        }
        
        ${
          statusConfig.urgent
            ? `
        @keyframes urgentPulse {
          0%, 100% { 
            background: ${statusConfig.color}; 
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 0 0 ${statusConfig.color}; 
          }
          50% { 
            background: #dc2626; 
            box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4), 0 0 0 10px rgba(220, 38, 38, 0.2); 
          }
        }
        `
            : ""
        }
        
        .content {
          padding: 50px 40px;
          background: #ffffff;
        }
        
        .greeting {
          font-size: 24px;
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .tracking-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 30px;
          margin: 30px 0;
          border-left: 5px solid #2563eb;
          position: relative;
          overflow: hidden;
        }
        
        .tracking-section::before {
          content: '📦';
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 40px;
          opacity: 0.1;
        }
        
        .tracking-code {
          font-size: 28px;
          font-weight: 700;
          color: #1e40af;
          text-align: center;
          margin-bottom: 15px;
          letter-spacing: 2px;
          background: linear-gradient(45deg, #2563eb, #1e40af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .tracking-label {
          text-align: center;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .shipment-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 25px;
          margin: 40px 0;
        }
        
        .detail-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .detail-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: #2563eb;
        }
        
        .detail-icon {
          font-size: 24px;
          margin-bottom: 10px;
          display: block;
        }
        
        .detail-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        
        .detail-value {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }
        
        .message-section {
          background: ${statusConfig.lightBg};
          border: 1px solid ${statusConfig.bgColor};
          border-radius: 16px;
          padding: 30px;
          margin: 30px 0;
          text-align: center;
        }
        
        .telegram-section {
          background: linear-gradient(135deg, #0088cc 0%, #006699 100%);
          border-radius: 16px;
          padding: 30px;
          margin: 30px 0;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .telegram-section::before {
          content: '✈️';
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 40px;
          opacity: 0.2;
        }
        
        .telegram-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 15px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .telegram-message {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 25px;
          opacity: 0.95;
        }
        
        .telegram-button {
          display: inline-block;
          background: #ffffff;
          color: #0088cc;
          padding: 15px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .telegram-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          background: #f0f9ff;
        }
        
        .urgent-warning {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: 3px solid #b91c1c;
          border-radius: 16px;
          padding: 25px;
          margin: 30px 0;
          text-align: center;
          color: white;
          animation: urgentBlink 2s ease-in-out infinite;
        }
        
        @keyframes urgentBlink {
          0%, 100% { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
          50% { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        }
        
        .urgent-title {
          font-size: 24px;
          font-weight: 900;
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .contact-support-btn {
          display: inline-block;
          background: #ffffff;
          color: #ef4444;
          padding: 15px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          margin-top: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .contact-support-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }
        
        .status-icon {
          font-size: 60px;
          margin-bottom: 20px;
          display: block;
          animation: ${
            statusConfig.urgent
              ? "urgentPulse 1.5s ease-in-out infinite"
              : "pulse 2s ease-in-out infinite"
          };
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .status-title {
          font-size: 24px;
          font-weight: 700;
          color: ${statusConfig.color};
          margin-bottom: 15px;
          ${
            statusConfig.urgent
              ? "text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);"
              : ""
          }
        }
        
        .status-message {
          font-size: 16px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .action-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin: 40px 0;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 18px 36px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.5px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-width: 200px;
          text-align: center;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          text-transform: uppercase;
          border: 2px solid transparent;
        }
        
        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s ease;
        }
        
        .btn:hover::before {
          left: 100%;
        }
        
        .btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        
        .btn:hover::after {
          width: 300px;
          height: 300px;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: #ffffff;
          border-color: #1e40af;
        }
        
        .btn-primary:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 40px rgba(37, 99, 235, 0.4);
          background: linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%);
          border-color: #1e3a8a;
        }
        
        .btn-primary:active {
          transform: translateY(-2px) scale(1.01);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border-color: #059669;
        }
        
        .btn-secondary:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
          border-color: #065f46;
        }
        
        .btn-secondary:active {
          transform: translateY(-2px) scale(1.01);
        }
        
        .btn-icon {
          margin-right: 10px;
          font-size: 20px;
          position: relative;
          z-index: 2;
          transition: transform 0.3s ease;
        }
        
        .btn:hover .btn-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .btn-text {
          position: relative;
          z-index: 2;
          font-weight: 700;
        }
        
        .invoice-section {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
          border-radius: 16px;
          padding: 25px;
          margin: 30px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .invoice-section::before {
          content: '📄';
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 30px;
          opacity: 0.3;
        }
        
        .invoice-title {
          font-size: 18px;
          font-weight: 600;
          color: #92400e;
          margin-bottom: 15px;
        }
        
        .help-section {
          text-align: center;
          margin-top: 40px;
          padding: 30px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          border: 1px solid #cbd5e1;
        }
        
        .help-title {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 15px;
        }
        
        .help-text {
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }
        
        .footer {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 50px 30px;
          text-align: center;
        }
        
        .footer-content {
          max-width: 500px;
          margin: 0 auto;
        }
        
        .company-info {
          margin-bottom: 30px;
        }
        
        .company-info h3 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 15px;
          color: #ffffff;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .contact-info {
          font-size: 14px;
          color: #cbd5e1;
          line-height: 1.8;
        }
        
        .social-links {
          margin-top: 30px;
        }
        
        .social-link {
          display: inline-block;
          margin: 0 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .social-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px) scale(1.1);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .disclaimer {
          margin-top: 40px;
          padding-top: 25px;
          border-top: 1px solid #374151;
          font-size: 12px;
          color: #9ca3af;
          line-height: 1.6;
        }
        
        @media (max-width: 600px) {
          .email-container {
            margin: 10px;
            border-radius: 15px;
          }
          
          .header {
            padding: 30px 20px;
          }
          
          .company-name {
            font-size: 32px;
          }
          
          .content {
            padding: 30px 20px;
          }
          
          .tracking-section {
            padding: 20px;
          }
          
          .tracking-code {
            font-size: 22px;
          }
          
          .shipment-details {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .action-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
            padding: 16px 24px;
          }
          
          .footer {
            padding: 30px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header Section -->
        <div class="header">
          <div class="logo-section">
            <div class="company-name">AEGIS EXPRESS</div>
            <div class="company-tagline">Premium Logistics Solutions</div>
          </div>
          <div class="status-badge">
            ${statusConfig.icon} ${delivery.status.toUpperCase()}
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
          <div class="greeting">
            Hello ${delivery.receiver?.name || "Valued Customer"}! 👋
          </div>
          
          <!-- Tracking Section -->
          <div class="tracking-section">
            <div class="tracking-label">Your Tracking Code</div>
            <div class="tracking-code">${delivery.trackingCode}</div>
            ${
              statusConfig.telegramRequired
                ? `
            <p style="color: #64748b; font-size: 14px; margin-top: 10px; font-weight: 500;">
              Save this code - you'll need it for Telegram registration
            </p>
            `
                : ""
            }
          </div>
          
          ${
            statusConfig.telegramRequired
              ? `
          <!-- Telegram Registration Section -->
          <div class="telegram-section">
            <div class="telegram-title">📱 Complete Your Registration</div>
            <div class="telegram-message">
              To process your shipment, please contact our Telegram support with:<br>
              <strong>1. Your phone number</strong><br>
              <strong>2. Your tracking code: ${delivery.trackingCode}</strong>
            </div>
            <a href="${telegramLink}" class="telegram-button">
              📞 Contact via Telegram
            </a>
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.2); border-radius: 10px; border: 1px solid rgba(255,255,255,0.3);">
              <p style="font-size: 16px; font-weight: 600; margin-bottom: 10px; color: #ffffff;">
                📝 Message Format:
              </p>
              <p style="font-size: 14px; font-family: 'Courier New', monospace; background: rgba(255,255,255,0.9); color: #0088cc; padding: 10px; border-radius: 5px; margin: 0; word-break: break-all;">
                "UPDATE TRACKING DETAILS ${delivery.trackingCode} [Your Phone Number]"
              </p>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            statusConfig.urgent
              ? `
          <!-- Urgent Warning Section -->
          <div class="urgent-warning">
            <div class="urgent-title">⚠️ URGENT ACTION REQUIRED ⚠️</div>
            <div style="font-size: 18px; margin-bottom: 10px;">
              Your parcel is currently on Hold
            </div>
            <div style="font-size: 16px; margin-bottom: 20px;">
              Please contact support immediately to resolve this issue
            </div>
            <a href="mailto:support@aegisexpress.com" class="contact-support-btn">
              📞 Contact Support Now
            </a>
          </div>
          `
              : ""
          }
          
          <!-- Shipment Details -->
          ${
            showFullDetails
              ? `
          <div class="shipment-details">
            <div class="detail-card">
              <span class="detail-icon">📦</span>
              <div class="detail-label">Service Type</div>
              <div class="detail-value">${
                delivery.shipmentType || "Standard"
              }</div>
            </div>
            
            <div class="detail-card">
              <span class="detail-icon">📅</span>
              <div class="detail-label">Date Sent</div>
              <div class="detail-value">${
                delivery.dateSent
                  ? new Date(delivery.dateSent).toLocaleDateString()
                  : "Processing"
              }</div>
            </div>
            
            <div class="detail-card">
              <span class="detail-icon">🎯</span>
              <div class="detail-label">Destination</div>
              <div class="detail-value">${
                delivery.receiver?.city || "N/A"
              }</div>
            </div>
            
            <div class="detail-card">
              <span class="detail-icon">💰</span>
              <div class="detail-label">Delivery Fee</div>
              <div class="detail-value">${delivery.currency || "$"}${
                  delivery.deliveryFee || "0.00"
                }</div>
            </div>
          </div>
          `
              : ""
          }
          
          <!-- Status Message -->
          <div class="message-section">
            <span class="status-icon">${statusConfig.icon}</span>
            <div class="status-title">${statusConfig.title}</div>
            <div class="status-message">${statusConfig.message}</div>
          </div>
          
          <!-- Action Buttons -->
          ${
            shouldShowTracking
              ? `
          <div class="action-buttons">
            <a href="${trackingUrl}" class="btn btn-primary">
              <span class="btn-icon">📍</span>
              <span class="btn-text">Track Shipment</span>
            </a>
            
            ${
              finalInvoiceUrl
                ? `<a href="${finalInvoiceUrl}" class="btn btn-secondary">
                     <span class="btn-icon">📄</span>
                     <span class="btn-text">Download Invoice</span>
                   </a>`
                : ""
            }
          </div>
          `
              : ""
          }
          
          ${
            hasPdfAttachment && shouldShowInvoice
              ? `
          <div class="invoice-section">
            <div class="invoice-title">📄 Invoice Attached</div>
            <p style="color: #92400e; margin: 0; font-weight: 500;">Your detailed invoice is attached to this email for your records.</p>
          </div>
          `
              : ""
          }
          
          <div class="help-section">
            <div class="help-title">Need Assistance?</div>
            <p class="help-text">
              Our dedicated support team is available 24/7 to help you with any questions.<br>
              📧 <strong>support@aegisexpress.com</strong> | 📞 <strong>+234 801 234 5678</strong><br>
              ${
                statusConfig.telegramRequired
                  ? `🔹 <strong>For registration:</strong> <a href="${telegramLink}" style="color: #2563eb;">Contact us on Telegram</a><br>`
                  : ""
              }
              We're here to ensure your shipping experience is seamless.
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-content">
            <div class="company-info">
              <h3>Aegis Express Logistics</h3>
              <div class="contact-info">
                📍 123 Express Avenue, Victoria Island, Lagos, Nigeria<br>
                📞 +234 801 234 5678 | 📧 support@aegisexpress.com<br>
                🌐 www.aegisexpress.com
              </div>
            </div>
            
            <div class="social-links">
              <a href="#" class="social-link" style="color: #ffffff;">📘</a>
              <a href="#" class="social-link" style="color: #ffffff;">🐦</a>
              <a href="#" class="social-link" style="color: #ffffff;">📷</a>
              <a href="#" class="social-link" style="color: #ffffff;">💼</a>
            </div>
            
            <div class="disclaimer">
              This email was sent on ${currentDate}. This is an automated message from Aegis Express Logistics. 
              Please do not reply to this email. For assistance, contact our support team.
              <br><br>
              © ${new Date().getFullYear()} Aegis Express Logistics. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generic email sending function with better attachment handling
export async function sendEmail({ to, subject, text, html, attachments = [] }) {
  try {
    const mailer = getMailer();

    // Convert single recipient to array and ensure uniqueness
    const recipients = Array.isArray(to) ? [...new Set(to)] : [to];
    const primaryRecipient = recipients[0];

    console.log(`📧 Sending email to: ${primaryRecipient}`);
    console.log(`📧 Subject: ${subject}`);
    console.log(`📧 Attachments: ${attachments.length}`);

    const mailOptions = {
      from: {
        name: "Aegis Express Logistics",
        address: process.env.FROM_EMAIL || "boltdropa@gmail.com",
      },
      to: primaryRecipient, // Send to single recipient to avoid duplicates
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

// Enhanced delivery confirmation email with proper PDF attachment (only for completed processing)
export async function sendDeliveryConfirmationEmailWithPDF(
  delivery,
  pdfBuffer
) {
  try {
    console.log(
      `📧 Sending delivery confirmation with PDF for: ${delivery.trackingCode}`
    );

    const recipient = delivery.receiver?.email;
    if (!recipient) {
      throw new Error("Receiver email is required");
    }

    // Only send with PDF if shipment is fully processed
    const statusConfig =
      STATUS_CONFIG[delivery.status] || STATUS_CONFIG.Pending;
    if (!statusConfig.showFullDetails) {
      console.log("⚠️ Skipping PDF attachment for processing status");
      return await sendDeliveryConfirmationEmail(delivery);
    }

    const emailTemplate = generateDeliveryEmailTemplate(
      delivery,
      null,
      true // Has PDF attachment
    );

    const attachments = [
      {
        filename: `Invoice_${delivery.trackingCode}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ];

    return await sendEmail({
      to: recipient,
      subject: `📦 Delivery Confirmation - ${delivery.trackingCode} | Aegis Express`,
      text: `Your delivery ${delivery.trackingCode} has been confirmed. Please see the attached invoice for details.`,
      html: emailTemplate,
      attachments,
    });
  } catch (error) {
    console.error("❌ Error sending delivery confirmation with PDF:", error);
    throw error;
  }
}

// Original delivery confirmation email (without PDF)
export async function sendDeliveryConfirmationEmail(delivery) {
  try {
    console.log(
      `📧 Sending delivery confirmation for: ${delivery.trackingCode}`
    );

    const recipient = delivery.receiver?.email;
    if (!recipient) {
      throw new Error("Receiver email is required");
    }

    const emailTemplate = generateDeliveryEmailTemplate(delivery, null, false);

    return await sendEmail({
      to: recipient,
      subject: `📦 Delivery Confirmation - ${delivery.trackingCode} | Aegis Express`,
      text: `Your delivery ${delivery.trackingCode} has been confirmed. Track it at: ${process.env.FRONTEND_URL}/track/${delivery.trackingCode}`,
      html: emailTemplate,
    });
  } catch (error) {
    console.error("❌ Error sending delivery confirmation:", error);
    throw error;
  }
}

// Enhanced delivery creation email with status-based content
export const sendDeliveryCreatedEmail = async (delivery) => {
  try {
    console.log(
      `📧 Sending delivery created email for: ${delivery.trackingCode}`
    );

    const recipient = delivery.receiver?.email;
    if (!recipient) {
      console.warn("⚠️ No receiver email provided, skipping email");
      return { success: false, reason: "No receiver email" };
    }

    const statusConfig =
      STATUS_CONFIG[delivery.status] || STATUS_CONFIG.Pending;
    const emailTemplate = generateDeliveryEmailTemplate(delivery);

    // Different subject lines based on status
    let subject;
    if (statusConfig.telegramRequired) {
      subject = `📱 Registration Required - ${delivery.trackingCode} | Aegis Express`;
    } else if (statusConfig.urgent) {
      subject = `🚨 URGENT: Action Required - ${delivery.trackingCode} | Aegis Express`;
    } else {
      subject = `🚀 Shipment Created - ${delivery.trackingCode} | Aegis Express`;
    }

    return await sendEmail({
      to: recipient,
      subject,
      text: statusConfig.telegramRequired
        ? `Your shipment ${delivery.trackingCode} requires registration. Please contact us via Telegram with your phone number and tracking code.`
        : `Your shipment ${delivery.trackingCode} has been created and is being processed.`,
      html: emailTemplate,
    });
  } catch (error) {
    console.error("❌ Error sending delivery created email:", error);
    throw error;
  }
};

// Enhanced status update email with status-specific logic
export const sendStatusUpdateEmail = async (delivery, newStatus) => {
  try {
    console.log(
      `📧 Sending status update email for: ${delivery.trackingCode} - ${newStatus}`
    );

    const recipient = delivery.receiver?.email;
    if (!recipient) {
      console.warn(
        "⚠️ No receiver email provided, skipping status update email"
      );
      return { success: false, reason: "No receiver email" };
    }

    // Update delivery status for template generation
    const updatedDelivery = { ...delivery, status: newStatus };
    const statusConfig = STATUS_CONFIG[newStatus] || STATUS_CONFIG.Pending;
    const emailTemplate = generateDeliveryEmailTemplate(updatedDelivery);

    // Different subject lines based on status
    let subject;
    if (statusConfig.urgent) {
      subject = `🚨 URGENT: ${newStatus} - ${delivery.trackingCode} | Aegis Express`;
    } else if (statusConfig.telegramRequired) {
      subject = `📱 Registration Required: ${newStatus} - ${delivery.trackingCode} | Aegis Express`;
    } else {
      subject = `${statusConfig.icon} Status Update: ${newStatus} - ${delivery.trackingCode} | Aegis Express`;
    }

    return await sendEmail({
      to: recipient,
      subject,
      text: statusConfig.telegramRequired
        ? `Your shipment ${delivery.trackingCode} requires registration. Please contact us via Telegram.`
        : statusConfig.urgent
        ? `URGENT: Your shipment ${delivery.trackingCode} is on hold. Please contact support immediately.`
        : `Your shipment ${delivery.trackingCode} status has been updated to: ${newStatus}. ${statusConfig.message}`,
      html: emailTemplate,
    });
  } catch (error) {
    console.error("❌ Error sending status update email:", error);
    throw error;
  }
};

// Enhanced location update email
export const sendLocationUpdateEmail = async (delivery, locationUpdate) => {
  try {
    console.log(
      `📧 Sending location update email for: ${delivery.trackingCode}`
    );

    const recipient = delivery.receiver?.email;
    if (!recipient) {
      console.warn(
        "⚠️ No receiver email provided, skipping location update email"
      );
      return { success: false, reason: "No receiver email" };
    }

    const emailTemplate = generateDeliveryEmailTemplate(delivery);

    return await sendEmail({
      to: recipient,
      subject: `📍 Location Update - ${delivery.trackingCode} | Aegis Express`,
      text: `Your shipment ${
        delivery.trackingCode
      } location has been updated. Current status: ${
        locationUpdate.status || delivery.status
      }`,
      html: emailTemplate,
    });
  } catch (error) {
    console.error("❌ Error sending location update email:", error);
    throw error;
  }
};

// Enhanced deletion notification email
export const sendDeliveryDeletionEmail = async (delivery) => {
  try {
    console.log(
      `📧 Sending deletion notification for: ${delivery.trackingCode}`
    );

    const recipient = delivery.receiver?.email;
    if (!recipient) {
      console.warn("⚠️ No receiver email provided, skipping deletion email");
      return { success: false, reason: "No receiver email" };
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const deletionTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shipment Cancelled - Aegis Express</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .content {
            padding: 40px 30px;
          }
          .tracking-code {
            background: #fef2f2;
            border: 2px solid #ef4444;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            background: #f8fafc;
            padding: 20px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚫 Shipment Cancelled</h1>
            <p>Aegis Express Logistics</p>
          </div>
          <div class="content">
            <h2>Hello ${delivery.receiver?.name || "Valued Customer"},</h2>
            <p>We're writing to inform you that your shipment has been cancelled.</p>
            
            <div class="tracking-code">
              <h3>Cancelled Tracking Code</h3>
              <h2 style="color: #ef4444; margin: 10px 0;">${
                delivery.trackingCode
              }</h2>
            </div>
            
            <p><strong>Cancellation Details:</strong></p>
            <ul style="margin-left: 20px;">
              <li><strong>Original Service:</strong> ${
                delivery.shipmentType || "Standard"
              }</li>
              <li><strong>Destination:</strong> ${
                delivery.receiver?.city || "N/A"
              }</li>
              <li><strong>Cancellation Date:</strong> ${currentDate}</li>
            </ul>
            
            <p>If you have any questions about this cancellation or if you believe this was done in error, please contact our support team immediately.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:support@aegisexpress.com" style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Contact Support</a>
            </div>
            
            <p>We apologize for any inconvenience this may cause.</p>
            <p>Best regards,<br><strong>Aegis Express Logistics Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Aegis Express Logistics. All rights reserved.</p>
            <p>📧 support@aegisexpress.com | 📞 +234 801 234 5678</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await sendEmail({
      to: recipient,
      subject: `🚫 Shipment Cancelled - ${delivery.trackingCode} | Aegis Express`,
      text: `Your shipment ${delivery.trackingCode} has been cancelled. If you have questions, please contact support at support@aegisexpress.com`,
      html: deletionTemplate,
    });
  } catch (error) {
    console.error("❌ Error sending deletion email:", error);
    throw error;
  }
};

// Enhanced test email function
export const sendTestEmail = async (
  testEmailAddress = "boltdropa@gmail.com"
) => {
  try {
    console.log(`📧 Sending test email to: ${testEmailAddress}`);

    const testDelivery = {
      trackingCode: "TEST" + Date.now().toString().slice(-6),
      receiver: {
        name: "Test Customer",
        email: testEmailAddress,
        city: "Lagos",
      },
      sender: {
        name: "Aegis Express Logistics",
        city: "Lagos",
      },
      shipmentType: "Express Test",
      status: "Processing",
      dateSent: new Date(),
      deliveryFee: 2500,
      currency: "₦",
    };

    const emailTemplate = generateDeliveryEmailTemplate(testDelivery);

    return await sendEmail({
      to: testEmailAddress,
      subject: `🧪 Test Email - ${testDelivery.trackingCode} | Aegis Express`,
      text: `This is a test email from Aegis Express Logistics. Your test tracking code is: ${testDelivery.trackingCode}`,
      html: emailTemplate,
    });
  } catch (error) {
    console.error("❌ Error sending test email:", error);
    throw error;
  }
};

export default {
  sendEmail,
  sendDeliveryCreatedEmail,
  sendDeliveryConfirmationEmail,
  sendDeliveryConfirmationEmailWithPDF,
  sendStatusUpdateEmail,
  sendLocationUpdateEmail,
  sendDeliveryDeletionEmail,
  sendTestEmail,
};
