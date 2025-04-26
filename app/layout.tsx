import "@/styles/globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

import { ThemeProvider } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <ThemeProvider>
        <body>
          <Header />
          {children}
          <Footer />
          <ScrollToTopButton />
        </body>
      </ThemeProvider>
    </html>
  );
}
