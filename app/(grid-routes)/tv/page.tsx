import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "tv";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function tv() {
  const data = [
    {
      id: "gcn-plus",
      title: "GCN+ (archive)",
      description:
        "Historical races and documentaries; platform content has moved but archives and references remain useful.",
      image: "/images/404_1.avif",
      link: "https://www.globalcyclingnetwork.com/",
      alt: "GCN Plus platform",
      tags: ["Racing", "Documentary", "Archive"],
      new: true,
    },
    {
      id: "eurosport",
      title: "Eurosport / Discovery",
      description:
        "Live coverage and replays for Grand Tours, Monuments, and classics across Europe.",
      image: "/images/404_1.avif",
      link: "https://www.eurosport.com/",
      alt: "Eurosport cycling coverage",
      tags: ["Live", "Grand Tours", "Classics"],
      new: true,
    },
    {
      id: "peacock",
      title: "Peacock (US)",
      description:
        "Broadcast partner for select WorldTour races and classics in the United States.",
      image: "/images/404_1.avif",
      link: "https://www.peacocktv.com/",
      alt: "Peacock cycling streaming",
      tags: ["US", "WorldTour", "Streaming"],
    },
    {
      id: "flo-bikes",
      title: "FloBikes",
      description:
        "Regional streaming rights for North America with race coverage and analysis.",
      image: "/images/404_1.avif",
      link: "https://www.flobikes.com/",
      alt: "FloBikes streaming",
      tags: ["North America", "Racing", "Streaming"],
    },
    {
      id: "national-broadcasters",
      title: "National Broadcasters",
      description:
        "Check your country's public broadcasters (e.g., Yle, BBC, RAI) for free-to-air coverage and highlights.",
      image: "/images/404_1.avif",
      link: "https://www.uci.org/",
      alt: "National broadcasters cycling",
      tags: ["Highlights", "Public", "Regional"],
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
