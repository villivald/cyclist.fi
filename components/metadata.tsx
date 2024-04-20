import type { Metadata } from "next";

export const metadataElement = ({ title }: { title: string }): Metadata => {
  return {
    title: `Cyclist.fi | ${title}`,
    description:
      "The cycling resource you always needed but never had a link to CYCLIST.FI",
    icons: [
      {
        rel: "icon",
        sizes: "32x32",
        url: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/favicon.svg",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/favicon-512x512.png",
      },
    ],
  };
};
