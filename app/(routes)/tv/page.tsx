import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "tv");

export default function tv() {
  return <div className={styles.mainContainer}></div>;
}
