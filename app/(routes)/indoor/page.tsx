import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "indoor");

export default function indoor() {
  return <div className={styles.mainContainer}></div>;
}
