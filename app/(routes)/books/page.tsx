import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "books");

export default function books() {
  return <div className={styles.mainContainer}></div>;
}
