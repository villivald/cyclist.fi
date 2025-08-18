import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "social";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function social() {
  const data = [
    {
      id: "strava",
      title: "Strava",
      description:
        "The largest social network for athletes. Track activities, analyze performance, and join clubs and challenges.",
      image: "/images/404_1.avif",
      link: "https://www.strava.com/",
      alt: "Strava social network for athletes",
      tags: ["Tracking", "Clubs", "Segments"],
      new: true,
    },
    {
      id: "komoot",
      title: "Komoot",
      description:
        "Plan routes, discover highlights, and share adventures with the community across road, gravel, and MTB.",
      image: "/images/404_1.avif",
      link: "https://www.komoot.com/",
      alt: "Komoot route planning and community",
      tags: ["Routing", "Community", "Discovery"],
      new: true,
    },
    {
      id: "instagram-cycling",
      title: "Instagram Cycling",
      description:
        "Follow cycling photographers, teams, and creators for daily inspiration and racing updates.",
      image: "/images/404_1.avif",
      link: "https://www.instagram.com/explore/tags/cycling/",
      alt: "Cycling on Instagram",
      tags: ["Photos", "Teams", "Creators"],
    },
    {
      id: "reddit-cycling",
      title: "Reddit r/cycling",
      description:
        "Community discussions, advice, reviews, and news across all cycling disciplines.",
      image: "/images/404_1.avif",
      link: "https://www.reddit.com/r/cycling/",
      alt: "Reddit cycling community",
      tags: ["Community", "Advice", "Reviews"],
    },
    {
      id: "facebook-groups",
      title: "Facebook Cycling Groups",
      description:
        "Local and global groups for group rides, buy/sell, and event coordination.",
      image: "/images/404_1.avif",
      link: "https://www.facebook.com/search/groups/?q=cycling",
      alt: "Facebook cycling groups",
      tags: ["Local", "Groups", "Events"],
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
