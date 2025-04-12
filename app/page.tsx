import GridContainer from "@/components/homePage/GridContainer";
import NewsList from "@/components/homePage/NewsList";
import { metadataElement } from "@/components/metadata";

export const metadata = metadataElement({
  title: "Etusivu",
});

export default function Home() {
  return (
    <main>
      <aside />
      <GridContainer />
      <NewsList />
    </main>
  );
}
