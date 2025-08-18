import PageComponent from "@/components/page-component";
import discountsData from "@/data/routes/discounts.json" with { type: "json" };
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "discounts";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function discounts() {
  const data = discountsData;

  const routeColor = getRouteColor(ROUTE_NAME);

  const routeStyles = {
    "--routeColor": `var(--color-${routeColor})`,
  } as React.CSSProperties;

  return (
    <div className={styles.mainContainer}>
      <PageComponent
        data={data}
        routeStyles={routeStyles}
        layout="list"
        showTags={true}
        showNew={true}
      />
    </div>
  );
}
