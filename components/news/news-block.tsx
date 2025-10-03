import Image from "next/image";

import styles from "@/styles/NewsBlock.module.css";

import { NewsItem } from "./types";

export default function NewsBlock({ image, text, date }: NewsItem) {
  return (
    <section className={styles.newsBlock}>
      <div aria-hidden="true">
        <Image
          fill
          src={`/images/${image}`}
          alt=""
          sizes="(max-width: 900px) 25vw, (max-width: 1600px) 33vw, 20vw"
        />
      </div>
      <p>{text.length > 125 ? text.slice(0, 120) + "..." : text}</p>
      <p>{date}</p>
    </section>
  );
}
