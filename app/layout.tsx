import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import Header from "@/components/top-menu/header";

import ThemeProvider from "./providers";

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
            <Header />
            {children}
            <Footer />
            <ScrollToTopButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
