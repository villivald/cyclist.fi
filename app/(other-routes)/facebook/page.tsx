import Design from "@/components/design-elements";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "facebook");

export default function facebook() {
  return (
    <div>
      <Design />
    </div>
  );
}
