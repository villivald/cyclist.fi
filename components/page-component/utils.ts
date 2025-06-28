import { PageComponentData } from "./types";

export const filterByCategory = (
  data: PageComponentData[],
  category: string,
): PageComponentData[] => {
  return data.filter((item) => item.category === category);
};

export const filterByTags = (
  data: PageComponentData[],
  tags: string[],
): PageComponentData[] => {
  return data.filter((item) => item.tags?.some((tag) => tags.includes(tag)));
};

export const getNewItems = (data: PageComponentData[]): PageComponentData[] => {
  return data.filter((item) => item.new);
};

export const sortByTitle = (data: PageComponentData[]): PageComponentData[] => {
  return [...data].sort((a, b) => a.title.localeCompare(b.title));
};

export const sortByNew = (data: PageComponentData[]): PageComponentData[] => {
  return [...data].sort((a, b) => {
    if (a.new && !b.new) return -1;
    if (!a.new && b.new) return 1;
    return 0;
  });
};
