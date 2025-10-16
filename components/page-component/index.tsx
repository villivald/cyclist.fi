import styles from "@/styles/PageComponent.module.css";

import DataRow from "./data-row";
import { PageComponentProps } from "./types";

export default function PageComponent({
  data,
  routeStyles,
  layout = "list",
  showTags = false,
  showNew = false,
}: PageComponentProps) {
  const containerClass = `${styles.mainContainer} ${styles[`layout-${layout}`]}`;

  return (
    <div className={containerClass}>
      {data.map((item, index) => (
        <DataRow
          key={item.id || index}
          routeStyles={routeStyles}
          item={item}
          layout={layout}
          localImage={item.image}
          showTags={showTags}
          showNew={showNew}
        />
      ))}
    </div>
  );
}
