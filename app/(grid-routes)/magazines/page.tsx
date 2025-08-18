import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "magazines";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function magazines() {
  const data = [
    {
      id: "rouleur",
      title: "Rouleur",
      description:
        "Premium cycling magazine featuring in-depth stories, photography, and culture from the world of professional cycling.",
      image: "/images/404_1.avif",
      link: "https://www.rouleur.cc/",
      alt: "Rouleur magazine",
      tags: ["Pro Cycling", "Culture", "Photography"],
      new: true,
    },
    {
      id: "cyclistmag",
      title: "Cyclist",
      description:
        "Road cycling magazine with bike reviews, travel features, and performance tips for enthusiastic riders.",
      image: "/images/404_1.avif",
      link: "https://www.cyclist.co.uk/",
      alt: "Cyclist magazine",
      tags: ["Road", "Reviews", "Travel"],
      new: true,
    },
    {
      id: "cyclingnews",
      title: "CyclingNews",
      description:
        "Daily news, race coverage, tech reviews, and features from all corners of the cycling world.",
      image: "/images/404_1.avif",
      link: "https://www.cyclingnews.com/",
      alt: "CyclingNews website",
      tags: ["News", "Racing", "Tech"],
    },
    {
      id: "velonews",
      title: "Velo",
      description:
        "In-depth features, analysis, and gear coverage for road, gravel, and MTB disciplines.",
      image: "/images/404_1.avif",
      link: "https://www.velonews.com/",
      alt: "Velo News",
      tags: ["Analysis", "Gear", "Gravel"],
    },
    {
      id: "peloton",
      title: "Peloton Magazine",
      description:
        "Beautifully produced features on cycling culture, travel, and photography with a global perspective.",
      image: "/images/404_1.avif",
      link: "https://pelotonmagazine.com/",
      alt: "Peloton magazine",
      tags: ["Culture", "Travel", "Photography"],
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
