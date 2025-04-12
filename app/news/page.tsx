import NewsArchiveBlock from "@/components/NewsArchiveBlock";
import { metadataElement } from "@/components/metadata";

import newsData from "@/data/news.json";

import styles from "@/styles/NewsArchiveBlock.module.css";

export const metadata = metadataElement({
  title: "Uutiset",
});

interface NewsItem {
  id: string;
  image: string;
  text: string;
  date: string;
}

export default function news() {
  return (
    <div>
      <h1 className={styles.title}>UUTISET</h1>
      {newsData.map((newsItem: NewsItem) => (
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
