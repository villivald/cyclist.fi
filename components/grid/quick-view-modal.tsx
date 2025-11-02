"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import styles from "@/styles/QuickViewModal.module.css";
import { createBrandfetchLoader } from "@/utils/brandfetch-loader";
import { linkToDisplay } from "@/utils/link-to-display";

import type { QuickViewModalProps } from "./types";

export default function QuickViewModal({
  items,
  isVisible,
  onClose,
  linkElement,
  onMouseEnter,
  onMouseLeave,
  routeColorStyle,
}: QuickViewModalProps) {
  const locale = useLocale();
  const t = useTranslations("Search");

  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const brandfetchLoader = createBrandfetchLoader({});

  useEffect(() => {
    if (!isVisible || !linkElement || !modalRef.current) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      if (!linkElement || !modalRef.current) return;

      const rect = linkElement.getBoundingClientRect();
      const modal = modalRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = 16; // viewport padding
      const gap = 8; // space between trigger and modal

      // Use requestAnimationFrame to ensure modal is rendered
      requestAnimationFrame(() => {
        if (!modalRef.current) return;

        const modalWidth = modal.offsetWidth || 360;
        const modalHeight = modal.offsetHeight || 420;

        // Helper functions for clamping positions
        const clampHorizontal = (left: number) =>
          Math.max(margin, Math.min(left, viewportWidth - margin - modalWidth));

        const clampVertical = (top: number) =>
          Math.max(
            margin,
            Math.min(top, viewportHeight - margin - modalHeight),
          );

        // Candidate placements: bottom, top, right, left
        const placeBottom = () => {
          const top = rect.bottom + gap;
          const left = clampHorizontal(
            rect.left + rect.width / 2 - modalWidth / 2,
          );
          return {
            fits: top + modalHeight <= viewportHeight - margin,
            top,
            left,
          };
        };

        const placeTop = () => {
          const top = rect.top - modalHeight - gap;
          const left = clampHorizontal(
            rect.left + rect.width / 2 - modalWidth / 2,
          );
          return { fits: top >= margin, top, left };
        };

        const placeRight = () => {
          const left = rect.right + gap;
          const top = clampVertical(
            rect.top + rect.height / 2 - modalHeight / 2,
          );
          return {
            fits: left + modalWidth <= viewportWidth - margin,
            top,
            left,
          };
        };

        const placeLeft = () => {
          const left = rect.left - modalWidth - gap;
          const top = clampVertical(
            rect.top + rect.height / 2 - modalHeight / 2,
          );
          return { fits: left >= margin, top, left };
        };

        const candidates = [
          placeBottom(),
          placeTop(),
          placeRight(),
          placeLeft(),
        ];
        const found = candidates.find((c) => c.fits);

        if (found) {
          setPosition({ top: found.top, left: found.left });
          return;
        }

        // Fallback: clamp bottom placement to viewport
        const fallbackTop = clampVertical(rect.bottom + gap);
        const fallbackLeft = clampHorizontal(
          rect.left + rect.width / 2 - modalWidth / 2,
        );

        setPosition({ top: fallbackTop, left: fallbackLeft });
      });
    };

    // Initial position calculation after a small delay to ensure rendering
    const timeoutId = setTimeout(updatePosition, 0);

    // Update on scroll and resize
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, linkElement]);

  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        linkElement &&
        !modalRef.current.contains(e.target as Node) &&
        !linkElement.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose, linkElement]);

  if (!isVisible || items.length === 0) return null;

  const previewItems = items.slice(0, 4);

  const positionStyle = {
    top: `${position?.top}px`,
    left: `${position?.left}px`,
    visibility: position ? ("visible" as const) : ("hidden" as const),
  };

  return (
    <div
      ref={modalRef}
      className={styles.modal}
      role="dialog"
      aria-label={t("quickPreview")}
      aria-modal="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      style={{
        ...routeColorStyle,
        ...positionStyle,
      }}
    >
      <section className={styles.content}>
        {previewItems.map((item) => {
          // Determine image source – align with DataRow: local path if provided, else Brandfetch domain
          const imageSrc =
            item.image && item.image.startsWith("/")
              ? item.image
              : linkToDisplay(item.link);

          return (
            <div key={item.id} className={styles.item}>
              <div className={styles.imageContainer}>
                <Image
                  loader={brandfetchLoader}
                  src={imageSrc}
                  alt={item.alt}
                  width={64}
                  height={48}
                  className={styles.image}
                  sizes="64px"
                />
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>
                  {locale === "fi" ? item.description_fi : item.description_en}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className={styles.tags}>
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <Link
        href={linkElement?.getAttribute("href") ?? "#"}
        className={styles.viewAllLink}
      >
        {t("viewAll")} →
      </Link>
    </div>
  );
}
