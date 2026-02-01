import type { PageComponentData } from "@/components/page-component/types";

export type SavedItem = {
  key: string;
  route: string;
  savedAt: string;
  snapshot: PageComponentData;
};

export type SavedState = {
  version: 1;
  updatedAt: string;
  items: Record<string, SavedItem>;
};
