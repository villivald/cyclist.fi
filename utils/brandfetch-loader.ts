type ImageLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

interface BrandfetchLoaderOptions {
  overrideSrc?: string;
  defaultQuality?: number;
}

/**
 * Custom loader so Next.js <Image> generates Brandfetch URLs directly
 * and bypasses the Next Image Optimization route (avoids 400s).
 *
 * Behaviors:
 * - If `overrideSrc` is provided, that value is returned as-is (useful for local images).
 * - Otherwise, return a Brandfetch URL of the form:
 *   https://cdn.brandfetch.io/{domain}/w/{width}?q=QUALITY
 */
export function createBrandfetchLoader(opts: BrandfetchLoaderOptions = {}) {
  const defaultQuality = opts.defaultQuality ?? 75;
  const base = "https://cdn.brandfetch.io";

  return ({ src, width, quality }: ImageLoaderParams): string => {
    if (opts.overrideSrc) return opts.overrideSrc;
    if (src.startsWith("/")) return src;

    const q = typeof quality === "number" ? quality : defaultQuality;
    const tokenParam = `?q=${q}`;
    return `${base}/${src}/w/${width}${tokenParam}`;
  };
}
