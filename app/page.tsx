import { createTranslatedMetadata } from "utils/generateMetadata";

import GridContainer from "@/components/homePage/GridContainer";
import NewsList from "@/components/homePage/NewsList";

export const metadata = () => createTranslatedMetadata("Common", "homePage");

export default function Home() {
  return (
    <main>
      <aside />
      <GridContainer />
      <NewsList />
    </main>
  );
}
