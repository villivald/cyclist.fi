import Image from "next/image";

import styles from "@/styles/NewsArchiveBlock.module.css";

import { NewsItem } from "./types";

export default function NewsArchiveBlock({ image, text, date }: NewsItem) {
  return (
    <section className={styles.newsArchiveBlock} aria-label={date}>
      <div aria-hidden="true">
        <Image
          fill
          src={`/images/${image}`}
          alt=""
          sizes="(max-width: 500px) 100vw, 25vw"
        />
      </div>
      <article>
        <p>{text}</p>
        <p>{date}</p>
      </article>
    </section>
  );
}
