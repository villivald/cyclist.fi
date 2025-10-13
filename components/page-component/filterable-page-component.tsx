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
  const inDescription = item.description?.toLowerCase().includes(q) ?? false;
  const inTags = (item.tags ?? []).some((tag) => tag.toLowerCase().includes(q));
  const inLink = item.link?.toLowerCase().includes(q) ?? false;

  return inTitle || inDescription || inTags || inLink;
}

export default function FilterablePageComponent(
  props: PageComponentProps,
) {
  const { data } = props;

  const tSearch = useTranslations("Search");

  const [query, setQuery] = useState("");

  const filteredData = useMemo(
    () => data.filter((item) => itemMatchesQuery(item, query)),
    [data, query],
  );

  const resultsSummaryId = "page-filter-results-summary";

  return (
    <div className={styles.wrapper}>
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

      <PageComponent {...props} data={filteredData} />
    </div>
  );
}
