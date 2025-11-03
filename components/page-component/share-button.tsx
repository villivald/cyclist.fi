"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import styles from "@/styles/PageComponent.module.css";

import type { MenuPosition } from "./types";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const popoverId = useId();
  const pathname = usePathname();
  const t = useTranslations("Common");

  const buttonId = `share-button-${popoverId}`;

  // Construct share URL pointing to cyclist.fi page with item anchor
  const shareUrl = `https://cyclist.fi${pathname}#:~:text=${title}`;

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setMenuPosition(null);
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        closeMenu();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }, [shareUrl, closeMenu]);

  const handleShare = useCallback(
    (platform: "twitter" | "facebook" | "linkedin") => {
      let shareUrlPlatform = "";

      switch (platform) {
        case "twitter":
          shareUrlPlatform = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`;
          break;
        case "facebook":
          shareUrlPlatform = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
          break;
        case "linkedin":
          shareUrlPlatform = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
          break;
      }

      window.open(shareUrlPlatform, "_blank", "noopener,noreferrer");
      closeMenu();
    },
    [shareUrl, title, closeMenu],
  );

  const computeAndSetMenuPosition = useCallback(() => {
    if (!menuRef.current || !buttonRef.current) return;
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const menuElement = menuRef.current;

    const menuWidth = menuElement.offsetWidth;
    const menuHeight = menuElement.offsetHeight;

    // Prefer above the button, otherwise place below
    const gap = 8;
    const topAbove = buttonRect.top - menuHeight - gap;
    const topBelow = buttonRect.bottom + gap;
    const viewportPadding = 8;
    const canPlaceAbove = topAbove >= viewportPadding;
    const top = canPlaceAbove ? topAbove : topBelow;

    // Align menu's right edge with button's right edge, clamped to viewport
    const desiredLeft = buttonRect.right - menuWidth;
    const minLeft = viewportPadding;
    const maxLeft = window.innerWidth - menuWidth - viewportPadding;
    const left = Math.min(Math.max(desiredLeft, minLeft), maxLeft);

    setMenuPosition((prev) => {
      if (prev && prev.top === top && prev.left === left) return prev;
      return { top, left };
    });
  }, []);

  const handleButtonClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Position the menu when opened and on resize/scroll
  useLayoutEffect(() => {
    if (!isOpen) return;
    computeAndSetMenuPosition();
    // Reposition on next frame in case fonts/styles change size
    const raf = requestAnimationFrame(computeAndSetMenuPosition);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, computeAndSetMenuPosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleWindowEvents = () => computeAndSetMenuPosition();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeMenu();
      }
    };
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleWindowEvents);
    window.addEventListener("scroll", handleWindowEvents, true);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("resize", handleWindowEvents);
      window.removeEventListener("scroll", handleWindowEvents, true);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen, computeAndSetMenuPosition, closeMenu]);

  return (
    <div className={styles.shareContainer}>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        className={styles.shareButton}
        onClick={handleButtonClick}
        aria-label={t("share")}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={popoverId}
      >
        <span aria-hidden="true">↗</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id={popoverId}
          className={styles.shareMenu}
          role="menu"
          aria-label={t("shareOptions")}
          style={
            menuPosition
              ? { top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }
              : { visibility: "hidden" }
          }
        >
          <button type="button" role="menuitem" onClick={handleCopyLink}>
            {copied ? t("copied") : t("copyLink")}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handleShare("twitter")}
          >
            {t("shareOnTwitter")}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handleShare("facebook")}
          >
            {t("shareOnFacebook")}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handleShare("linkedin")}
          >
            {t("shareOnLinkedIn")}
          </button>
        </div>
      )}
    </div>
  );
}
