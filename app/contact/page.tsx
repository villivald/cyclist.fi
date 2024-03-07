import ContactForm from "@/components/ContactForm";
import { metadataElement } from "@/components/metadata";

export const metadata = metadataElement({
  title: "Ota yhteyttä",
});

export default function contact() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
