import { z } from "zod";

import type { PageComponentData } from "@/components/page-component/types";

import type { SavedItem, SavedState } from "./types";

export const SAVED_STORAGE_KEY = "cyclist-saved-v1";

const pageComponentSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    description_en: z.string().optional().default(""),
    description_fi: z.string().optional().default(""),
    image: z.string().optional(),
    link: z.string().min(1),
    alt: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    new: z.boolean().optional().default(false),
    route: z.string().min(1).optional(),
  })
  .passthrough()
  .transform((data) => ({
    ...data,
    alt: data.alt?.trim() ? data.alt : data.title,
    tags: data.tags ?? [],
    new: data.new ?? false,
    description_en: data.description_en ?? "",
    description_fi: data.description_fi ?? "",
  }));

const savedItemSchema = z
  .object({
    key: z.string().min(1),
    route: z.string().min(1),
    savedAt: z.string().min(1),
    snapshot: pageComponentSchema,
  })
  .passthrough();

const savedStateSchema = z
  .object({
    version: z.literal(1),
    updatedAt: z.string().min(1),
    items: z.record(z.string(), savedItemSchema),
  })
  .passthrough();

const normalizeRoute = (route: string) => route.replace(/^\//, "").trim();

export const buildSavedKey = (route: string, itemId: string) =>
  `${normalizeRoute(route)}:${itemId}`;

export const createEmptyState = (): SavedState => ({
  version: 1,
  updatedAt: new Date().toISOString(),
  items: {},
});

export const normalizeSavedState = (value: unknown): SavedState => {
  const parsed = savedStateSchema.safeParse(value);
  if (parsed.success) {
    return parsed.data;
  }

  const base = createEmptyState();
  if (!value || typeof value !== "object") {
    return base;
  }

  const raw = value as {
    updatedAt?: string;
    items?: Record<string, unknown>;
  };
  const nextItems: Record<string, SavedItem> = {};
  const rawItems = raw.items ?? {};

  Object.values(rawItems).forEach((item) => {
    const parsedItem = savedItemSchema.safeParse(item);
    if (parsedItem.success) {
      nextItems[parsedItem.data.key] = parsedItem.data;
      return;
    }
  });

  return {
    version: 1,
    updatedAt:
      typeof raw.updatedAt === "string" && raw.updatedAt.length > 0
        ? raw.updatedAt
        : base.updatedAt,
    items: nextItems,
  };
};

const buildSnapshot = (item: PageComponentData, route: string) => ({
  ...item,
  route: item.route ?? normalizeRoute(route),
  tags: item.tags ?? [],
  new: item.new ?? false,
  alt: item.alt ?? item.title,
  description_en: item.description_en ?? "",
  description_fi: item.description_fi ?? "",
});

export const toggleSavedState = (
  state: SavedState,
  route: string,
  item: PageComponentData,
): SavedState => {
  const normalizedRoute = normalizeRoute(route);
  const key = buildSavedKey(normalizedRoute, item.id);
  const nextItems = { ...state.items };
  const now = new Date().toISOString();

  if (nextItems[key]) {
    delete nextItems[key];
  } else {
    const savedItem: SavedItem = {
      key,
      route: normalizedRoute,
      savedAt: now,
      snapshot: buildSnapshot(item, normalizedRoute),
    };
    nextItems[key] = savedItem;
  }

  return {
    version: 1,
    updatedAt: now,
    items: nextItems,
  };
};

export const listSavedItems = (state: SavedState): SavedItem[] =>
  Object.values(state.items).sort((a, b) => b.savedAt.localeCompare(a.savedAt));

export const clearSavedState = (): SavedState => createEmptyState();

export const readSavedState = (): SavedState => {
  if (typeof window === "undefined") {
    return createEmptyState();
  }

  try {
    const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);
    if (!raw) return createEmptyState();
    return normalizeSavedState(JSON.parse(raw));
  } catch (error) {
    console.warn("[Saved] Failed to read saved items", error);
    return createEmptyState();
  }
};

export const writeSavedState = (state: SavedState): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("[Saved] Failed to persist saved items", error);
  }
};
