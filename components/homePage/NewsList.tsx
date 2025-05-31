import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import newsData from "@/data/news.json";
import styles from "@/styles/NewsList.module.css";

import NewsBlock from "./NewsBlock";

export default function NewsList() {
  const t = useTranslations("News");

  const firstNewsBlock = useMemo(() => newsData.slice(0, 3), []);
  const secondNewsBlock = useMemo(() => newsData.slice(3, 6), []);

  return (
    <section className={styles.newsContainer}>
      <h2>{t("title")}</h2>
      <article>
        {firstNewsBlock.map((news) => (
          <NewsBlock
            key={news.id}
            image={news.image}
            text={news.text}
            date={news.date}
          />
        ))}
      </article>
      <article>
        {secondNewsBlock.map((news) => (
          <NewsBlock
            key={news.id}
            image={news.image}
            text={news.text}
            date={news.date}
          />
        ))}
      </article>
      <span>
        <Link href="/news">{t("archive")}</Link>
      </span>
    </section>
  );
}
