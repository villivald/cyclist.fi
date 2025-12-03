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

  return (
    <section className={styles.newsBlock}>
      <div aria-hidden="true">
        <Image
          fill
          src={`/images/news/${id}.avif`}
          alt=""
          sizes="(max-width: 900px) 25vw, (max-width: 1600px) 33vw, 20vw"
          placeholder="blur"
          // blur data generated from https://png-pixel.com/
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkaGioBwADCQGBFoVLOAAAAABJRU5ErkJggg=="
        />
      </div>
      <Linkify className={styles.newsText}>{text}</Linkify>
      <Link href="/news">{date}</Link>
    </section>
  );
}
