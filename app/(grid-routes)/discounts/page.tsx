import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "discounts";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function discounts() {
  const data = [
    {
      id: "chain-reaction",
      title: "Chain Reaction Deals",
      description:
        "Big discounts on bikes, components, and apparel. Updated frequently with seasonal sales and clearances.",
      image: "/images/404_1.avif",
      link: "https://www.chainreactioncycles.com/",
      alt: "Chain Reaction Cycles discounts",
      tags: ["Bikes", "Components", "Apparel"],
      new: true,
    },
    {
      id: "wiggle",
      title: "Wiggle Outlet",
      description:
        "Outlet and promo codes for cycling gear, shoes, and nutrition with fast shipping in many regions.",
      image: "/images/404_1.avif",
      link: "https://www.wiggle.com/",
      alt: "Wiggle cycling discounts",
      tags: ["Outlet", "Codes", "Gear"],
      new: true,
    },
    {
      id: "bike-discount",
      title: "Bike-Discount",
      description:
        "European retailer with aggressive pricing on parts, tools, and accessories.",
      image: "/images/404_1.avif",
      link: "https://www.bike-discount.de/",
      alt: "Bike-Discount deals",
      tags: ["Parts", "Tools", "Accessories"],
    },
    {
      id: "local-shops",
      title: "Local Shop Sales",
      description:
        "Support your LBS: check seasonal sales, demo bikes, and service bundles. Many offer newsletter-only promos.",
      image: "/images/404_1.avif",
      link: "https://www.google.com/maps/search/bike+shop/",
      alt: "Local bike shop sales",
      tags: ["LBS", "Seasonal", "Service"],
    },
    {
      id: "student-discounts",
      title: "Student & Club Discounts",
      description:
        "Save with student verification and cycling club partnerships across brands and shops.",
      image: "/images/404_1.avif",
      link: "https://www.studentbeans.com/",
      alt: "Student cycling discounts",
      tags: ["Student", "Club", "Partnership"],
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
