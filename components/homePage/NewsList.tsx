import Link from "next/link";
import { useMemo } from "react";

import newsData from "@/data/news.json";
import styles from "@/styles/NewsList.module.css";

import NewsBlock from "./NewsBlock";

export default function NewsList() {
  const firstNewsBlock = useMemo(() => newsData.slice(0, 3), []);
  const secondNewsBlock = useMemo(() => newsData.slice(3, 6), []);

  return (
    <section className={styles.newsContainer}>
      <h2>Last News</h2>
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
        <Link href="/news">News archive</Link>
      </span>
    </section>
  );
}
