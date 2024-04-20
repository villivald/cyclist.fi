import styles from "@/styles/NewsBlock.module.css";

interface Props {
  image: string;
  text: string;
  date: string;
}

export default function NewsBlock({ image, text, date }: Props) {
  return (
    <section className={styles.newsBlock}>
      <p style={{ backgroundImage: `url(/images/${image})` }}></p>
      <p>{text.length > 125 ? text.slice(0, 120) + "..." : text}</p>
      <p>{date}</p>
    </section>
  );
}
