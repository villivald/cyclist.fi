import Design from "@/components/design-elements";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export async function generateMetadata() {
  return await createTranslatedMetadata("Pages", "facebook");
}

export default function facebook() {
  return (
    <div>
      <Design />
    </div>
  );
}
