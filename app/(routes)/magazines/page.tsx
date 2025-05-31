import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "magazines");

export default function magazines() {
  return <div className={styles.mainContainer}></div>;
}
