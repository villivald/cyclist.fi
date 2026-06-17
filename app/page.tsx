import GridContainer from "@/components/grid/grid-container";
import HeroBanner from "@/components/hero-banner";
import NewsList from "@/components/news/news-list";
import ProposeContent from "@/components/propose-content";
import { createTranslatedMetadata } from "@/utils/generate-metadata";
import { loadGridPreviews } from "@/utils/load-grid-previews";

export async function generateMetadata() {
  return await createTranslatedMetadata("Common", "homePage");
}

export default async function Home() {
  const gridPreviews = await loadGridPreviews();

  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <HeroBanner />
        <GridContainer previews={gridPreviews} />
        <NewsList />
      </main>
      <ProposeContent />
    </>
  );
}
