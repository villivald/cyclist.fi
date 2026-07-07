"use client";

import Link from "next/link";
import { Activity, useEffect, useRef, useState } from "react";

import { getRouteColor } from "@/utils/get-route-color";
import { getGridRouteColor } from "@/utils/route-manifest";

import QuickViewModal from "./quick-view-modal";
import type { LinkItem } from "./types";

export default function GridItem({ link }: { link: LinkItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [linkElement, setLinkElement] = useState<HTMLAnchorElement | null>(
    null,
  );

  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slug = link.link.substring(1);
  const routeColor = getRouteColor(slug);
  const gridColor = getGridRouteColor(slug);
  const routeColorStyle = {
    "--routeColor": `var(--color-${routeColor})`,
  } as React.CSSProperties;
  const gridColorStyle = {
    "--gridColor": `var(--color-${gridColor})`,
  } as React.CSSProperties;

  const modalIsVisible = Boolean(
    isHovered && link.preview.length > 0 && viewWidth > 1100,
  );

  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      setIsHovered(false);
      setLinkElement(null);
    }, 100);
  };

  const handleMouseEnter = () => {
    if (viewWidth <= 1100) return;

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      if (linkRef.current) {
        setLinkElement(linkRef.current);
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setLinkElement(null);
    }, 120);
  };

  return (
    <>
      <li data-grid-color={gridColor} style={gridColorStyle}>
        <Link
          href={link.link}
          ref={linkRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          aria-haspopup="dialog"
          aria-expanded={modalIsVisible ? "true" : "false"}
        >
          {link.title}
        </Link>
      </li>

      <Activity mode={modalIsVisible ? "visible" : "hidden"}>
        <QuickViewModal
          items={link.preview}
          isVisible={modalIsVisible}
          linkElement={linkElement}
          onClose={() => {
            setIsHovered(false);
            setLinkElement(null);
          }}
          onMouseEnter={handleModalMouseEnter}
          onMouseLeave={handleModalMouseLeave}
          routeColorStyle={routeColorStyle}
        />
      </Activity>
    </>
  );
}
