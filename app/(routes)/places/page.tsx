import { metadataElement } from "@/components/metadata";
import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Paikat",
});

export default function places() {
  return <div className={styles.mainContainer}></div>;
}
