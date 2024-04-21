import NewsArchiveBlock from "@/components/NewsArchiveBlock";
import { metadataElement } from "@/components/metadata";

import newsData from "@/data/news.json";

import styles from "@/styles/NewsArchiveBlock.module.css";

export const metadata = metadataElement({
  title: "Uutiset",
});

export default function news() {
  return (
    <div>
      <h1 className={styles.title}>UUTISET</h1>
      {newsData.map((newsItem) => (
        <NewsArchiveBlock
          key={newsItem.id}
          image={newsItem.image}
          text={newsItem.text}
          date={newsItem.date}
        />
      ))}
    </div>
  );
}
