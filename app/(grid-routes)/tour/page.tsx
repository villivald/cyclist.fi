import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "tour");

export default function tour() {
  return <div className={styles.mainContainer}></div>;
}
