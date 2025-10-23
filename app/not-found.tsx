import NotFoundClient from "../components/not-found-client";
import { createTranslatedMetadata } from "../utils/generate-metadata";

export async function generateMetadata() {
  return await createTranslatedMetadata("Common", "pageNotFound");
}

export default function NotFound() {
  return <NotFoundClient />;
}
