import Design from "@/components/design-elements";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export async function generateMetadata() {
  return await createTranslatedMetadata("Pages", "newsletter");
}

export default function newsletter() {
  return (
    <div>
      <Design />
    </div>
  );
}
