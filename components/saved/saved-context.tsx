"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { PageComponentData } from "@/components/page-component/types";

import {
  buildSavedKey,
  createEmptyState,
  listSavedItems,
  readSavedState,
  SAVED_STORAGE_KEY,
  toggleSavedState,
  writeSavedState,
} from "./storage";
import type { SavedItem, SavedState } from "./types";

type SavedContextValue = {
  savedItems: SavedItem[];
  savedCount: number;
  isSaved: (route: string, itemId: string) => boolean;
  toggleSaved: (route: string, item: PageComponentData) => void;
};

const SavedContext = createContext<SavedContextValue | null>(null);

export const SavedProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<SavedState>(() =>
    typeof window === "undefined" ? createEmptyState() : readSavedState(),
  );

  useEffect(() => {
    setState(readSavedState());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== SAVED_STORAGE_KEY) return;
      setState(readSavedState());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleSaved = useCallback((route: string, item: PageComponentData) => {
    setState((prev) => {
      const next = toggleSavedState(prev, route, item);
      writeSavedState(next);
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (route: string, itemId: string) => {
      const key = buildSavedKey(route, itemId);
      return Boolean(state.items[key]);
    },
    [state.items],
  );

  const savedItems = useMemo(() => listSavedItems(state), [state]);

  const value = useMemo(
    () => ({
      savedItems,
      savedCount: savedItems.length,
      isSaved,
      toggleSaved,
    }),
    [isSaved, savedItems, toggleSaved],
  );

  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
};

export const useSaved = (): SavedContextValue => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within SavedProvider");
  }
  return context;
};
