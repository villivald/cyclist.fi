import { createTranslatedMetadata } from "utils/generateMetadata";

import styles from "@/styles/Routes.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "sharing");

export default function sharing() {
  return <div className={styles.mainContainer}></div>;
}
