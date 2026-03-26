import FilterablePageComponent from "@/components/page-component/filterable-page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";
import { loadRouteData } from "@/utils/load-route-data";
import { getRoute, ROUTE_SLUGS } from "@/utils/route-manifest";

export const dynamicParams = false;

type Params = { route: string };

export function generateStaticParams(): Params[] {
  return ROUTE_SLUGS.map((route) => ({ route }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { route } = await params;
  return await createTranslatedMetadata("Pages", route);
}

export default async function RoutePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { route } = await params;
  const entry = getRoute(route)!;

  const data = await loadRouteData(route);
  const routeColor = getRouteColor(route);

  const routeStyles = {
    "--routeColor": `var(--color-${routeColor})`,
  } as React.CSSProperties;

  return (
    <div className={styles.mainContainer}>
      <FilterablePageComponent
        data={data}
        routeStyles={routeStyles}
        layout={entry.layout}
        showTags={true}
        showNew={true}
        commentNamespace={route}
      />
    </div>
  );
}
