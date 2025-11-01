"use client";

import Link from "next/link";
import { Activity, useEffect, useRef, useState } from "react";

import type { PageComponentData } from "@/components/page-component/types";
import { loadRouteData } from "@/utils/load-route-data";

import QuickViewModal from "./quick-view-modal";
import type { LinkItem } from "./types";

export default function GridItem({ link }: { link: LinkItem }) {
  const [loadingRoutes, setLoadingRoutes] = useState<Set<string>>(new Set());
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [previewData, setPreviewData] = useState<
    Record<string, PageComponentData[]>
  >({});
  const [linkElement, setLinkElement] = useState<HTMLAnchorElement | null>(
    null,
  );

  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setViewWidth(window.innerWidth);
    window.addEventListener("resize", () => setViewWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setViewWidth(window.innerWidth),
      );
  }, []);

  const modalIsVisible = Boolean(
    hoveredLink && previewData[hoveredLink]?.length > 0 && viewWidth > 1100,
  );

  const handleModalMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleModalMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredLink(null);
      setLinkElement(null);
    }, 100);
  };

  const handleMouseEnter = (link: string) => {
    if (viewWidth <= 1100) return;

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLink(link);
      const element = linkRefs.current[link];
      if (element) setLinkElement(element);
      if (!previewData[link] && !loadingRoutes.has(link)) {
        setLoadingRoutes((prev) => new Set(prev).add(link));
        loadRouteData(link)
          .then((data) => setPreviewData((prev) => ({ ...prev, [link]: data })))
          .finally(() => {
            setLoadingRoutes((prev) => {
              const next = new Set(prev);
              next.delete(link);
              return next;
            });
          });
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredLink(null);
      setLinkElement(null);
    }, 120);
  };

  return (
    <>
      <li>
        <Link
          href={link.link}
          ref={(el) => {
            linkRefs.current[link.link] = el;
          }}
          onMouseEnter={() => handleMouseEnter(link.link)}
          onMouseLeave={handleMouseLeave}
          onFocus={() => handleMouseEnter(link.link)}
          onBlur={handleMouseLeave}
          aria-haspopup="dialog"
          aria-expanded={modalIsVisible ? "true" : "false"}
        >
          {link.title}
        </Link>
      </li>

      <Activity mode={modalIsVisible ? "visible" : "hidden"}>
        <QuickViewModal
          items={hoveredLink ? (previewData[hoveredLink] ?? []) : []}
          isVisible={modalIsVisible}
          linkElement={linkElement}
          onClose={() => {
            setHoveredLink(null);
            setLinkElement(null);
          }}
          onMouseEnter={handleModalMouseEnter}
          onMouseLeave={handleModalMouseLeave}
        />
      </Activity>
    </>
  );
}
