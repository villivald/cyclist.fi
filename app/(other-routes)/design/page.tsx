import Design from "@/components/design-elements";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export async function generateMetadata() {
  return await createTranslatedMetadata("Pages", "design");
}

export default function design() {
  return (
    <div>
      <Design />
    </div>
  );
}
