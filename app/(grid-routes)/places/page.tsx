import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "places";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function places() {
  const data = [
    {
      id: "alps",
      title: "Alpine Passes",
      description:
        "Iconic climbs such as Alpe d'Huez, Stelvio, and Galibier—bucket-list roads for mountain lovers.",
      image: "/images/404_1.avif",
      link: "https://www.strava.com/segments/explore",
      alt: "Alpine cycling passes",
      tags: ["Climbs", "Road", "Scenic"],
      new: true,
    },
    {
      id: "tuscany-gravel",
      title: "Tuscany Gravel",
      description:
        "Strade Bianche's white roads and rolling hills—perfect for gravel and adventure rides.",
      image: "/images/404_1.avif",
      link: "https://www.turismo.intoscana.it/",
      alt: "Tuscany gravel routes",
      tags: ["Gravel", "Italy", "Routes"],
      new: true,
    },
    {
      id: "mallorca",
      title: "Mallorca Training",
      description:
        "Year-round riding paradise with smooth roads, climbs like Sa Calobra, and cycling-friendly cafes.",
      image: "/images/404_1.avif",
      link: "https://www.seemallorca.com/cycling",
      alt: "Mallorca cycling routes",
      tags: ["Training", "Climbs", "Sun"],
    },
    {
      id: "finland-trails",
      title: "Finland Trails",
      description:
        "Quiet gravel and forest roads, lakeside loops, and national parks ideal for long adventure days.",
      image: "/images/404_1.avif",
      link: "https://www.outdooractive.com/",
      alt: "Finland gravel and forest trails",
      tags: ["Finland", "Gravel", "Nature"],
    },
    {
      id: "city-commute",
      title: "City Commute Classics",
      description:
        "Safe urban routes, bike lanes, and commuting tips for major cities around the world.",
      image: "/images/404_1.avif",
      link: "https://citymapper.com/",
      alt: "City cycling commute routes",
      tags: ["Urban", "Commute", "Bike Lanes"],
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
