import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "youtube");

export default function youtube() {
  return <div className={styles.mainContainer}></div>;
}
