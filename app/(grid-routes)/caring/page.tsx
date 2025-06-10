import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "caring");

export default function caring() {
  return <div className={styles.mainContainer}></div>;
}
