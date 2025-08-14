import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "community");

export default function community() {
  return <div className={styles.mainContainer}></div>;
}
