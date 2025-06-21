import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "brands");

export default function brands() {
  const data = [
    {
      title: "Pas Normal",
      description:
        "Pas Normal Studios is a Danish cycling apparel brand known for its stylish and functional designs, blending performance with contemporary aesthetics.",
      image: "/images/404_1.avif",
      link: "https://pasnormalstudios.com/",
      alt: "Pas Normal Studios Logo",
    },
    {
      title: "Rapha",
      description:
        "Rapha is a British cycling brand that offers high-quality apparel and accessories, known for its performance-driven designs and classic aesthetics.",
      image: "/images/404_1.avif",
      link: "https://www.rapha.cc/",
      alt: "Rapha Logo",
    },
    {
      title: "Assos",
      description:
        "Assos is a Swiss cycling apparel brand renowned for its premium quality and innovative designs, focusing on performance and comfort for cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.assos.com/",
      alt: "Assos Logo",
    },
    {
      title: "Pas Normal",
      description:
        "Pas Normal Studios is a Danish cycling apparel brand known for its stylish and functional designs, blending performance with contemporary aesthetics.",
      image: "/images/404_1.avif",
      link: "https://pasnormalstudios.com/",
      alt: "Pas Normal Studios Logo",
    },
    {
      title: "Rapha",
      description:
        "Rapha is a British cycling brand that offers high-quality apparel and accessories, known for its performance-driven designs and classic aesthetics.",
      image: "/images/404_1.avif",
      link: "https://www.rapha.cc/",
      alt: "Rapha Logo",
    },
    {
      title: "Assos",
      description:
        "Assos is a Swiss cycling apparel brand renowned for its premium quality and innovative designs, focusing on performance and comfort for cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.assos.com/",
      alt: "Assos Logo",
    },
    {
      title: "Pas Normal",
      description:
        "Pas Normal Studios is a Danish cycling apparel brand known for its stylish and functional designs, blending performance with contemporary aesthetics.",
      image: "/images/404_1.avif",
      link: "https://pasnormalstudios.com/",
      alt: "Pas Normal Studios Logo",
    },
    {
      title: "Rapha",
      description:
        "Rapha is a British cycling brand that offers high-quality apparel and accessories, known for its performance-driven designs and classic aesthetics.",
      image: "/images/404_1.avif",
      link: "https://www.rapha.cc/",
      alt: "Rapha Logo",
    },
    {
      title: "Assos",
      description:
        "Assos is a Swiss cycling apparel brand renowned for its premium quality and innovative designs, focusing on performance and comfort for cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.assos.com/",
      alt: "Assos Logo",
    },
    {
      title: "Pas Normal",
      description:
        "Pas Normal Studios is a Danish cycling apparel brand known for its stylish and functional designs, blending performance with contemporary aesthetics.",
      image: "/images/404_1.avif",
      link: "https://pasnormalstudios.com/",
      alt: "Pas Normal Studios Logo",
    },
    {
      title: "Rapha",
      description:
        "Rapha is a British cycling brand that offers high-quality apparel and accessories, known for its performance-driven designs and classic aesthetics.",
      image: "/images/404_1.avif",
      link: "https://www.rapha.cc/",
      alt: "Rapha Logo",
    },
    {
      title: "Assos",
      description:
        "Assos is a Swiss cycling apparel brand renowned for its premium quality and innovative designs, focusing on performance and comfort for cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.assos.com/",
      alt: "Assos Logo",
    },
    {
      title: "Pas Normal",
      description:
        "Pas Normal Studios is a Danish cycling apparel brand known for its stylish and functional designs, blending performance with contemporary aesthetics.",
      image: "/images/404_1.avif",
      link: "https://pasnormalstudios.com/",
      alt: "Pas Normal Studios Logo",
    },
    {
      title: "Rapha",
      description:
        "Rapha is a British cycling brand that offers high-quality apparel and accessories, known for its performance-driven designs and classic aesthetics.",
      image: "/images/404_1.avif",
      link: "https://www.rapha.cc/",
      alt: "Rapha Logo",
    },
    {
      title: "Assos",
      description:
        "Assos is a Swiss cycling apparel brand renowned for its premium quality and innovative designs, focusing on performance and comfort for cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.assos.com/",
      alt: "Assos Logo",
    },
    {
      title: "Pas Normal",
      description:
        "Pas Normal Studios is a Danish cycling apparel brand known for its stylish and functional designs, blending performance with contemporary aesthetics.",
      image: "/images/404_1.avif",
      link: "https://pasnormalstudios.com/",
      alt: "Pas Normal Studios Logo",
    },
    {
      title: "Rapha",
      description:
        "Rapha is a British cycling brand that offers high-quality apparel and accessories, known for its performance-driven designs and classic aesthetics.",
      image: "/images/404_1.avif",
      link: "https://www.rapha.cc/",
      alt: "Rapha Logo",
    },
    {
      title: "Assos",
      description:
        "Assos is a Swiss cycling apparel brand renowned for its premium quality and innovative designs, focusing on performance and comfort for cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.assos.com/",
      alt: "Assos Logo",
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <PageComponent data={data} />
    </div>
  );
}
