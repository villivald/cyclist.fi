import { metadataElement } from "@/components/metadata";

import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Huolto",
});

export default function caring() {
  return <div className={styles.mainContainer}></div>;
}
