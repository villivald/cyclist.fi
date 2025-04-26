import { metadataElement } from "@/components/metadata";
import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Some",
});

export default function social() {
  return <div className={styles.mainContainer}></div>;
}
