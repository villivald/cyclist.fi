import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "indoor");

export default function indoor() {
  return <div className={styles.mainContainer}></div>;
}
