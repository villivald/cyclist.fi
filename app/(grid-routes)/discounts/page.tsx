import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "discounts");

export default function discounts() {
  return <div className={styles.mainContainer}></div>;
}
