import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "tour");

export default function tour() {
  return <div className={styles.mainContainer}></div>;
}
