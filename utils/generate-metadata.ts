import { getTranslations } from "next-intl/server";

import { metadataElement } from "./metadata-element";

export async function createTranslatedMetadata(ns: string, key: string) {
  const t = await getTranslations(ns);
  return metadataElement({ title: t(key) });
}
