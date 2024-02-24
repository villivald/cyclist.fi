"use client";

import { usePathname } from "next/navigation";

import styles from "@/styles/Routes.module.css";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const title = usePathname().substring(1).toUpperCase();

  return (
    <div className={styles.layout}>
      <h1
        className={styles.title}
        style={{ "--stringLength": title.length } as React.CSSProperties}
      >
        {title}
      </h1>
      {children}
    </div>
  );
}
