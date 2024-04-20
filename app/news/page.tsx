import NewsArchiveBlock from "@/components/NewsArchiveBlock";
import { metadataElement } from "@/components/metadata";

import newsData from "@/data/news.json";

export const metadata = metadataElement({
  title: "Uutiset",
});

export default function news() {
  return (
    <div>
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
