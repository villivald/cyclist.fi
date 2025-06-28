import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "youtube";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function youtube() {
  const data = [
    {
      id: "global-cycling-network",
      title: "Global Cycling Network",
      description:
        "The world's leading cycling channel with daily videos covering everything from training",
      image: "/images/404_1.avif",
      link: "https://www.youtube.com/@GCN",
      alt: "Global Cycling Network YouTube channel",
      category: "Cycling Media",
      tags: ["Training", "Racing", "Reviews", "Global"],
      new: true,
    },
    {
      id: "gcn-tech",
      title: "GCN Tech",
      description:
        "Dedicated to the latest cycling technology, bike reviews, and gear testing. From pro bikes to budget options, they cover it all.",
      image: "/images/404_1.avif",
      link: "https://www.youtube.com/@GCNTech",
      alt: "GCN Tech YouTube channel",
      category: "Cycling Media",
      tags: ["Technology", "Reviews", "Gear", "Bikes"],
      new: true,
    },
    {
      id: "dylan-johnson",
      title: "Dylan Johnson",
      description:
        "Professional cyclist and coach sharing insights into training, racing, and the life of a pro cyclist. Great for serious cyclists looking to improve.",
      image: "/images/404_1.avif",
      link: "https://www.youtube.com/@dylanjohnson",
      alt: "Dylan Johnson YouTube channel",
      category: "Training",
      tags: ["Professional", "Training", "Racing", "Coaching"],
    },
    {
      id: "norcal-cycling",
      title: "NorCal Cycling",
      description: "Amateur racing content with",
      image: "/images/404_1.avif",
      link: "https://www.youtube.com/@norcalcycling",
      alt: "NorCal Cycling YouTube channel",
      category: "Racing",
      tags: ["Amateur", "Racing", "Grassroots", "Commentary"],
    },
    {
      id: "lanterne-rouge",
      title: "Lanterne Rouge",
      description: "In-depth analysis of professional",
      image: "/images/404_1.avif",
      link: "https://www.youtube.com/@lanterne_rouge",
      alt: "Lanterne Rouge YouTube channel",
      category: "Analysis",
      tags: ["Professional", "Analysis", "Tactics", "Racing"],
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
