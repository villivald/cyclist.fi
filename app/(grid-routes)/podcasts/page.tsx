import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "podcasts";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function podcasts() {
  const data = [
    {
      id: "cycling-podcast",
      title: "The Cycling Podcast",
      description:
        "News, race analysis, and stories from the pro peloton with engaging hosts and regular series.",
      image: "/images/404_1.avif",
      link: "https://thecyclingpodcast.com/",
      alt: "The Cycling Podcast",
      tags: ["Pro Cycling", "Analysis", "Stories"],
      new: true,
    },
    {
      id: "nerd-alert",
      title: "Nerd Alert",
      description:
        "Deep dives into cycling tech, gear, and engineering with approachable explanations and debates.",
      image: "/images/404_1.avif",
      link: "https://escapecollective.com/category/nerd-alert/",
      alt: "Nerd Alert podcast",
      tags: ["Tech", "Gear", "Engineering"],
      new: true,
    },
    {
      id: "fast-talk",
      title: "Fast Talk Labs",
      description:
        "Evidence-based training, physiology, and coaching insights for performance-focused cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.fasttalklabs.com/fast-talk/",
      alt: "Fast Talk Labs podcast",
      tags: ["Training", "Science", "Coaching"],
    },
    {
      id: "successful-athlete",
      title: "Successful Athletes",
      description:
        "Real-world stories from everyday athletes overcoming challenges and achieving personal bests.",
      image: "/images/404_1.avif",
      link: "https://www.trainerroad.com/successful-athletes-podcast/",
      alt: "Successful Athletes podcast",
      tags: ["Stories", "Motivation", "Training"],
    },
    {
      id: "gcn-podcast",
      title: "GCN Podcast",
      description:
        "Entertaining chats about racing, tech, and cycling culture from the Global Cycling Network team.",
      image: "/images/404_1.avif",
      link: "https://www.globalcyclingnetwork.com/",
      alt: "GCN podcast",
      tags: ["Racing", "Tech", "Culture"],
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
