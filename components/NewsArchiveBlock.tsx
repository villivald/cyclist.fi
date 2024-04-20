import styles from "@/styles/NewsArchiveBlock.module.css";

interface Props {
  image: string;
  text: string;
  date: string;
}

export default function NewsArchiveBlock({ image, text, date }: Props) {
  return (
    <section className={styles.newsArchiveBlock}>
      <p style={{ backgroundImage: `url(/images/${image})` }}></p>
      <article>
        <p>{text}</p>
        <p>{date}</p>
      </article>
    </section>
  );
}
