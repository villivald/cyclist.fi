import { metadataElement } from "@/components/metadata";

import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Kirjat",
});

export default function books() {
  return <div className={styles.mainContainer}></div>;
}
