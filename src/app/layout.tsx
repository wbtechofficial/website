import type { Metadata } from "next";
import { geistMono, inter, unbounded } from "@/lib/fonts";
import RootProvider from "./providers";
import { SITE_CONFIG, generateRootJsonLd } from "@/lib/seo-config";
import { JsonLd } from "@/components/custom/json-ld";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.publisher, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.publisher,
  publisher: SITE_CONFIG.publisher,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "westbengal.tech — West Bengal Tech Community & Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand-logo/west-bengal-tech-short-teal.svg",
    apple: "/brand-logo/west-bengal-tech-short-teal.svg",
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const rootJsonLd = generateRootJsonLd();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${unbounded.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        {/* GEO (Generative Engine Optimization) Regional Meta Tags */}
        <meta name="geo.region" content={SITE_CONFIG.geo.region} />
        <meta name="geo.placename" content={SITE_CONFIG.geo.placename} />
        <meta name="geo.position" content={SITE_CONFIG.geo.position} />
        <meta name="ICBM" content={SITE_CONFIG.geo.icbm} />
        <JsonLd data={rootJsonLd} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
