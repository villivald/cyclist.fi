import { metadataElement } from "@/components/metadata";

import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Lehdet",
});

export default function magazines() {
  return <div className={styles.mainContainer}></div>;
}
