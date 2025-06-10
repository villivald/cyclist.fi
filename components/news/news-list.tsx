import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import newsData from "@/data/news.json";
import styles from "@/styles/NewsList.module.css";

import NewsBlock from "./news-block";
import { NewsItem } from "./types";

export default function NewsList() {
  const t = useTranslations("News");

  const firstNewsBlock = useMemo(() => newsData.slice(0, 3), []);
  const secondNewsBlock = useMemo(() => newsData.slice(3, 6), []);

  return (
    <section className={styles.newsContainer}>
      <h2>{t("title")}</h2>
      <article>
        {firstNewsBlock.map((newsItem: NewsItem) => (
          <NewsBlock
            key={newsItem.id}
            image={newsItem.image}
            text={newsItem.text}
            date={newsItem.date}
          />
        ))}
      </article>
      <article>
        {secondNewsBlock.map((newsItem: NewsItem) => (
          <NewsBlock
            key={newsItem.id}
            image={newsItem.image}
            text={newsItem.text}
            date={newsItem.date}
          />
        ))}
      </article>
      <span>
        <Link href="/news">{t("archive")}</Link>
      </span>
    </section>
  );
}
