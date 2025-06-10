import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "places");

export default function places() {
  return <div className={styles.mainContainer}></div>;
}
