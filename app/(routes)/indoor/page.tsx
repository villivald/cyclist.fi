import { metadataElement } from "@/components/metadata";
import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Sisäpyöräily",
});

export default function indoor() {
  return <div className={styles.mainContainer}></div>;
}
