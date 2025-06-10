import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "youtube");

export default function youtube() {
  return <div className={styles.mainContainer}></div>;
}
