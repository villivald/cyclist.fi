import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";

import styles from "@/styles/NewsBlock.module.css";

import { Linkify } from "./linkify";
import { NewsItem } from "./types";

export default async function NewsBlock({
  id,
  text_fi,
  text_en,
  date,
}: NewsItem) {
  const locale = await getLocale();

  const text = locale === "fi" ? text_fi : text_en;

  const textToRender = text.length > 125 ? text.slice(0, 120) + " ..." : text;

  return (
    <section className={styles.newsBlock}>
      <div aria-hidden="true">
        <Image
          fill
          src={`/images/news/${id}.avif`}
          alt=""
          sizes="(max-width: 900px) 25vw, (max-width: 1600px) 33vw, 20vw"
        />
      </div>
      <Linkify>{textToRender}</Linkify>
      <Link href="/news">{date}</Link>
    </section>
  );
}
