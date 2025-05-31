import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "caring");

export default function caring() {
  return <div className={styles.mainContainer}></div>;
}
