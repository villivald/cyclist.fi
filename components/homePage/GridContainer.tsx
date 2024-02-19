import Grid from "./Grid";

import styles from "@/styles/GridContainer.module.css";

export default function GridContainer() {
  const upperLinks = [
    "Brands",
    "Youtube",
    "Magazines",
    "Discounts",
    "Podcasts",
    "TV",
    "Indoor",
    "Places",
    "Tour",
  ];

  const lowerLinks = [
    "Books",
    "Sharing",
    "Caring",
    "Social",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
  ];

  return (
    <section className={styles.gridContainer}>
      <Grid links={upperLinks} />
      <Grid links={lowerLinks} />
    </section>
  );
}
