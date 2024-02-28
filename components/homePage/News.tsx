import Link from "next/link";

import styles from "@/styles/News.module.css";

export default function News() {
  return (
    <section className={styles.newsContainer}>
      <h2>Last News</h2>
      <article>
        <section>
          <p></p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            suscipit, justo eget tincidunt tincidunt, justo justo tincidunt
            tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </section>
        <section>
          <p></p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            suscipit, justo eget tincidunt tincidunt, justo justo tincidunt
            tincidunt.
          </p>
        </section>
        <section>
          <p></p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            suscipit.
          </p>
        </section>
      </article>
      <article>
        <section>
          <p></p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            suscipit, justo eget tincidunt tincidunt, justo justo tincidunt
            tincidunt.
          </p>
        </section>
        <section>
          <p></p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            suscipit, justo eget tincidunt tincidunt, justo.
          </p>
        </section>
        <section>
          <p></p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            suscipit, justo eget tincidunt tincidunt, justo justo tincidunt
            tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec suscipit.
          </p>
        </section>
      </article>
      <span>
        <Link href="/news">News archive</Link>
      </span>
    </section>
  );
}
