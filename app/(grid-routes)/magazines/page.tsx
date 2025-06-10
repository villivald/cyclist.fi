import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "magazines");

export default function magazines() {
  return <div className={styles.mainContainer}></div>;
}
