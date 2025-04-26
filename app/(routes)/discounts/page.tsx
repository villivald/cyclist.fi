import { metadataElement } from "@/components/metadata";
import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Ale",
});

export default function discounts() {
  return <div className={styles.mainContainer}></div>;
}
