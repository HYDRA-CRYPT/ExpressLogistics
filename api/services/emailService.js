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
    secure: Number(smtpPort) === 465, // auto set secure based on port
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    // Add these settings for better attachment handling
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  };

  // Gmail-specific optimizations
  if (smtpHost.includes("gmail")) {
    transportConfig.service = "gmail";
    transportConfig.secure = true;
    transportConfig.port = 465;
  }

  transporter = nodemailer.createTransport(transportConfig);

  return transporter;
}

// Professional email template generator with PDF attachment notice
function generateDeliveryEmailTemplate(
  delivery,
  invoiceUrl = null,
  hasPdfAttachment = false
) {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const trackingUrl = `${baseUrl}/track/${delivery.trackingCode}`;
  const finalInvoiceUrl =
    invoiceUrl || `${baseUrl}/track/${delivery.trackingCode}/invoice`;

  console.log("Generated invoice URL:", finalInvoiceUrl);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Package Confirmation - ${delivery.trackingCode}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                background-color: #f5f5f5;
                color: #333333;
            }
            
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
                color: white;
                padding: 30px 40px;
                text-align: center;
            }
            
            .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 8px;
            }
            
            .header p {
                font-size: 16px;
                opacity: 0.9;
            }
            
            .content {
                padding: 40px;
            }
            
            .greeting {
                font-size: 18px;
                margin-bottom: 24px;
                color: #1f2937;
            }
            
            .attachment-notice {
                background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
                border: 2px solid #0277bd;
                border-radius: 12px;
                padding: 20px;
                margin: 24px 0;
                text-align: center;
                box-shadow: 0 2px 4px rgba(2, 119, 189, 0.1);
            }
            
            .attachment-icon {
                font-size: 32px;
                margin-bottom: 12px;
                display: block;
            }
            
            .attachment-notice h3 {
                color: #0277bd;
                font-size: 18px;
                margin-bottom: 8px;
                font-weight: 600;
            }
            
            .attachment-notice p {
                color: #01579b;
                margin: 0;
                font-size: 14px;
            }
            
            .tracking-card {
                background: #f8fafc;
                border: 2px solid #16a34a;
                border-radius: 12px;
                padding: 24px;
                text-align: center;
                margin: 24px 0;
            }
            
            .tracking-code {
                font-size: 24px;
                font-weight: 700;
                color: #16a34a;
                letter-spacing: 2px;
                margin-bottom: 8px;
            }
            
            .tracking-label {
                font-size: 14px;
                color: #6b7280;
                text-transform: uppercase;
                font-weight: 600;
            }
            
            .details-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 24px;
                margin: 32px 0;
            }
            
            .detail-card {
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #16a34a;
            }
            
            .detail-card h3 {
                font-size: 16px;
                color: #16a34a;
                margin-bottom: 12px;
                font-weight: 600;
            }
            
            .detail-card p {
                font-size: 14px;
                color: #4b5563;
                margin-bottom: 4px;
            }
            
            .status-badge {
                display: inline-block;
                background: #fef3c7;
                color: #92400e;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
                margin: 16px 0;
            }
            
            .button-group {
                display: flex;
                gap: 16px;
                justify-content: center;
                margin: 32px 0;
                flex-wrap: wrap;
            }
            
            .btn {
                display: inline-block;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
                transition: all 0.3s ease;
                min-width: 160px;
            }
            
            .btn-primary {
                background: #16a34a;
                color: white;
            }
            
            .btn-secondary {
                background: white;
                color: #16a34a;
                border: 2px solid #16a34a;
            }
            
            .btn-pdf {
                background: #dc2626;
                color: white;
                border: 2px solid #dc2626;
            }
            
            .items-section {
                margin-top: 32px;
            }
            
            .items-title {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 16px;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 8px;
            }
            
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #f3f4f6;
            }
            
            .item:last-child {
                border-bottom: none;
            }
            
            .item-info {
                flex: 1;
            }
            
            .item-name {
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 4px;
            }
            
            .item-details {
                font-size: 14px;
                color: #6b7280;
            }
            
            .item-value {
                font-weight: 600;
                color: #16a34a;
            }
            
            .footer {
                background: #f9fafb;
                padding: 32px 40px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
            }
            
            .footer p {
                color: #6b7280;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .footer a {
                color: #16a34a;
                text-decoration: none;
            }
            
            .divider {
                height: 2px;
                background: linear-gradient(90deg, transparent, #16a34a, transparent);
                margin: 32px 0;
            }
            
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 8px;
                }
                
                .header, .content, .footer {
                    padding: 24px;
                }
                
                .details-grid {
                    grid-template-columns: 1fr;
                }
                
                .button-group {
                    flex-direction: column;
                    align-items: center;
                }
                
                .btn {
                    width: 100%;
                    max-width: 280px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Package Confirmation</h1>
                <p>Your delivery has been successfully created</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Hi ${delivery.receiver.name || "Valued Customer"},
                </div>
                
                <p>We're excited to let you know that your package has been created and is being prepared for delivery!</p>
                
                ${
                  hasPdfAttachment
                    ? `
                <!-- PDF Attachment Notice -->
                <div class="attachment-notice">
                    <span class="attachment-icon">📎</span>
                    <h3>Invoice PDF Attached!</h3>
                    <p>
                        Your invoice PDF is attached to this email and ready to download.
                        Look for "invoice_${delivery.trackingCode}.pdf" in your email attachments.
                        You can also download it online using the button below.
                    </p>
                </div>
                `
                    : ""
                }
                
                <div class="tracking-card">
                    <div class="tracking-code">${delivery.trackingCode}</div>
                    <div class="tracking-label">Your Tracking Code</div>
                </div>
                
                <div class="status-badge">Status: ${delivery.status}</div>
                
                <div class="details-grid">
                    <div class="detail-card">
                        <h3>Sender Information</h3>
                        <p><strong>${delivery.sender.name}</strong></p>
                        <p>${delivery.sender.address}</p>
                        <p>${delivery.sender.country}</p>
                        <p>${delivery.sender.phone}</p>
                    </div>
                    
                    <div class="detail-card">
                        <h3>Delivery Details</h3>
                        <p><strong>To:</strong> ${delivery.receiver.name}</p>
                        <p><strong>Address:</strong> ${
                          delivery.receiver.address
                        }</p>
                        <p><strong>Expected:</strong> ${new Date(
                          delivery.deliveryDate
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}</p>
                    </div>
                </div>
                
                <div class="items-section">
                    <div class="items-title">Package Contents</div>
                    ${delivery.items
                      .map(
                        (item) => `
                        <div class="item">
                            <div class="item-info">
                                <div class="item-name">${item.description}</div>
                                <div class="item-details">Qty: ${
                                  item.quantity
                                } • Weight: ${item.weight}kg</div>
                            </div>
                            <div class="item-value">${
                              delivery.currency
                            } ${item.value.toLocaleString()}</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                
                <div class="divider"></div>
                
                <div style="text-align: center; margin: 24px 0;">
                    <p style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 8px;">
                        Total Delivery Fee: <span style="color: #16a34a;">${
                          delivery.currency
                        } ${delivery.deliveryFee.toLocaleString()}</span>
                    </p>
                </div>
                
                <div class="button-group">
                    <a href="${trackingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Track Your Package</a>
                    <a href="${finalInvoiceUrl}" class="btn btn-pdf" target="_blank" rel="noopener" download="invoice_${
    delivery.trackingCode
  }.pdf">Download Invoice PDF</a>
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-top: 32px;">
                    <p style="color: #92400e; font-weight: 600; margin-bottom: 8px;">What's Next?</p>
                    <ul style="color: #92400e; padding-left: 20px;">
                        ${
                          hasPdfAttachment
                            ? "<li>📎 Your invoice PDF is attached to this email - check your email attachments</li>"
                            : ""
                        }
                        <li>You'll receive updates as your package moves through our network</li>
                        <li>Track your package anytime using the tracking code above</li>
                        <li>Download a fresh copy of your invoice anytime using the button above</li>
                        <li>Contact us if you have any questions</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>TechAgba Logistics</strong></p>
                <p>Fast, Reliable, Secure Delivery Services</p>
                <p>Email: <a href="mailto:techagbadev@gmail.com">techagbadev@gmail.com</a> | Phone: +234-801-234-5678</p>
                <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
                    This is an automated message. Please do not reply to this email.
                </p>
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
    const from =
      process.env.FROM_EMAIL ||
      process.env.EMAIL_USER ||
      "TechAgba Logistics <techagbadev@gmail.com>";

    // Verify transporter before sending
    await mailer.verify();
    console.log("📧 Email transporter verified successfully");

    // Enhanced mail options with proper attachment handling
    const mailOptions = {
      from: from,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      text,
      html,
      attachments: attachments.map((attachment) => ({
        ...attachment,
        // Ensure proper content disposition for downloadable attachments
        contentDisposition: "attachment",
        // Add proper content encoding
        encoding: attachment.encoding || "base64",
      })),
      // Add these headers for better deliverability and attachment handling
      headers: {
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        "X-Mailer": "TechAgba Logistics System",
        "X-MimeOLE": "Produced By TechAgba Logistics",
        // Important for attachment handling
        "Content-Type": "multipart/mixed",
      },
      // Ensure we have both HTML and plain text versions
      alternatives: html
        ? [
            {
              contentType: "text/html",
              content: html,
            },
          ]
        : undefined,
    };

    const info = await mailer.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    console.log(`📎 Attachments sent: ${attachments.length}`);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
      attachmentCount: attachments.length,
    };
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    throw new Error(`Email sending failed: ${err.message}`);
  }
}

// Enhanced delivery confirmation email with proper PDF attachment
export async function sendDeliveryConfirmationEmailWithPDF(
  delivery,
  pdfBuffer
) {
  try {
    // Validate PDF buffer
    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      throw new Error("Invalid PDF buffer provided");
    }

    console.log(
      `📎 Preparing email with PDF attachment (${pdfBuffer.length} bytes)`
    );

    // Generate invoice URL for online download as backup
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const invoiceUrl = `${baseUrl}/track/${delivery.trackingCode}/invoice`;

    // Generate email template with PDF attachment notice
    const emailTemplate = generateDeliveryEmailTemplate(
      delivery,
      invoiceUrl,
      true
    );

    // Plain text version mentioning PDF attachment
    const plainTextEmail = `
TechAgba Logistics - Package Confirmation

Hi ${delivery.receiver.name || "Customer"},

Your package has been created successfully!

📎 IMPORTANT: Your invoice PDF is attached to this email!
Look for "invoice_${delivery.trackingCode}.pdf" in your email attachments.

TRACKING INFORMATION:
Tracking Code: ${delivery.trackingCode}
Status: ${delivery.status}
Expected Delivery: ${new Date(delivery.deliveryDate).toLocaleDateString()}

SENDER: ${delivery.sender.name}
RECEIVER: ${delivery.receiver.name}

You can also download your invoice online: ${invoiceUrl}

Track your package: ${baseUrl}/track/${delivery.trackingCode}

Total Delivery Fee: ${
      delivery.currency
    } ${delivery.deliveryFee.toLocaleString()}

Thank you for choosing TechAgba Logistics!

--
TechAgba Logistics
Fast, Reliable, Secure Delivery Services
Email: techagbadev@gmail.com
Phone: +234-801-234-5678
    `;

    // Prepare PDF attachment with proper headers
    const pdfAttachment = {
      filename: `invoice_${delivery.trackingCode}.pdf`,
      content: pdfBuffer,
      contentType: "application/pdf",
      contentDisposition: "attachment",
      encoding: "base64",
      // Add these for better compatibility
      headers: {
        "Content-Description": "TechAgba Logistics Invoice",
        "Content-Transfer-Encoding": "base64",
      },
    };

    // Send email with PDF attachment
    const result = await sendEmail({
      to: delivery.receiver.email,
      subject: `📦 Package Created - Invoice Attached - ${delivery.trackingCode}`,
      html: emailTemplate,
      text: plainTextEmail,
      attachments: [pdfAttachment],
    });

    console.log(
      "✅ Email with PDF attachment sent successfully:",
      result.messageId
    );

    return {
      ...result,
      pdfAttachmentSent: true,
      pdfSize: pdfBuffer.length,
    };
  } catch (error) {
    console.error("❌ Email with PDF attachment failed:", error);

    // Fallback: try sending email without attachment
    try {
      console.log("🔄 Attempting fallback email without attachment...");
      const fallbackResult = await sendDeliveryConfirmationEmail(delivery);

      return {
        ...fallbackResult,
        pdfAttachmentSent: false,
        fallbackUsed: true,
        originalError: error.message,
      };
    } catch (fallbackError) {
      throw new Error(`Email sending completely failed: ${error.message}`);
    }
  }
}

// Original delivery confirmation email (without PDF)
export async function sendDeliveryConfirmationEmail(delivery) {
  const emailTemplate = generateDeliveryEmailTemplate(delivery, null, false);

  return await sendEmail({
    to: delivery.receiver.email,
    subject: `📦 Package Created - Tracking: ${delivery.trackingCode}`,
    html: emailTemplate,
    text: `Hi ${delivery.receiver.name || "Customer"},

Your package has been created successfully!

Tracking Code: ${delivery.trackingCode}
Status: ${delivery.status}
Expected Delivery: ${new Date(delivery.deliveryDate).toLocaleDateString()}

Track your package: ${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/track/${delivery.trackingCode}

Thank you for choosing TechAgba Logistics!
    `,
  });
}

// Keep all your other existing functions
export const sendDeliveryCreatedEmail = async (delivery) => {
  return await sendDeliveryConfirmationEmail(delivery);
};

export const sendStatusUpdateEmail = async (delivery, newStatus) => {
  const { receiver, sender, trackingCode } = delivery;

  const statusMessages = {
    Pending: "Your delivery is on Pending and prepared for shipment.",
    Shipped: "Your delivery has been shipped and is on its way!",
    "In Transit": "Your delivery is currently in transit to the destination.",
    "On Hold": "Your delivery is temporarily on hold. We will update you soon.",
    Delivered: "Your delivery has been successfully delivered!",
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c3e50;">Delivery Status Update - ${trackingCode}</h2>
      
      <div style="background-color: #e3f2fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #1976d2;">Status: ${newStatus}</h3>
        <p>${
          statusMessages[newStatus] || "Your delivery status has been updated."
        }</p>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
        <p><strong>Tracking Code:</strong> ${trackingCode}</p>
        <p><strong>From:</strong> ${sender.name}</p>
        <p><strong>To:</strong> ${receiver.name}</p>
      </div>

      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated message from TechAgba Logistics System.<br>
        Please do not reply to this email.
      </p>
    </div>
  `;

  return await sendEmail({
    to: [receiver.email, sender.email],
    subject: `Delivery Status Update: ${newStatus} - ${trackingCode}`,
    html,
  });
};

export const sendLocationUpdateEmail = async (delivery, locationUpdate) => {
  const { receiver, sender, trackingCode } = delivery;
  const { description, time, city, country } = locationUpdate;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c3e50;">Location Update - ${trackingCode}</h2>
      
      <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #856404;">Latest Location Update</h3>
        <p><strong>Location:</strong> ${city}, ${country}</p>
        <p><strong>Update:</strong> ${description}</p>
        <p><strong>Time:</strong> ${new Date(time).toLocaleString()}</p>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
        <p><strong>Tracking Code:</strong> ${trackingCode}</p>
        <p><strong>From:</strong> ${sender.name}</p>
        <p><strong>To:</strong> ${receiver.name}</p>
      </div>

      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated message from TechAgba Logistics System.<br>
        Please do not reply to this email.
      </p>
    </div>
  `;

  return await sendEmail({
    to: [receiver.email, sender.email],
    subject: `Location Update - ${trackingCode}`,
    html,
  });
};

// Test email function
export const sendTestEmail = async (
  testEmailAddress = "boltdropa@gmail.com"
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c3e50;">🧪 Email System Test</h2>
      
      <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #155724;">✅ Email System Working!</h3>
        <p>This is a test email from your TechAgba Logistics System.</p>
        <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
        <h4>System Information:</h4>
        <ul>
          <li>Email service: Configured and working</li>
          <li>SMTP connection: Successful</li>
          <li>Template rendering: Functional</li>
          <li>PDF attachments: Ready</li>
        </ul>
      </div>

      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated test message from TechAgba Logistics System.<br>
        If you received this, your email system is working correctly!
      </p>
    </div>
  `;

  return await sendEmail({
    to: testEmailAddress,
    subject: "🧪 Email System Test - TechAgba Logistics",
    html,
  });
};

export default {
  sendEmail,
  sendDeliveryCreatedEmail,
  sendDeliveryConfirmationEmail,
  sendDeliveryConfirmationEmailWithPDF,
  sendStatusUpdateEmail,
  sendLocationUpdateEmail,
  sendTestEmail,
};
