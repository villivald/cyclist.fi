import { getTranslations } from "next-intl/server";

import { metadataElement } from "./metadata-element";

export async function createTranslatedMetadata(ns: string, key: string) {
  const t = await getTranslations(ns);
  const tMetadata = await getTranslations("Metadata");
  const title = t(key);
  const description =
    ns === "Pages"
      ? tMetadata("routeDescription", { title })
      : tMetadata("defaultDescription");

  return metadataElement({ title, description });
}
