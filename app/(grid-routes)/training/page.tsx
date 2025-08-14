import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "training";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function training() {
  const data = [
    {
      id: "training-plans",
      title: "Training Plans",
      description:
        "Structured cycling training programs designed for different goals and experience levels. From beginner-friendly plans to advanced racing preparation, these comprehensive programs help cyclists improve performance systematically.",
      image: "/images/404_1.avif",
      link: "https://www.trainingpeaks.com/",
      alt: "Cycling training plans",
      tags: ["Structured", "Progressive", "Goal-Oriented"],
      new: true,
    },
    {
      id: "workout-library",
      title: "Workout Library",
      description:
        "Extensive collection of cycling workouts and training sessions. Includes interval training, endurance rides, strength workouts, and recovery sessions that can be customized to individual training needs and schedules.",
      image: "/images/404_1.avif",
      link: "https://www.zwift.com/",
      alt: "Cycling workout library",
      tags: ["Variety", "Customizable", "Progressive"],
      new: true,
    },
    {
      id: "coaching-resources",
      title: "Coaching Resources",
      description:
        "Professional cycling coaching services and educational materials. Connect with certified cycling coaches, access training methodologies, and learn advanced techniques to maximize your cycling potential and performance.",
      image: "/images/404_1.avif",
      link: "https://www.usacycling.org/",
      alt: "Cycling coaching resources",
      tags: ["Professional", "Certified", "Educational"],
    },
    {
      id: "performance-metrics",
      title: "Performance Metrics",
      description:
        "Comprehensive guides on tracking and analyzing cycling performance data. Learn about power metrics, heart rate zones, training stress scores, and other key indicators that help optimize training and racing performance.",
      image: "/images/404_1.avif",
      link: "https://www.wko5.com/",
      alt: "Cycling performance metrics",
      tags: ["Data Analysis", "Power", "Heart Rate"],
    },
    {
      id: "training-apps",
      title: "Training Apps & Tools",
      description:
        "Essential mobile applications and software for cyclists. Discover apps for route planning, training tracking, performance analysis, and social training that enhance the cycling experience and training effectiveness.",
      image: "/images/404_1.avif",
      link: "https://www.strava.com/",
      alt: "Cycling training apps",
      tags: ["Mobile", "Tracking", "Social"],
    },
    {
      id: "strength-training",
      title: "Strength Training for Cyclists",
      description:
        "Off-bike strength training programs specifically designed for cyclists. Learn exercises that improve cycling performance, prevent injuries, and build the muscular foundation needed for long rides and racing.",
      image: "/images/404_1.avif",
      link: "https://www.cyclingweekly.com/",
      alt: "Strength training for cyclists",
      tags: ["Off-Bike", "Injury Prevention", "Performance"],
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
