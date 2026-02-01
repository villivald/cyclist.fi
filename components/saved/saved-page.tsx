"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import FilterablePageComponent from "@/components/page-component/filterable-page-component";
import { getRouteColor } from "@/utils/get-route-color";

import { useSaved } from "./saved-context";

type SavedPageProps = {
  routeStyles?: React.CSSProperties;
};

export default function SavedPage({ routeStyles }: SavedPageProps) {
  const t = useTranslations("Common");
  const { savedItems } = useSaved();

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

  return (
    <FilterablePageComponent
      data={data}
      routeStyles={resolvedRouteStyles}
      layout="grid"
      showTags={true}
      showNew={true}
      emptyMessage={t("savedEmpty")}
    />
  );
}
