import Design from "@/components/Design";
import { metadataElement } from "@/components/metadata";

export const metadata = metadataElement({
  title: "Design",
});

export default function design() {
  return (
    <div>
      <Design />
    </div>
  );
}
