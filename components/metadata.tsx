import type { Metadata } from "next";

export const metadataElement = ({ title }: { title: string }): Metadata => {
  return {
    title: `Cyclist.fi | ${title}`,
    description:
      "The cycling resource you always needed but never had a link to CYCLIST.FI",
  };
};
