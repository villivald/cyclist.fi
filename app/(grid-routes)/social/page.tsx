import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "social");

export default function social() {
  return <div className={styles.mainContainer}></div>;
}
