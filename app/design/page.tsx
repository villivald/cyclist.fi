import { createTranslatedMetadata } from "utils/generateMetadata";

import Design from "@/components/Design";

export const metadata = () => createTranslatedMetadata("Pages", "design");

export default function design() {
  return (
    <div>
      <Design />
    </div>
  );
}
