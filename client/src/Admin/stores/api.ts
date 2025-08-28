import {
  IconDashboard,
  IconDatabase,
  IconReport,
  IconSearch,
  IconTruck,
  IconUsers,
  IconCreditCard,
  IconSettings,
  IconMail,
  IconHelpCircle,
  IconMailStar,
} from "@tabler/icons-react";

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/owner/dashboard",
      icon: IconDashboard,
    },
  ],

  shipments: [
    {
      name: "Create Shipment",
      url: "/owner/shipments/create",
      icon: IconDatabase,
    },
    { name: "All Shipments", url: "/owner/shipments", icon: IconReport },
    { name: "Track Shipment", url: "/owner/shipments/track", icon: IconSearch },
  ],

  orders: [
    { name: "Incoming Orders", url: "/owner/orders/incoming", icon: IconTruck },
    {
      name: "Completed Orders",
      url: "/owner/orders/completed",
      icon: IconReport,
    },
  ],

  customers: [
    { name: "Manage Customers", url: "/owner/customers", icon: IconUsers },
    { name: "Recipients", url: "/owner/recipients", icon: IconUsers },
  ],

  payments: [
    { name: "Transactions", url: "/owner/payments", icon: IconCreditCard },
    { name: "Invoices", url: "/owner/invoices", icon: IconReport },
  ],

  createEmail: [
    {
      name: "Notification Email",
      url: "/owner/shipments/notify-emails/create",
      icon: IconMail,
    },
    {
      name: "Update Location Email",
      url: "/owner/shipments/update-emails/create",
      icon: IconMailStar,
    },
  ],

  support: [
    { name: "Support Tickets", url: "/owner/support", icon: IconHelpCircle },
  ],

  settings: [
    { name: "System Settings", url: "/owner/settings", icon: IconSettings },
  ],
};
