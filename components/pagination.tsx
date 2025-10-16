"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  ariaLabel?: string;
}

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
  ariaLabel,
}: PaginationProps) {
  const t = useTranslations("Common");
  const searchParams = useSearchParams();

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? undefined);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label={ariaLabel ?? t("pagination")} style={{ display: "flex", gap: "0.5rem", justifyContent: "center", margin: "2rem 0" }}>
      <Link
        href={hasPrev ? buildHref(currentPage - 1) : "#"}
        aria-disabled={!hasPrev}
        aria-label="Previous page"
        rel={hasPrev ? "prev" : undefined}
        style={{ pointerEvents: hasPrev ? undefined : "none", opacity: hasPrev ? 1 : 0.5 }}
      >
        ← {t("prev")}
      </Link>
      <span aria-current="page">{currentPage}</span>
      <span>/</span>
      <span>{totalPages}</span>
      <Link
        href={hasNext ? buildHref(currentPage + 1) : "#"}
        aria-disabled={!hasNext}
        aria-label="Next page"
        rel={hasNext ? "next" : undefined}
        style={{ pointerEvents: hasNext ? undefined : "none", opacity: hasNext ? 1 : 0.5 }}
      >
        {t("next")} →
      </Link>
    </nav>
  );
}
