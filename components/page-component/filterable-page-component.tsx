"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import styles from "@/styles/PageFilter.module.css";

import PageComponent from ".";
import type { PageComponentData, PageComponentProps } from "./types";

function itemMatchesQuery(item: PageComponentData, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const inTitle = item.title?.toLowerCase().includes(q) ?? false;
  const descriptionText =
    `${item.description_en} ${item.description_fi}`.toLowerCase();
  const inDescription = descriptionText.includes(q);
  const inTags = (item.tags ?? []).some((tag) => tag.toLowerCase().includes(q));
  const inLink = item.link?.toLowerCase().includes(q) ?? false;

  return inTitle || inDescription || inTags || inLink;
}

export default function FilterablePageComponent(props: PageComponentProps) {
  const { data, routeStyles, commentNamespace } = props;

  const tSearch = useTranslations("Search");

  const [query, setQuery] = useState("");

  const normalizedData: PageComponentData[] = useMemo(() => {
    return data.map((item: PageComponentData & { description?: string }) => ({
      ...item,
      description_en: item.description_en ?? item.description ?? "",
      description_fi: item.description_fi ?? item.description ?? "",
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return normalizedData.filter((item) => itemMatchesQuery(item, query));
  }, [normalizedData, query]);

  const resultsSummaryId = "page-filter-results-summary";

  return (
    <div className={styles.wrapper} style={routeStyles}>
      <form
        role="search"
        aria-label={tSearch("search")}
        className={styles.filterBar}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.field}>
          <Image
            src="/icons/search.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className={styles.icon}
          />
          <input
            id="page-filter-input"
            type="search"
            className={styles.input}
            placeholder={tSearch("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby={resultsSummaryId}
            aria-label={tSearch("search")}
            autoComplete="off"
          />
        </div>
        <p id={resultsSummaryId} className={styles.resultsSummary}>
          {filteredData.length} / {data.length}
        </p>
      </form>

      <PageComponent
        {...props}
        data={filteredData}
        commentNamespace={commentNamespace}
      />
    </div>
  );
}
