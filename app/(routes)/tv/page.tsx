import { metadataElement } from "@/components/metadata";
import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Ohjelmat ja elokuvat",
});

export default function tv() {
  return <div className={styles.mainContainer}></div>;
}
