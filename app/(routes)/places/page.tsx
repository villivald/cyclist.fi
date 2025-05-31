import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "places");

export default function places() {
  return <div className={styles.mainContainer}></div>;
}
