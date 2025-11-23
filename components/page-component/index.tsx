import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/PageComponent.module.css";

import DataRow from "./data-row";
import { PageComponentProps } from "./types";

export default function PageComponent({
  data,
  routeStyles,
  layout = "list",
  showTags = false,
  showNew = false,
  commentNamespace,
}: PageComponentProps) {
  const t = useTranslations("Search");

  const containerClass = `${styles.mainContainer} ${styles[`layout-${layout}`]}`;

  return (
    <>
      <div className={containerClass}>
        {!data.length && (
          <p className={styles.noDataMessage}>{t("noResults")}</p>
        )}
        {data.map((item, index) => (
          <DataRow
            key={item.id || index}
            routeStyles={routeStyles}
            item={item}
            layout={layout}
            localImage={item.image}
            showTags={showTags}
            showNew={showNew}
            commentNamespace={commentNamespace}
          />
        ))}
      </div>
      <Link href="/contact" className={styles.proposeLink}>
        {t("proposeLink")}
      </Link>
    </>
  );
}
