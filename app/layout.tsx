import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body>
        <aside></aside>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
