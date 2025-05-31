import { useTranslations } from "next-intl";
import { createTranslatedMetadata } from "utils/generateMetadata";

import NewsArchiveBlock from "@/components/NewsArchiveBlock";
import newsData from "@/data/news.json";
import styles from "@/styles/NewsArchiveBlock.module.css";

export const metadata = () => createTranslatedMetadata("Pages", "news");

interface NewsItem {
  id: string;
  image: string;
  text: string;
  date: string;
}

export default function News() {
  const t = useTranslations("Pages");
  return (
    <div>
      <h1 className={styles.title}>{t("news")}</h1>
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
