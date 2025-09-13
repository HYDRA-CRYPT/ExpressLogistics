// Base configuration for contact information
// Update these values to change them across the entire site

export const CONTACT_CONFIG = {
  // Email addresses
  email: {
    primary: "aegisexpresslog@gmail.com",
    support: "aegisexpresslog@gmail.com",
    billing: "aegisexpresslog@gmail.com",
    quotes: "aegisexpresslog@gmail.com",
  },

  // Telegram information
  telegram: {
    supportLink: "https://t.me/AegisXP",
    botUsername: "@AegisExpressBot",
    channelUsername: "@AegisExpressSupport",
  },

  // Phone numbers
  phone: {
    primary: "+1-800-AEGIS-EX",
    support: "+1-800-247-4739",
    emergency: "+1-800-911-SHIP",
  },

  // Physical addresses
  address: {
    headquarters: "1301 2nd St NW Waseca, Minnesota(MN), 56093",
    warehouse: "456 Distribution Center, Brooklyn, NY 11201",
  },

  // Social media and other links
  social: {
    twitter: "https://twitter.com/AegisExpress",
    linkedin: "https://linkedin.com/company/aegis-express",
    facebook: "https://facebook.com/AegisExpressLogistics",
  },

  // Business hours
  hours: {
    weekdays: "Monday - Friday: 8:00 AM - 6:00 PM EST",
    weekend: "Saturday: 9:00 AM - 4:00 PM EST",
    sunday: "Sunday: Closed",
    emergency: "24/7 Emergency Support Available",
  },
} as const;

// Helper functions for easy access
export const getEmailLink = (type: keyof typeof CONTACT_CONFIG.email) => {
  return `mailto:${CONTACT_CONFIG.email[type]}`;
};

export const getTelegramLink = () => {
  return CONTACT_CONFIG.telegram.supportLink;
};

export const getPhoneLink = (type: keyof typeof CONTACT_CONFIG.phone) => {
  return `tel:${CONTACT_CONFIG.phone[type]}`;
};
