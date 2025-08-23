import { useEffect, useRef } from "react";

export function useSearchShortcut(onOpen: () => void) {
  const isOpenRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Ctrl+K (or Cmd+K on Mac) is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();

        // Only open if not already open
        if (!isOpenRef.current) {
          onOpen();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);

  // Also listen for a button click to open search
  useEffect(() => {
    const handleOpenSearch = () => {
      if (!isOpenRef.current) {
        onOpen();
      }
    };

    // Use window to dispatch/receive a cross-component event
    window.addEventListener("open-search", handleOpenSearch);

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, [onOpen]);

  // Update the ref when search state changes
  const updateOpenState = (isOpen: boolean) => {
    isOpenRef.current = isOpen;
  };

  return { updateOpenState };
}
