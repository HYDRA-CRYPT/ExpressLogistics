// SEO Data for Aegis Express Logistics - Google Certified SEO Optimized
export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
}

export const seoData: Record<string, SEOData> = {
  home: {
    title:
      "Aegis Express Logistics - Premier Global Shipping & Delivery Services | Fast, Reliable, Secure",
    description:
      "Leading logistics company offering express delivery, international shipping, freight services, and warehousing solutions. Track packages in real-time with 24/7 support. Trusted by 10,000+ businesses worldwide since 1995.",
    keywords:
      "logistics, shipping, delivery, express delivery, international shipping, freight services, package tracking, warehousing, supply chain, courier services, cargo transport, last mile delivery, same day delivery, overnight shipping, global logistics",
    canonical: "/",
    ogTitle:
      "Aegis Express Logistics - Premier Global Shipping & Delivery Services",
    ogDescription:
      "Fast, reliable, and secure logistics solutions worldwide. Express delivery, international shipping, and freight services with real-time tracking.",
    ogImage: "/assets/og-image-home.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "Aegis Express Logistics - Premier Global Shipping Services",
    twitterDescription:
      "Leading logistics company with express delivery, international shipping, and freight services. Track packages in real-time.",
    twitterImage: "/assets/twitter-image-home.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Aegis Express Logistics",
      description:
        "Premier global shipping and logistics company offering express delivery, international shipping, and freight services.",
      url: "https://aegislogistics.com",
      logo: "https://aegislogistics.com/assets/logo.png",
      foundingDate: "1995",
      telephone: "+1-555-123-4567",
      email: "info@aegislogistics.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Logistics Ave",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10001",
        addressCountry: "US",
      },
      sameAs: [
        "https://facebook.com/aegislogistics",
        "https://twitter.com/aegislogistics",
        "https://linkedin.com/company/aegislogistics",
        "https://instagram.com/aegislogistics",
      ],
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: "40.7128",
          longitude: "-74.0060",
        },
        geoRadius: "25000000",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Logistics Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Express Delivery",
              description: "Same-day and next-day delivery services",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "International Shipping",
              description: "Global shipping solutions with customs clearance",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Freight Services",
              description: "Heavy cargo and freight transportation",
            },
          },
        ],
      },
    },
  },
  about: {
    title:
      "About Aegis Express Logistics - 30+ Years of Excellence in Global Shipping | Our Story",
    description:
      "Discover Aegis Express Logistics' journey since 1995. Learn about our mission, values, team, and commitment to providing world-class logistics solutions with ISO certification and industry-leading technology.",
    keywords:
      "about aegis logistics, company history, logistics expertise, shipping company background, ISO certified logistics, supply chain management, transportation solutions, global network, logistics technology, company mission",
    canonical: "/about",
    ogTitle: "About Aegis Express Logistics - 30+ Years of Shipping Excellence",
    ogDescription:
      "Learn about our journey since 1995, our mission, values, and commitment to world-class logistics solutions.",
    ogImage: "/assets/og-image-about.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "About Aegis Express Logistics - Our Story & Mission",
    twitterDescription:
      "30+ years of excellence in global shipping. Discover our mission, values, and commitment to logistics innovation.",
    twitterImage: "/assets/twitter-image-about.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      mainEntity: {
        "@type": "Organization",
        name: "Aegis Express Logistics",
        foundingDate: "1995",
        description:
          "Premier logistics company with over 30 years of experience in global shipping and supply chain management.",
        numberOfEmployees: "500-1000",
        industry: "Transportation and Logistics",
        awards: [
          "ISO 9001:2015 Certification",
          "Best Logistics Company 2024",
          "Excellence in Customer Service Award",
        ],
      },
    },
  },
  services: {
    title:
      "Logistics Services - Express Delivery, International Shipping & Freight | Aegis Express",
    description:
      "Comprehensive logistics services including express delivery, international shipping, freight transportation, warehousing, and supply chain management. Get instant quotes and real-time tracking.",
    keywords:
      "logistics services, express delivery, international shipping, freight services, warehousing solutions, supply chain management, cargo transport, courier services, same day delivery, overnight shipping, customs clearance, door to door delivery",
    canonical: "/services",
    ogTitle:
      "Complete Logistics Services - Express Delivery & International Shipping",
    ogDescription:
      "Express delivery, international shipping, freight services, and warehousing solutions with real-time tracking.",
    ogImage: "/assets/og-image-services.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle:
      "Logistics Services - Express Delivery & International Shipping",
    twitterDescription:
      "Comprehensive logistics solutions: express delivery, international shipping, freight, and warehousing.",
    twitterImage: "/assets/twitter-image-services.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Logistics and Transportation Services",
      provider: {
        "@type": "Organization",
        name: "Aegis Express Logistics",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Logistics Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Express Delivery",
              description:
                "Fast same-day and next-day delivery services with real-time tracking",
              serviceArea: "Worldwide",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "International Shipping",
              description:
                "Global shipping solutions with customs clearance and door-to-door delivery",
              serviceArea: "Worldwide",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Freight Services",
              description:
                "Heavy cargo and freight transportation for businesses",
              serviceArea: "Worldwide",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Warehousing",
              description: "Secure storage and inventory management solutions",
              serviceArea: "North America, Europe, Asia",
            },
          },
        ],
      },
    },
  },
  track: {
    title:
      "Track Your Package - Real-Time Shipping Tracking | Aegis Express Logistics",
    description:
      "Track your packages in real-time with Aegis Express Logistics. Enter your tracking number for instant updates on delivery status, location, and estimated arrival time. 24/7 tracking support.",
    keywords:
      "package tracking, shipment tracking, track package, delivery tracking, real time tracking, package location, delivery status, tracking number, shipment status, logistics tracking",
    canonical: "/track",
    ogTitle: "Track Your Package - Real-Time Shipping Tracking",
    ogDescription:
      "Track your packages in real-time. Enter your tracking number for instant updates on delivery status and location.",
    ogImage: "/assets/og-image-track.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "Track Your Package - Real-Time Delivery Updates",
    twitterDescription:
      "Real-time package tracking with instant updates on delivery status, location, and arrival time.",
    twitterImage: "/assets/twitter-image-track.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Package Tracking System",
      applicationCategory: "Logistics",
      operatingSystem: "Web Browser",
      description:
        "Real-time package tracking system for monitoring shipment status and delivery updates",
      provider: {
        "@type": "Organization",
        name: "Aegis Express Logistics",
      },
      featureList: [
        "Real-time tracking",
        "Delivery notifications",
        "Location updates",
        "Estimated arrival time",
        "Delivery history",
      ],
    },
  },
  contact: {
    title:
      "Contact Aegis Express Logistics - Get Shipping Quotes & Support | 24/7 Customer Service",
    description:
      "Contact Aegis Express Logistics for shipping quotes, customer support, and logistics consultation. Available 24/7 via phone, email, or live chat. Get instant quotes for all your shipping needs.",
    keywords:
      "contact logistics company, shipping quotes, customer support, logistics consultation, 24/7 support, shipping inquiry, freight quote, delivery support, logistics contact, express delivery quote",
    canonical: "/contact",
    ogTitle: "Contact Aegis Express Logistics - 24/7 Customer Support",
    ogDescription:
      "Get shipping quotes, customer support, and logistics consultation. Available 24/7 via phone, email, or live chat.",
    ogImage: "/assets/og-image-contact.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "Contact Aegis Express Logistics - Get Shipping Quotes",
    twitterDescription:
      "24/7 customer support for shipping quotes, logistics consultation, and delivery assistance.",
    twitterImage: "/assets/twitter-image-contact.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      mainEntity: {
        "@type": "Organization",
        name: "Aegis Express Logistics",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+1-555-123-4567",
            contactType: "Customer Service",
            availableLanguage: ["English", "Spanish", "French"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          },
          {
            "@type": "ContactPoint",
            email: "info@aegislogistics.com",
            contactType: "General Inquiries",
          },
          {
            "@type": "ContactPoint",
            email: "quotes@aegislogistics.com",
            contactType: "Sales",
          },
        ],
      },
    },
  },
};

// Additional SEO utilities
export const getPageSEO = (page: string): SEOData => {
  return seoData[page] || seoData.home;
};

export const generateStructuredData = (data: object): string => {
  return JSON.stringify(data);
};

// Common meta tags for all pages
export const commonMeta = {
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1.0",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  language: "en",
  revisitAfter: "7 days",
  distribution: "global",
  rating: "general",
  author: "Aegis Express Logistics",
  publisher: "Aegis Express Logistics",
  copyright: "© 2025 Aegis Express Logistics. All rights reserved.",
  theme: "#3B82F6",
  msapplicationTileColor: "#3B82F6",
  appleStatusBarStyle: "default",
};
