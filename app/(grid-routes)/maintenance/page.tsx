import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "maintenance");

export default function maintenance() {
  return <div className={styles.mainContainer}></div>;
}
