import NewsArchiveBlock from "@/components/NewsArchiveBlock";
import { metadataElement } from "@/components/metadata";

export const metadata = metadataElement({
  title: "Uutiset",
});

export default function news() {
  return (
    <div>
      <NewsArchiveBlock />
      <NewsArchiveBlock />
      <NewsArchiveBlock />
      <NewsArchiveBlock />
      <NewsArchiveBlock />
    </div>
  );
}
