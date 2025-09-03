import { Helmet } from "react-helmet-async";
import {
  getPageSEO,
  generateStructuredData,
  commonMeta,
} from "@/utils/seoData";

interface SEOHelmetProps {
  page: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  page,
  customTitle,
  customDescription,
  customKeywords,
}) => {
  const seoData = getPageSEO(page);

  const title = customTitle || seoData.title;
  const description = customDescription || seoData.description;
  const keywords = customKeywords || seoData.keywords;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <meta charSet={commonMeta.charset} />
      <meta name="viewport" content={commonMeta.viewport} />
      <meta name="robots" content={commonMeta.robots} />
      <meta name="language" content={commonMeta.language} />
      <meta name="revisit-after" content={commonMeta.revisitAfter} />
      <meta name="distribution" content={commonMeta.distribution} />
      <meta name="rating" content={commonMeta.rating} />
      <meta name="author" content={commonMeta.author} />
      <meta name="publisher" content={commonMeta.publisher} />
      <meta name="copyright" content={commonMeta.copyright} />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {seoData.canonical && (
        <link
          rel="canonical"
          href={`https://aegislogistics.com${seoData.canonical}`}
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoData.ogType || "website"} />
      <meta
        property="og:url"
        content={`https://aegislogistics.com${seoData.canonical || ""}`}
      />
      <meta property="og:title" content={seoData.ogTitle || title} />
      <meta
        property="og:description"
        content={seoData.ogDescription || description}
      />
      {seoData.ogImage && (
        <meta
          property="og:image"
          content={`https://aegislogistics.com${seoData.ogImage}`}
        />
      )}
      <meta property="og:site_name" content="Aegis Express Logistics" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta
        property="twitter:card"
        content={seoData.twitterCard || "summary_large_image"}
      />
      <meta
        property="twitter:url"
        content={`https://aegislogistics.com${seoData.canonical || ""}`}
      />
      <meta property="twitter:title" content={seoData.twitterTitle || title} />
      <meta
        property="twitter:description"
        content={seoData.twitterDescription || description}
      />
      {seoData.twitterImage && (
        <meta
          property="twitter:image"
          content={`https://aegislogistics.com${seoData.twitterImage}`}
        />
      )}
      <meta name="twitter:creator" content="@aegislogistics" />

      {/* Favicons and Theme */}
      <meta name="theme-color" content={commonMeta.theme} />
      <meta
        name="msapplication-TileColor"
        content={commonMeta.msapplicationTileColor}
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content={commonMeta.appleStatusBarStyle}
      />

      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Aegis Express" />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* Structured Data */}
      {seoData.structuredData && (
        <script type="application/ld+json">
          {generateStructuredData(seoData.structuredData)}
        </script>
      )}

      {/* Additional Business Schema for Local SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Aegis Express Logistics",
          image: "https://aegislogistics.com/assets/logo.png",
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
          geo: {
            "@type": "GeoCoordinates",
            latitude: 40.7128,
            longitude: -74.006,
          },
          url: "https://aegislogistics.com",
          openingHoursSpecification: {
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
          priceRange: "$$",
          paymentAccepted: ["Cash", "Credit Card", "Invoice"],
          currenciesAccepted: "USD",
        })}
      </script>

      {/* Breadcrumb Schema */}
      {page !== "home" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://aegislogistics.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: page.charAt(0).toUpperCase() + page.slice(1),
                item: `https://aegislogistics.com/${page}`,
              },
            ],
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;
