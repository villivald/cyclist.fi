import styles from "@/styles/NewsArchiveBlock.module.css";

import { NewsItem } from "./types";

export default function NewsArchiveBlock({ image, text, date }: NewsItem) {
  return (
    <section className={styles.newsArchiveBlock}>
      <p style={{ backgroundImage: `url(/images/${image})` }}></p>
      <article>
        <p>{text}</p>
        <p>{date}</p>
      </article>
    </section>
  );
}
