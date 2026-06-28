import NewsletterForm from "@/components/newsletter-form";
import { createTranslatedMetadata } from "@/utils/generate-metadata";

export async function generateMetadata() {
  return await createTranslatedMetadata("Pages", "newsletter");
}

export default function newsletter() {
  return (
    <div>
      <NewsletterForm />
    </div>
  );
}
