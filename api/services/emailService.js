import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = null;

function getMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (transporter) return transporter;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // ✅ Dev-friendly mock (logs emails instead of sending)
    return {
      sendMail: async (opts) => {
        console.log("✉️  Mock Email:", opts);
        return { messageId: "mock" };
      },
    };
  }

  // ✅ Real transporter
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465, // auto set secure
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendEmail({ to, subject, text, html, attachments = [] }) {
  try {
    const mailer = getMailer();
    const from = process.env.FROM_EMAIL || "no-reply@logistics.local";

    const info = await mailer.sendMail({
      from,
      to,
      subject,
      text,
      html,
      attachments, // supports PDF/images/etc
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    throw err;
  }
}
