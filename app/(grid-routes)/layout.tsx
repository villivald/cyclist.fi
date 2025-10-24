import { ViewTransition } from "react";

import RouteTitle from "@/components/route-title";
import styles from "@/styles/Routes.module.css";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition>
      <main id="main-content" className={styles.layout} tabIndex={-1}>
        <RouteTitle />
        {children}
      </main>
    </ViewTransition>
  );
}
