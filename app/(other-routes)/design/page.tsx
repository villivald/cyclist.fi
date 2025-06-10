import Design from "@/components/design-elements";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "design");

export default function design() {
  return (
    <div>
      <Design />
    </div>
  );
}
