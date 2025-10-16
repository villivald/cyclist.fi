import { useTranslations } from "next-intl";
import type { Metadata } from "next";

import Pagination from "@/components/pagination";
import NewsArchiveBlock from "@/components/news/news-archive-block";
import type { NewsItem } from "@/components/news/types";
import newsData from "@/data/news.json";
import styles from "@/styles/NewsArchiveBlock.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { DEFAULT_PAGE_SIZE, paginateArray } from "@/utils/pagination";

export const metadata = () => createTranslatedMetadata("Pages", "news");

export function generateMetadata({
  searchParams,
}: NewsPageProps): Metadata | Promise<Metadata> {
  const page = Number.parseInt(
    Array.isArray(searchParams?.page) ? searchParams?.page[0] ?? "1" : searchParams?.page ?? "1",
    10,
  );
  const total = Math.max(1, Math.ceil((newsData as unknown as NewsItem[]).length / DEFAULT_PAGE_SIZE));
  const current = Number.isFinite(page) && page >= 1 ? Math.min(page, total) : 1;
  const base = "/news";
  return {
    title: `Cyclist.fi | News${current > 1 ? ` – Page ${current}` : ""}`,
    alternates: {
      canonical: current === 1 ? base : `${base}?page=${current}`,
    },
  };
}

type NewsPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function News({ searchParams }: NewsPageProps) {
  const t = useTranslations("Pages");

  const rawPage = searchParams?.page;
  const pageParam = Array.isArray(rawPage)
    ? rawPage[0]
    : (rawPage ?? "1");
  const requestedPage = Number.isFinite(Number.parseInt(pageParam, 10))
    ? Number.parseInt(pageParam, 10)
    : 1;

  const allNews = newsData as unknown as NewsItem[];
  const paginated = paginateArray(allNews, requestedPage, DEFAULT_PAGE_SIZE);

  return (
    <div>
      <h1 className={styles.title}>{t("news")}</h1>
      {paginated.items.map((newsItem: NewsItem) => (
        <NewsArchiveBlock
          key={newsItem.id}
          image={newsItem.image}
          text={newsItem.text}
          date={newsItem.date}
        />
      ))}
      <Pagination
        basePath="/news"
        currentPage={paginated.currentPage}
        totalPages={paginated.totalPages}
        ariaLabel={`${t("news")} pagination`}
      />
    </div>
  );
}
