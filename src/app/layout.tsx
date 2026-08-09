import type { Metadata } from "next";
import { geistMono, inter } from "@/lib/fonts";
import RootProvider from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Feed | West Bengal Tech",
  description: "The Official Technology Hub of West Bengal",
  icons: {
    icon: "/brand-logo/west-bengal-tech-icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
