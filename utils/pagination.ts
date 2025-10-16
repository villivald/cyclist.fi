export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResult<T> extends PaginationMeta {
  items: T[];
}

export const DEFAULT_PAGE_SIZE = 6;

export function getTotalPages(totalItems: number, pageSize: number): number {
  if (pageSize <= 0) return 0;
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function sanitizePage(page: number, totalPages: number): number {
  if (!Number.isFinite(page) || page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
}

export function paginateArray<T>(
  allItems: readonly T[],
  requestedPage: number,
  pageSize: number = DEFAULT_PAGE_SIZE,
): PaginatedResult<T> {
  const totalItems = allItems.length;
  const totalPages = getTotalPages(totalItems, pageSize);
  const currentPage = sanitizePage(requestedPage, totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = allItems.slice(startIndex, endIndex);

  return {
    items,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
}
