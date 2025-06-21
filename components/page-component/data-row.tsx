import Image from "next/image";

import styles from "@/styles/PageComponent.module.css";

import { PageComponentData } from "./types";

export default function DataRow({ item }: { item: PageComponentData }) {
  return (
    <div className={styles.dataRow}>
      <Image width={300} height={200} src={item.image} alt={item.alt} />
      <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <a href={item.link}>Learn more</a>
      </div>
    </div>
  );
}
