import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "maintenance";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function maintenance() {
  const data = [
    {
      id: "basic-maintenance",
      title: "Basic Maintenance",
      description:
        "Learn cleaning, lubrication, and safety checks to keep your bike running smoothly and prolong component lifespan.",
      image: "/images/404_1.avif",
      link: "https://www.parktool.com/blog/repair-help",
      alt: "Basic bike maintenance",
      tags: ["Cleaning", "Lubrication", "Safety"],
      new: true,
    },
    {
      id: "wheel-truing",
      title: "Wheel Truing",
      description:
        "Understand spoke tension and lateral/radial truing techniques for durable, straight wheels.",
      image: "/images/404_1.avif",
      link: "https://www.parktool.com/blog/repair-help/wheel-and-rim-service",
      alt: "Wheel truing guide",
      tags: ["Wheels", "Spokes", "Tension"],
      new: true,
    },
    {
      id: "drivetrain-care",
      title: "Drivetrain Care",
      description:
        "Chain wear, cassette replacement, and indexing shifting for crisp performance.",
      image: "/images/404_1.avif",
      link: "https://www.sheldonbrown.com/chain-wear.html",
      alt: "Drivetrain maintenance",
      tags: ["Chain", "Cassette", "Indexing"],
    },
    {
      id: "hydraulic-brakes",
      title: "Hydraulic Brakes",
      description:
        "Bleeding procedures, pad replacement, and rotor alignment for consistent stopping power.",
      image: "/images/404_1.avif",
      link: "https://www.youtube.com/results?search_query=hydraulic+brake+bleed+bike",
      alt: "Hydraulic brake service",
      tags: ["Brakes", "Bleed", "Rotors"],
    },
    {
      id: "suspension-service",
      title: "Suspension Service",
      description:
        "Fork and shock lower service intervals, seals, and air spring maintenance for MTB and gravel.",
      image: "/images/404_1.avif",
      link: "https://www.foxracingshox.com/",
      alt: "Suspension maintenance",
      tags: ["MTB", "Fork", "Shock"],
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
