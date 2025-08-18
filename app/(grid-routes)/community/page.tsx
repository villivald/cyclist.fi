import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "community";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function community() {
  const data = [
    {
      id: "local-clubs",
      title: "Local Cycling Clubs",
      description:
        "Find clubs near you for group rides, skills sessions, and a supportive cycling community.",
      image: "/images/404_1.avif",
      link: "https://www.britishcycling.org.uk/clubfinder",
      alt: "Local cycling clubs",
      tags: ["Group Rides", "Community", "Skills"],
      new: true,
    },
    {
      id: "women-cycling",
      title: "Women's Cycling",
      description:
        "Resources, groups, and initiatives supporting women in cycling across all disciplines.",
      image: "/images/404_1.avif",
      link: "https://www.cyclinguk.org/",
      alt: "Women's cycling community",
      tags: ["Inclusion", "Road", "Gravel"],
      new: true,
    },
    {
      id: "youth-programs",
      title: "Youth Programs",
      description:
        "Programs and academies developing the next generation of cyclists with coaching and events.",
      image: "/images/404_1.avif",
      link: "https://www.usacycling.org/",
      alt: "Youth cycling programs",
      tags: ["Youth", "Coaching", "Events"],
    },
    {
      id: "gravel-communities",
      title: "Gravel Communities",
      description:
        "Discover gravel groups and events fostering adventure cycling off the beaten path.",
      image: "/images/404_1.avif",
      link: "https://www.ridinggravel.com/",
      alt: "Gravel cycling community",
      tags: ["Gravel", "Adventure", "Events"],
    },
    {
      id: "hand-cycling",
      title: "Para & Handcycling",
      description:
        "Inclusive cycling resources, clubs, and events for para athletes and handcyclists.",
      image: "/images/404_1.avif",
      link: "https://www.uci.org/para-cycling/",
      alt: "Para and handcycling community",
      tags: ["Para", "Inclusion", "Racing"],
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
        layout="list"
        showTags={true}
        showNew={true}
      />
    </div>
  );
}
