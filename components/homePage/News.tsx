import Link from "next/link";

import styles from "@/styles/News.module.css";

export default function News() {
  return (
    <section className={styles.newsContainer}>
      <h2>Last News</h2>
      <article>
        <section>
          <p></p>
          <p>News Content</p>
        </section>
        <section>
          <p></p>
          <p>News Content</p>
        </section>
        <section>
          <p></p>
          <p>News Content</p>
        </section>
      </article>
      <article>
        <section>
          <p></p>
          <p>News Content</p>
        </section>
        <section>
          <p></p>
          <p>News Content</p>
        </section>
        <section>
          <p></p>
          <p>News Content</p>
        </section>
      </article>
      <span>
        <Link href="/news">News archive</Link>
      </span>
    </section>
  );
}
