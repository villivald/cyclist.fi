import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "books";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function books() {
  const data = [
    {
      id: "cyclists-training-bible",
      title: "The Cyclist's Training Bible",
      description:
        "Comprehensive guide to structured training for cyclists of all levels, covering periodization, workouts, and performance metrics.",
      image: "/images/404_1.avif",
      link: "https://www.trainingbible.com/",
      alt: "The Cyclist's Training Bible book",
      tags: ["Training", "Performance", "Guide"],
      new: true,
    },
    {
      id: "draft-animals",
      title: "Draft Animals",
      description:
        "A candid behind-the-scenes look at life in the professional peloton, exploring ambition, sacrifice, and the realities of racing.",
      image: "/images/404_1.avif",
      link: "https://www.harpercollins.com/",
      alt: "Draft Animals cycling book",
      tags: ["Pro Cycling", "Memoir", "Peloton"],
      new: true,
    },
    {
      id: "secret-race",
      title: "The Secret Race",
      description:
        "Investigative memoir revealing the inner workings of doping culture in pro cycling during a controversial era.",
      image: "/images/404_1.avif",
      link: "https://www.penguinrandomhouse.com/",
      alt: "The Secret Race cycling book",
      tags: ["History", "Doping", "Pro Cycling"],
    },
    {
      id: "marginal-gains-book",
      title: "Marginal Gains",
      description:
        "Explores the small improvements that compound into major performance benefits across training, nutrition, and technology.",
      image: "/images/404_1.avif",
      link: "https://www.velopress.com/",
      alt: "Marginal Gains book",
      tags: ["Optimization", "Science", "Performance"],
    },
    {
      id: "gironimo",
      title: "Gironimo!",
      description:
        "A humorous and historical journey recreating the 1914 Giro d'Italia on a period-correct bike—equal parts adventure and cycling history.",
      image: "/images/404_1.avif",
      link: "https://www.yellowjerseypress.com/",
      alt: "Gironimo cycling book",
      tags: ["Adventure", "History", "Giro"],
    },
    {
      id: "how-to-bike",
      title: "Zinn & the Art of Road Bike Maintenance",
      description:
        "A trusted reference for at-home bike mechanics with clear explanations, diagrams, and step-by-step procedures.",
      image: "/images/404_1.avif",
      link: "https://www.velopress.com/",
      alt: "Zinn and the Art of Road Bike Maintenance book",
      tags: ["Maintenance", "How-To", "Workshop"],
    },
  ];

  const routeColor = getRouteColor(ROUTE_NAME);

  const routeStyles = {
    "--routeColor": `var(--color-${routeColor})`,
  } as React.CSSProperties;

  return (
    <div className={styles.mainContainer}>
      <PageComponent
        data={data}
        routeStyles={routeStyles}
        layout="grid"
        showTags={true}
        showNew={true}
      />
    </div>
  );
}
