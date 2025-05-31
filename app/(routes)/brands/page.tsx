import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "brands");

export default function brands() {
  return <div className={styles.mainContainer}></div>;
}
