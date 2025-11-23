import FilterablePageComponent from "@/components/page-component/filterable-page-component";
import apparelData from "@/data/routes/apparel.json" with { type: "json" };
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "apparel";

export async function generateMetadata() {
  return await createTranslatedMetadata("Pages", ROUTE_NAME);
}

export default function apparel() {
  const data = apparelData;

  const routeColor = getRouteColor(ROUTE_NAME);

  const routeStyles = {
    "--routeColor": `var(--color-${routeColor})`,
  } as React.CSSProperties;

  return (
    <div className={styles.mainContainer}>
      <FilterablePageComponent
        data={data}
        routeStyles={routeStyles}
        layout="grid"
        showTags={true}
        showNew={true}
        commentNamespace={ROUTE_NAME}
      />
    </div>
  );
}
