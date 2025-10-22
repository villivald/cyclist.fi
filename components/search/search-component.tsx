"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "@/styles/SearchComponent.module.css";
import { loadSearchData } from "@/utils/search-data";

import { highlightSearchTerm } from "../../utils/highlight-search-term";
import {
  NewsData,
  RouteData,
  searchContent,
  SearchResult,
} from "../../utils/search-content";
import { useSearchShortcut } from "./use-search-shortcut";

export default function SearchComponent() {
  const router = useRouter();
  const t = useTranslations("Search");
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const [searchData, setSearchData] = useState<{
    routesData: Record<string, RouteData[]>;
    newsData: NewsData[];
  }>({ routesData: {}, newsData: [] });

  const { routesData, newsData } = searchData;

  // Ensure component is mounted before rendering dialog
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadSearchData();
      setSearchData(data);
    };

    if (isOpen) {
      loadData();
    } else {
      setSearchData({ routesData: {}, newsData: [] });
    }
  }, [isOpen]);

  // Keyboard shortcut hook
  const { updateOpenState } = useSearchShortcut(() => setIsOpen(true));

  const resetModalState = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  const handleResultClick = useCallback(
    (result: SearchResult) => {
      if (result.type === "route" && result.routePath) {
        router.push(`/${result.routePath}`);
      } else if (result.type === "news") {
        router.push("/news");
      }

      resetModalState();
    },
    [router, resetModalState],
  );

  // Handle dialog open/close and related effects
  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement as HTMLElement | null;
      dialogRef.current?.showModal();
      inputRef.current?.focus();
      updateOpenState(true);
    } else {
      dialogRef.current?.close();
      updateOpenState(false);
      setQuery("");
      openerRef.current?.focus?.();
    }
  }, [isOpen, updateOpenState]);

  // Search functionality
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Debounce search
    const timeoutId = setTimeout(() => {
      const searchResults = searchContent(query, routesData, newsData, locale);
      setResults(searchResults);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, routesData, newsData, locale]);

  // Don't render dialog until component is mounted (hydration)
  if (!isMounted) return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.searchModal}
      data-visible={isOpen}
      data-testid="search-dialog"
      onClose={() => setIsOpen(false)}
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <h2 id="search-modal-title" className={styles.searchModalTitle}>
        {t("search")}
      </h2>

      <div>
        <button
          className={styles.closeButton}
          type="button"
          onClick={resetModalState}
          aria-label={t("closeSearch")}
          data-testid="search-close-button"
        >
          <Image
            src="/icons/close_color.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className={styles.searchIcon}
          />
        </button>

        <form
          role="search"
          className={styles.searchInputContainer}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.searchField}>
            <Image
              src="/icons/search.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className={styles.searchIcon}
            />
            <input
              id="site-search"
              name="search"
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  resetModalState();
                }
              }}
              placeholder={t("searchPlaceholder")}
              className={styles.searchInput}
              autoComplete="off"
              aria-controls="search-results"
              aria-describedby="search-results-summary"
              aria-autocomplete="list"
              aria-label={t("search")}
              data-testid="search-input"
            />
          </div>
        </form>

        <p
          id="search-results-summary"
          className={styles.resultsHeader}
          data-testid="search-results-summary"
        >
          {results.length}{" "}
          {results.length === 1 ? t("resultsFound") : t("resultsFound_plural")}
        </p>
      </div>

      <div className={styles.resultsArea} id="search-results">
        {isLoading && !results.length && (
          <div
            className={styles.noResults}
            role="status"
            aria-live="polite"
            data-testid="search-loading-spinner"
          >
            <div className={styles.spinner} aria-hidden="true"></div>
          </div>
        )}

        {results.length === 0 && !isLoading && (
          <div className={styles.noResults} role="status" aria-live="polite">
            {query.length > 2 ? (
              <p>{t("noResults")}</p>
            ) : (
              <p data-testid="search-for-guidance">{t("searchFor")}</p>
            )}
          </div>
        )}

        {results.length > 0 && (
          <section
            className={styles.resultsList}
            aria-live="polite"
            aria-busy={isLoading || undefined}
            data-testid="search-results-section"
          >
            <ul id="search-results" data-testid="search-results">
              {results.map((result) => (
                <li
                  key={`${result.type}-${result.id}`}
                  data-testid="search-result-row"
                >
                  <Link
                    href={
                      result.type === "route" && result.routePath
                        ? `/${result.routePath}`
                        : "/news"
                    }
                    className={styles.resultItem}
                    onClick={(e) => {
                      e.preventDefault();
                      handleResultClick(result);
                    }}
                    data-testid={`search-result-link-${result.type}-${result.id}`}
                  >
                    <div className={styles.resultContent}>
                      <div className={styles.resultHeader}>
                        <h3 className={styles.resultTitle}>
                          {highlightSearchTerm(result.title, query)}
                        </h3>

                        <span aria-hidden="true">
                          <Image
                            src={
                              result.type === "route"
                                ? "/icons/link.svg"
                                : "/icons/news.svg"
                            }
                            alt=""
                            aria-hidden="true"
                            width={20}
                            height={20}
                          />
                        </span>
                      </div>

                      <p className={styles.resultDescription}>
                        {highlightSearchTerm(
                          result.description.length > 150
                            ? result.description.substring(0, 150) + "..."
                            : result.description,
                          query,
                        )}
                      </p>

                      {result.tags && result.tags.length > 0 && (
                        <ul className={styles.resultTags}>
                          {result.tags.slice(0, 3).map((tag) => (
                            <li key={tag} className={styles.tag}>
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </dialog>
  );
}
