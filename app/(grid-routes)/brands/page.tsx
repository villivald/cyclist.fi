import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "brands");

export default function brands() {
  return <div className={styles.mainContainer}></div>;
}
