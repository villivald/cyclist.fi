import ContactForm from "@/components/contact-form";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export const metadata = () => createTranslatedMetadata("Pages", "contact");

export default function contact() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
