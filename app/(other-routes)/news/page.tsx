import { useTranslations } from "next-intl";

import NewsArchiveBlock from "@/components/news/news-archive-block";
import { NewsItem } from "@/components/news/types";
import newsData from "@/data/news.json";
import styles from "@/styles/NewsArchiveBlock.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export async function generateMetadata() {
  return await createTranslatedMetadata("Pages", "news");
}

export default function News() {
  const t = useTranslations("Pages");

  return (
    <div>
      <h1 className={styles.title}>{t("news")}</h1>
      {newsData.map((newsItem: NewsItem) => (
        <NewsArchiveBlock
          key={newsItem.id}
          id={newsItem.id}
          text_en={newsItem.text_en}
          text_fi={newsItem.text_fi}
          date={newsItem.date}
        />
      ))}
    </div>
  );
}
