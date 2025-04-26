import { metadataElement } from "@/components/metadata";
import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Youtube",
});

export default function youtube() {
  return <div className={styles.mainContainer}></div>;
}
