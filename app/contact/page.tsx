import { createTranslatedMetadata } from "utils/generateMetadata";

import ContactForm from "@/components/ContactForm";

export const metadata = () => createTranslatedMetadata("Pages", "contact");

export default function contact() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
