import { geistMono, inter, unbounded } from "@/lib/fonts";
import RootProvider from "./providers";
import { SITE_CONFIG, generateRootJsonLd } from "@/lib/seo-config";
import { JsonLd } from "@/components/custom/json-ld";
import { MAIN_METADATA } from "@/base/meta/main-metadata";

import "./globals.css";

export const metadata = MAIN_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
