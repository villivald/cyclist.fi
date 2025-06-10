import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "tv");

export default function tv() {
  return <div className={styles.mainContainer}></div>;
}
