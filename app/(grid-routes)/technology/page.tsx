import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "technology";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function technology() {
  const data = [
    {
      id: "bike-computers",
      title: "Bike Computers",
      description:
        "Advanced cycling computers and GPS devices that track performance metrics, navigation, and training data. From basic speedometers to sophisticated power meters, these devices are essential for modern cycling training and racing.",
      image: "/images/404_1.avif",
      link: "https://www.garmin.com/",
      alt: "Cycling bike computers",
      tags: ["GPS", "Performance", "Navigation"],
      new: true,
    },
    {
      id: "smart-trainers",
      title: "Smart Trainers",
      description:
        "Interactive indoor cycling trainers that connect to training apps and virtual worlds. These devices provide realistic resistance simulation, power measurement, and immersive training experiences for year-round cycling improvement.",
      image: "/images/404_1.avif",
      link: "https://www.wahoofitness.com/",
      alt: "Smart cycling trainers",
      tags: ["Indoor", "Interactive", "Virtual"],
      new: true,
    },
    {
      id: "cycling-apps",
      title: "Cycling Apps & Software",
      description:
        "Essential mobile applications and desktop software for cyclists. Discover apps for route planning, training analysis, social sharing, and performance tracking that enhance every aspect of the cycling experience.",
      image: "/images/404_1.avif",
      link: "https://www.strava.com/",
      alt: "Cycling apps and software",
      tags: ["Mobile", "Analysis", "Social"],
    },
    {
      id: "power-meters",
      title: "Power Meters",
      description:
        "Precision power measurement devices that provide real-time cycling power data. These tools are essential for serious training and racing, offering accurate feedback on effort and performance that heart rate alone cannot provide.",
      image: "/images/404_1.avif",
      link: "https://www.stagescycling.com/",
      alt: "Cycling power meters",
      tags: ["Power", "Precision", "Training"],
    },
    {
      id: "cycling-tech-reviews",
      title: "Cycling Tech Reviews",
      description:
        "Comprehensive reviews and analysis of the latest cycling technology and equipment. Stay informed about new products, innovations, and technological advances that can improve your cycling performance and experience.",
      image: "/images/404_1.avif",
      link: "https://www.dcrainmaker.com/",
      alt: "Cycling technology reviews",
      tags: ["Reviews", "Innovation", "Analysis"],
    },
    {
      id: "wearable-tech",
      title: "Wearable Technology",
      description:
        "Smartwatches, fitness trackers, and other wearable devices designed for cyclists. Monitor heart rate, track sleep, analyze recovery, and stay connected while cycling with these advanced wearable technologies.",
      image: "/images/404_1.avif",
      link: "https://www.polar.com/",
      alt: "Cycling wearable technology",
      tags: ["Wearable", "Monitoring", "Recovery"],
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
