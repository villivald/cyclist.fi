import {
  buildSavedKey,
  clearSavedState,
  createEmptyState,
  normalizeSavedState,
  toggleSavedState,
} from "../storage";
import type { SavedState } from "../types";

const sampleItem = {
  id: "maap",
  title: "MAAP",
  description_en: "Test",
  description_fi: "Test",
  link: "https://maap.cc/",
  alt: "MAAP",
  tags: ["Performance"],
  new: false,
};

describe("saved storage", () => {
  it("normalizes invalid data to an empty state", () => {
    const normalized = normalizeSavedState({ version: 2 });
    expect(normalized.items).toEqual({});
    expect(normalized.version).toBe(1);
  });

  it("toggles saved items on and off", () => {
    const initial = createEmptyState();
    const added = toggleSavedState(initial, "apparel", sampleItem);
    const key = buildSavedKey("apparel", sampleItem.id);

    expect(Object.keys(added.items)).toHaveLength(1);
    expect(added.items[key]?.snapshot.title).toBe(sampleItem.title);

    const removed = toggleSavedState(added, "apparel", sampleItem);
    expect(Object.keys(removed.items)).toHaveLength(0);
  });

  it("keeps parsed state intact when schema is valid", () => {
    const key = buildSavedKey("apparel", sampleItem.id);
    const state: SavedState = {
      version: 1,
      updatedAt: new Date().toISOString(),
      items: {
        [key]: {
          key,
          route: "apparel",
          savedAt: new Date().toISOString(),
          snapshot: { ...sampleItem, route: "apparel" },
        },
      },
    };

    const normalized = normalizeSavedState(state);
    expect(normalized.items[key]?.route).toBe("apparel");
  });

  it("clears all saved items", () => {
    const withSaved = toggleSavedState(
      createEmptyState(),
      "apparel",
      sampleItem,
    );
    const cleared = clearSavedState();

    expect(Object.keys(withSaved.items)).toHaveLength(1);
    expect(Object.keys(cleared.items)).toHaveLength(0);
  });
});
