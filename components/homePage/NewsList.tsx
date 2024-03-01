import Link from "next/link";

import NewsBlock from "./NewsBlock";

import styles from "@/styles/NewsList.module.css";

const placeholderText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const placeholderDate = "01.03.2024";
const placeholderImage = "bg_xs.webp";

export default function NewsList() {
  return (
    <section className={styles.newsContainer}>
      <h2>Last News</h2>
      <article>
        <NewsBlock
          image={placeholderImage}
          text={placeholderText}
          date={placeholderDate}
        />
        <NewsBlock
          image={placeholderImage}
          text={placeholderText}
          date={placeholderDate}
        />
        <NewsBlock
          image={placeholderImage}
          text={placeholderText}
          date={placeholderDate}
        />
      </article>
      <article>
        <NewsBlock
          image={placeholderImage}
          text={placeholderText}
          date={placeholderDate}
        />
        <NewsBlock
          image={placeholderImage}
          text={placeholderText}
          date={placeholderDate}
        />
        <NewsBlock
          image={placeholderImage}
          text={placeholderText}
          date={placeholderDate}
        />
      </article>
      <span>
        <Link href="/news">News archive</Link>
      </span>
    </section>
  );
}
