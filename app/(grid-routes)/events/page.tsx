import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "events";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function events() {
  const data = [
    {
      id: "gran-fondo",
      title: "Gran Fondo Events",
      description:
        "Mass participation cycling events that combine the spirit of racing with the camaraderie of group riding. These events offer various distances and are perfect for amateur cyclists looking to challenge themselves.",
      image: "/images/404_1.avif",
      link: "https://granfondoguide.com/",
      alt: "Gran Fondo cycling events",
      tags: ["Amateur", "Participation", "Challenge"],
      new: true,
    },
    {
      id: "charity-rides",
      title: "Charity Cycling Events",
      description:
        "Cycling events organized to raise funds for various causes. These rides bring together cyclists of all abilities while supporting important charitable organizations and making a positive impact.",
      image: "/images/404_1.avif",
      link: "https://www.active.com/cycling",
      alt: "Charity cycling events",
      tags: ["Charity", "Fundraising", "Community"],
      new: true,
    },
    {
      id: "local-club-races",
      title: "Local Club Races",
      description:
        "Regular racing events organized by local cycling clubs. These provide opportunities for amateur racers to compete in a friendly, supportive environment while improving their skills.",
      image: "/images/404_1.avif",
      link: "https://www.cycling.org.au/",
      alt: "Local cycling club races",
      tags: ["Local", "Club", "Amateur"],
    },
    {
      id: "century-rides",
      title: "Century Rides",
      description:
        "100-mile (160km) cycling events that challenge endurance and provide a sense of achievement. These rides often feature rest stops, support vehicles, and celebration at the finish line.",
      image: "/images/404_1.avif",
      link: "https://www.centuryride.com/",
      alt: "Century cycling rides",
      tags: ["Endurance", "100 miles", "Challenge"],
    },
    {
      id: "bike-festivals",
      title: "Bike Festivals & Expos",
      description:
        "Multi-day cycling festivals featuring group rides, bike shows, vendor exhibitions, and cycling culture celebrations. Perfect for meeting fellow cyclists and discovering new products.",
      image: "/images/404_1.avif",
      link: "https://www.interbike.com/",
      alt: "Bike festivals and expos",
      tags: ["Festival", "Exhibition", "Community"],
    },
    {
      id: "winter-rides",
      title: "Winter Cycling Events",
      description:
        "Cold-weather cycling challenges and fat bike events that embrace winter conditions. These events showcase the versatility of cycling and the dedication of year-round cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.fatbike.com/",
      alt: "Winter cycling events",
      tags: ["Winter", "Fat Bike", "Challenge"],
    },
    {
      id: "family-rides",
      title: "Family Cycling Events",
      description:
        "Family-friendly cycling events designed for all ages and skill levels. These events promote cycling as a family activity and often include shorter routes and fun activities for children.",
      image: "/images/404_1.avif",
      link: "https://www.familybike.org/",
      alt: "Family cycling events",
      tags: ["Family", "Kids", "Beginner"],
    },
    {
      id: "training-camps",
      title: "Cycling Training Camps",
      description:
        "Multi-day cycling camps focused on improving skills, fitness, and technique. These camps offer structured training, coaching, and the opportunity to ride in new locations with fellow cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.cyclingcamps.com/",
      alt: "Cycling training camps",
      tags: ["Training", "Coaching", "Skills"],
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
