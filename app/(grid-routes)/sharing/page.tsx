import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "sharing");

export default function sharing() {
  return <div className={styles.mainContainer}></div>;
}
