import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "podcasts");

export default function podcasts() {
  return <div className={styles.mainContainer}></div>;
}
