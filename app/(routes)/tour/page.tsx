import { metadataElement } from "@/components/metadata";

import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Kilpailut",
});

export default function tour() {
  return <div className={styles.mainContainer}></div>;
}
