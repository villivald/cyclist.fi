import { metadataElement } from "@/components/metadata";
import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Brändit",
});

export default function brands() {
  return <div className={styles.mainContainer}></div>;
}
