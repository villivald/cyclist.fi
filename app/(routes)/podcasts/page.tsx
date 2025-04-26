import { metadataElement } from "@/components/metadata";
import styles from "@/styles/Routes.module.css";

export const metadata = metadataElement({
  title: "Podcastit",
});

export default function podcasts() {
  return <div className={styles.mainContainer}></div>;
}
