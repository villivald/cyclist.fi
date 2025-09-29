import GridContainer from "@/components/grid/grid-container";
import NewsList from "@/components/news/news-list";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Common", "homePage");

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <aside aria-hidden="true" />
      <GridContainer />
      <NewsList />
    </main>
  );
}
