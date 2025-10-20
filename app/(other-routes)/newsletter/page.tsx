import Design from "@/components/design-elements";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "newsletter");

export default function newsletter() {
  return (
    <div>
      <Design />
    </div>
  );
}
