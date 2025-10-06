import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import SkipLinks from "@/components/skip-links";
import Header from "@/components/top-menu/header";

import ThemeProvider from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://cyclist.fi"),
  applicationName: "Cyclist.fi",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Cyclist.fi",
  },
  openGraph: {
    type: "website",
    url: "https://cyclist.fi",
    siteName: "Cyclist.fi",
    title: "Cyclist.fi",
    description: "Cycling news, routes, gear and community",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyclist.fi",
    description: "Cycling news, routes, gear and community",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>
            <SkipLinks />
            <Header />
            {children}
            <Footer />
            <ScrollToTopButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
