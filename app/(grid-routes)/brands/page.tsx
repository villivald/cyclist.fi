import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "brands";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function brands() {
  const data = [
    {
      id: "pas-normal-studios",
      title: "Pas Normal Studios",
      description:
        "Danish cycling apparel brand known for its stylish and functional designs, blending performance with contemporary aesthetics. Their minimalist approach and attention to detail make them a favorite among style-conscious cyclists.",
      image: "/images/404_1.avif",
      link: "https://pasnormalstudios.com/",
      alt: "Pas Normal Studios cycling apparel",
      category: "Apparel",
      tags: ["Danish", "Minimalist", "Performance"],
      new: true,
    },
    {
      id: "rapha",
      title: "Rapha",
      description:
        "British cycling brand offering high-quality apparel and accessories. Known for performance-driven designs and classic aesthetics, Rapha has become synonymous with premium cycling culture and community.",
      image: "/images/404_1.avif",
      link: "https://www.rapha.cc/",
      alt: "Rapha cycling brand",
      category: "Apparel",
      tags: ["British", "Premium", "Community"],
      new: true,
    },
    {
      id: "assos",
      title: "Assos",
      description:
        "Swiss cycling apparel brand renowned for premium quality and innovative designs. Their focus on performance and comfort has made them a leader in technical cycling clothing with cutting-edge materials.",
      image: "/images/404_1.avif",
      link: "https://www.assos.com/",
      alt: "Assos cycling apparel",
      category: "Apparel",
      tags: ["Swiss", "Technical", "Innovation"],
    },
    {
      id: "castelli",
      title: "Castelli",
      description:
        "Italian cycling brand with a rich heritage in cycling apparel. Known for their aerodynamic designs and innovative fabrics, Castelli continues to push the boundaries of cycling performance wear.",
      image: "/images/404_1.avif",
      link: "https://www.castelli-cycling.com/",
      alt: "Castelli cycling apparel",
      category: "Apparel",
      tags: ["Italian", "Aero", "Heritage"],
    },
    {
      id: "maap",
      title: "MAAP",
      description:
        "Australian cycling brand that combines technical performance with bold design. Their innovative approach to cycling apparel has gained them a global following among performance-focused cyclists.",
      image: "/images/404_1.avif",
      link: "https://maap.cc/",
      alt: "MAAP cycling apparel",
      category: "Apparel",
      tags: ["Australian", "Bold", "Technical"],
    },
    {
      id: "pedaled",
      title: "Pedaled",
      description:
        "British cycling brand focused on sustainable and ethical production. Their commitment to environmental responsibility while maintaining high performance standards sets them apart in the cycling industry.",
      image: "/images/404_1.avif",
      link: "https://pedaled.com/",
      alt: "Pedaled cycling apparel",
      category: "Apparel",
      tags: ["British", "Sustainable", "Ethical"],
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
