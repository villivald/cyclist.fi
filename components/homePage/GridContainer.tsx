import styles from "@/styles/GridContainer.module.css";

import Grid from "./Grid";

export default function GridContainer() {
  const upperLinks = [
    { title: "Brands", link: "/brands" },
    { title: "Youtube", link: "/youtube" },
    { title: "Magazines", link: "/magazines" },
    { title: "Discounts", link: "/discounts" },
    { title: "Podcasts", link: "/podcasts" },
    { title: "TV", link: "/tv" },
    { title: "Indoor", link: "/indoor" },
    { title: "Places", link: "/places" },
    { title: "Tour", link: "/tour" },
  ];

  const lowerLinks = [
    { title: "Books", link: "/books" },
    { title: "Sharing", link: "/sharing" },
    { title: "Caring", link: "/caring" },
    { title: "Social", link: "/social" },
    { title: "Test", link: "/test" },
    { title: "Test", link: "/test" },
    { title: "Test", link: "/test" },
    { title: "Test", link: "/test" },
    { title: "Test", link: "/test" },
  ];

  return (
    <section className={styles.gridContainer}>
      <Grid links={upperLinks} />
      <Grid links={lowerLinks} />
    </section>
  );
}
