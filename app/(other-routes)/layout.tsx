import { ViewTransition } from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </ViewTransition>
  );
}
