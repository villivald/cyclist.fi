import PageComponent from "@/components/page-component";
import styles from "@/styles/Routes.module.css";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { getRouteColor } from "@/utils/get-route-color";

const ROUTE_NAME = "tour";

export const metadata = () => createTranslatedMetadata("Pages", ROUTE_NAME);

export default function tour() {
  const data = [
    {
      id: "tour-de-france",
      title: "Tour de France",
      description:
        "The world's most prestigious cycling race, held annually in July. This three-week Grand Tour covers over 3,500 kilometers through France and neighboring countries, featuring the world's best cyclists.",
      image: "/images/404_1.avif",
      link: "https://www.letour.fr/",
      alt: "Tour de France cycling race",
      tags: ["Grand Tour", "France", "July"],
      new: true,
    },
    {
      id: "giro-ditalia",
      title: "Giro d'Italia",
      description:
        "One of cycling's three Grand Tours, the Giro d'Italia takes place in May across Italy. Known for its challenging mountain stages and passionate Italian cycling culture, it's a true test of endurance.",
      image: "/images/404_1.avif",
      link: "https://www.giroditalia.it/",
      alt: "Giro d'Italia cycling race",
      tags: ["Grand Tour", "Italy", "May"],
      new: true,
    },
    {
      id: "vuelta-espana",
      title: "Vuelta a España",
      description:
        "The third Grand Tour of the cycling season, held in August-September across Spain. Known for its challenging mountain stages and late-season drama, it often decides the final rankings of the cycling year.",
      image: "/images/404_1.avif",
      link: "https://www.lavuelta.es/",
      alt: "Vuelta a España cycling race",
      tags: ["Grand Tour", "Spain", "August-September"],
    },
    {
      id: "paris-roubaix",
      title: "Paris-Roubaix",
      description:
        "Known as 'The Hell of the North', this one-day classic features treacherous cobblestone sections that test both skill and courage. Held in early April, it's one of cycling's most prestigious monuments.",
      image: "/images/404_1.avif",
      link: "https://www.paris-roubaix.fr/",
      alt: "Paris-Roubaix cycling race",
      tags: ["Classic", "Cobblestones", "April"],
    },
    {
      id: "milan-san-remo",
      title: "Milan-San Remo",
      description:
        "Known as 'La Primavera' (The Spring), this is the first Monument of the season. The longest one-day race at nearly 300km, it's a sprinter's classic that often comes down to a thrilling finish on the Via Roma.",
      image: "/images/404_1.avif",
      link: "https://www.milanosanremo.it/",
      alt: "Milan-San Remo cycling race",
      tags: ["Monument", "Sprint", "March"],
    },
    {
      id: "liege-bastogne-liege",
      title: "Liège-Bastogne-Liège",
      description:
        "The oldest of the five Monuments, this Ardennes Classic is known as 'La Doyenne'. Held in late April, it features challenging climbs and often harsh weather conditions, making it a true test of strength.",
      image: "/images/404_1.avif",
      link: "https://www.liege-bastogne-liege.be/",
      alt: "Liège-Bastogne-Liège cycling race",
      tags: ["Monument", "Ardennes", "April"],
    },
    {
      id: "world-championships",
      title: "UCI World Championships",
      description:
        "Annual world championships for road cycling, time trial, and team time trial. The iconic rainbow jersey is awarded to the winners, making this one of the most prestigious events in cycling.",
      image: "/images/404_1.avif",
      link: "https://www.uci.org/",
      alt: "UCI World Championships",
      tags: ["World Championship", "Rainbow Jersey", "September"],
    },
    {
      id: "cyclocross-worlds",
      title: "Cyclocross World Championships",
      description:
        "Annual world championships for cyclocross, a winter cycling discipline that combines road and mountain biking techniques. Held on challenging off-road courses with obstacles and varying weather conditions.",
      image: "/images/404_1.avif",
      link: "https://www.uci.org/",
      alt: "Cyclocross World Championships",
      tags: ["World Championship", "Winter", "Off-road"],
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
