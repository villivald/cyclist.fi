"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useMemo } from "react";

import FilterablePageComponent from "@/components/page-component/filterable-page-component";
import styles from "@/styles/SavedPage.module.css";
import { getRouteColor } from "@/utils/get-route-color";

import { useSaved } from "./saved-context";

type SavedPageProps = {
  routeStyles?: React.CSSProperties;
};

export default function SavedPage({ routeStyles }: SavedPageProps) {
  const t = useTranslations("Common");
  const { clearAllSaved, savedItems } = useSaved();
  const { theme } = useTheme();

  const data = useMemo(
    () =>
      savedItems.map((item) => ({
        ...item.snapshot,
        route: item.snapshot.route ?? item.route,
      })),
    [savedItems],
  );

  const resolvedRouteStyles =
    routeStyles ??
    ({
      "--routeColor": `var(--color-${getRouteColor("saved")})`,
    } as React.CSSProperties);

  const handleClearSaved = () => {
    if (!savedItems.length) return;

    const shouldClear = window.confirm(
      t("savedClearConfirm", { count: savedItems.length }),
    );
    if (!shouldClear) return;

    clearAllSaved();
  };

  return (
    <FilterablePageComponent
      data={data}
      routeStyles={resolvedRouteStyles}
      layout="grid"
      showTags={true}
      showNew={true}
      emptyMessage={t("savedEmpty")}
      filterBarAction={
        savedItems.length > 0 ? (
          <button
            type="button"
            data-theme={theme}
            className={styles.clearAllButton}
            onClick={handleClearSaved}
            data-testid="clear-saved-button"
            aria-label={t("savedClearAll")}
          >
            {t("savedClearAll")}
          </button>
        ) : undefined
      }
    />
  );
}
