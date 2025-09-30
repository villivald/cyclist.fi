import RouteTitle from "@/components/route-title";
import styles from "@/styles/Routes.module.css";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className={styles.layout}>
      <RouteTitle />
      {children}
    </main>
  );
}
