import Image from "next/image";
import { getLocale } from "next-intl/server";

import styles from "@/styles/NewsArchiveBlock.module.css";

import { NewsItem } from "./types";

export default async function NewsArchiveBlock({
  id,
  text_en,
  text_fi,
  date,
}: NewsItem) {
  const locale = await getLocale();

  const text = locale === "fi" ? text_fi : text_en;

  return (
    <section className={styles.newsArchiveBlock}>
      <div aria-hidden="true">
        <Image
          fill
          src={`/images/news/${id}.avif`}
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
