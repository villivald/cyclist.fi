import React from "react";

export const highlightSearchTerm = (
  text: string,
  query: string,
): React.ReactNode[] => {
  if (!query.trim()) return [text];

  // Escape special regex characters in the query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // Check if this part matches the query (case-insensitive)
    const testRegex = new RegExp(`^${escapedQuery}$`, "i");

    if (testRegex.test(part)) {
      return <mark key={index}>{part}</mark>;
    }

    return part;
  });
};
