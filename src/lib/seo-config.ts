/**
 * SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) Configuration
 * Central config for site metadata, canonicals, social cards, regional entities, and JSON-LD schemas.
 */

export const SITE_CONFIG = {
  name: "westbengal.tech",
  shortName: "WB Tech",
  title: "westbengal.tech — West Bengal Developer Network & Tech Ecosystem",
  titleTemplate: "%s | westbengal.tech — West Bengal Tech Guild",
  description:
    "The primary open digital hub for software developers, tech startups, open-source projects, and engineering careers across Kolkata and West Bengal. Built for technologists who want to belong.",
  url: "https://westbengal.tech",
  ogImage: "https://westbengal.tech/images/og-image.png",
  twitterHandle: "@reactkolkata",
  publisher: "React Kolkata / West Bengal Tech Guild",
  
  // GEO (Generative Engine Optimization) Regional Entity Identifiers
  geo: {
    region: "IN-WB",
    placename: "Kolkata, West Bengal, India",
    position: "22.5726;88.3639",
    icbm: "22.5726, 88.3639",
    locality: "Kolkata",
    country: "India",
    state: "West Bengal",
    postalCode: "700091",
    streetAddress: "Sector V, Salt Lake City",
  },

  // Organization Schema Details (for AI Answer Engines like Perplexity & SearchGPT)
  organization: {
    name: "West Bengal Tech Guild",
    alternateName: "westbengal.tech",
    url: "https://westbengal.tech",
    logo: "https://westbengal.tech/brand-logo/west-bengal-tech-full-light.svg",
    sameAs: [
      "https://x.com/reactkolkata",
      "https://github.com/reactkolkata",
    ],
    knowsAbout: [
      "Software Engineering",
      "React & Next.js Frameworks",
      "Open Source Software",
      "Artificial Intelligence & Indic LLMs",
      "Kolkata Technology Ecosystem",
      "West Bengal Developer Communities",
    ],
  },

  // Keywords for Search Engines & Generative LLMs
  keywords: [
    "westbengal.tech",
    "West Bengal Tech",
    "Kolkata Software Engineers",
    "React Kolkata",
    "Open Source Con India",
    "Bengal Tech Startups",
    "Kolkata Tech Meetups",
    "West Bengal Developer Guild",
    "Salt Lake Sector V Tech Hub",
    "New Town Tech Ecosystem",
    "Indic AI Developers",
    "Software Engineering Jobs West Bengal",
    "Tech Communities Kolkata",
  ],
};

/**
 * Generates Root JSON-LD Structured Data Graph for AEO / GEO engines
 */
export function generateRootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization Schema
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.organization.name,
        alternateName: SITE_CONFIG.organization.alternateName,
        url: SITE_CONFIG.organization.url,
        logo: {
          "@type": "ImageObject",
          url: SITE_CONFIG.organization.logo,
          caption: "West Bengal Tech Guild Logo",
        },
        sameAs: SITE_CONFIG.organization.sameAs,
        knowsAbout: SITE_CONFIG.organization.knowsAbout,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_CONFIG.geo.streetAddress,
          addressLocality: SITE_CONFIG.geo.locality,
          addressRegion: SITE_CONFIG.geo.state,
          postalCode: SITE_CONFIG.geo.postalCode,
          addressCountry: SITE_CONFIG.geo.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "22.5726",
          longitude: "88.3639",
        },
      },

      // 2. WebSite Schema with SearchAction
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_CONFIG.url}/project-showcase?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },

      // 3. Community / Place Entity for GEO Answer Engines
      {
        "@type": "Place",
        "@id": `${SITE_CONFIG.url}/#place`,
        name: "West Bengal Tech Hub",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolkata",
          addressRegion: "West Bengal",
          addressCountry: "India",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "22.5726",
          longitude: "88.3639",
        },
      },

      // 4. FAQ Schema for AEO (Answer Engine Optimization)
      {
        "@type": "FAQPage",
        "@id": `${SITE_CONFIG.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is westbengal.tech?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "westbengal.tech is the official open digital community hub unifying software developers, tech startups, open-source projects, and engineering careers across West Bengal, India.",
            },
          },
          {
            "@type": "Question",
            name: "How can developers join the West Bengal Tech community?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Developers can join by creating a profile on westbengal.tech, participating in monthly React Kolkata meetups, contributing to regional open-source repositories, and joining community discussion channels.",
            },
          },
          {
            "@type": "Question",
            name: "What is Open Source Con India Call for Proposals (CFP)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Open Source Con India is an upcoming technical conference inviting speaker proposals from software engineers, open-source maintainers, and tech leaders to share insights and projects.",
            },
          },
        ],
      },
    ],
  };
}
