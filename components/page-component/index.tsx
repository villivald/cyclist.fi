import styles from "@/styles/PageComponent.module.css";

import DataRow from "./data-row";
import { PageComponentData } from "./types";

export default function PageComponent({ data }: { data: PageComponentData[] }) {
  return (
    <div className={styles.mainContainer}>
      {data.map((item, index) => (
        <DataRow item={item} key={index} />
      ))}
    </div>
  );
}
