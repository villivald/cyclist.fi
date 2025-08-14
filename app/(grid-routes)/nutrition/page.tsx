import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "nutrition";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function nutrition() {
  const data = [
    {
      id: "energy-gels",
      title: "Energy Gels",
      description:
        "Concentrated carbohydrate sources designed for quick energy during cycling. These portable nutrition options help maintain blood glucose levels and delay fatigue during long rides and intense training sessions.",
      image: "/images/404_1.avif",
      link: "https://www.scienceinsport.com/",
      alt: "Cycling energy gels",
      tags: ["Quick Energy", "Portable", "Carbohydrates"],
      new: true,
    },
    {
      id: "energy-bars",
      title: "Energy Bars",
      description:
        "Balanced nutrition bars providing sustained energy for cyclists. Combining carbohydrates, protein, and healthy fats, these bars are perfect for pre-ride fueling and mid-ride snacking during longer sessions.",
      image: "/images/404_1.avif",
      link: "https://www.clifbar.com/",
      alt: "Cycling energy bars",
      tags: ["Sustained Energy", "Balanced", "Convenient"],
      new: true,
    },
    {
      id: "hydration-strategies",
      title: "Hydration Strategies",
      description:
        "Comprehensive guides on maintaining proper hydration during cycling. Learn about fluid intake timing, electrolyte replacement, and how to prevent dehydration that can significantly impact performance and recovery.",
      image: "/images/404_1.avif",
      link: "https://www.cyclingweekly.com/",
      alt: "Cycling hydration strategies",
      tags: ["Hydration", "Electrolytes", "Performance"],
    },
    {
      id: "pre-ride-nutrition",
      title: "Pre-Ride Nutrition",
      description:
        "Essential nutrition guidelines for fueling before cycling sessions. Discover optimal meal timing, carbohydrate loading strategies, and foods that provide sustained energy without causing digestive discomfort.",
      image: "/images/404_1.avif",
      link: "https://www.velonews.com/",
      alt: "Pre-ride cycling nutrition",
      tags: ["Pre-Fueling", "Timing", "Digestion"],
    },
    {
      id: "recovery-nutrition",
      title: "Recovery Nutrition",
      description:
        "Post-ride nutrition strategies to optimize recovery and adaptation. Learn about the importance of protein timing, glycogen replenishment, and anti-inflammatory foods that support muscle repair and growth.",
      image: "/images/404_1.avif",
      link: "https://www.bicycling.com/",
      alt: "Post-ride recovery nutrition",
      tags: ["Recovery", "Protein", "Adaptation"],
    },
    {
      id: "supplements",
      title: "Cycling Supplements",
      description:
        "Evidence-based supplement recommendations for cyclists. From creatine and beta-alanine to omega-3s and vitamin D, discover which supplements can enhance performance, recovery, and overall cycling health.",
      image: "/images/404_1.avif",
      link: "https://www.examine.com/",
      alt: "Cycling supplements",
      tags: ["Evidence-Based", "Performance", "Health"],
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
