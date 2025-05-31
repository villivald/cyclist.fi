import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "discounts");

export default function discounts() {
  return <div className={styles.mainContainer}></div>;
}
