import { metadataElement } from "@/components/metadata";

import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Kaupunkipyörät",
});

export default function sharing() {
  return <div className={styles.mainContainer}></div>;
}
