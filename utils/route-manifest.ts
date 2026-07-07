export type RouteColor = "green" | "teal" | "wine" | "wheat";
export type GridGroup = "upper" | "lower";
export type RouteLayout = "grid" | "list";

export interface RouteEntry {
  slug: string;
  group: GridGroup;
  color: RouteColor;
  layout: RouteLayout;
}

export interface GridRouteEntry {
  slug: string;
  color: RouteColor;
}

export const ROUTES: readonly RouteEntry[] = [
  { slug: "apparel", group: "upper", color: "green", layout: "grid" },
  { slug: "youtube", group: "upper", color: "teal", layout: "list" },
  { slug: "magazines", group: "upper", color: "wine", layout: "list" },
  { slug: "retailers", group: "upper", color: "teal", layout: "list" },
  { slug: "podcasts", group: "upper", color: "wine", layout: "list" },
  { slug: "tv", group: "upper", color: "green", layout: "grid" },
  { slug: "indoor", group: "upper", color: "green", layout: "list" },
  { slug: "places", group: "upper", color: "teal", layout: "grid" },
  { slug: "tour", group: "upper", color: "wine", layout: "grid" },
  { slug: "books", group: "lower", color: "wine", layout: "grid" },
  { slug: "community", group: "lower", color: "green", layout: "list" },
  { slug: "maintenance", group: "lower", color: "teal", layout: "list" },
  { slug: "social", group: "lower", color: "green", layout: "list" },
  { slug: "bikes", group: "lower", color: "teal", layout: "grid" },
  { slug: "events", group: "lower", color: "wine", layout: "grid" },
  { slug: "nutrition", group: "lower", color: "wine", layout: "grid" },
  { slug: "training", group: "lower", color: "green", layout: "grid" },
  { slug: "technology", group: "lower", color: "teal", layout: "grid" },
] as const;

export const GRID_ROUTES: readonly GridRouteEntry[] = [
  { slug: "apparel", color: "wheat" },
  { slug: "youtube", color: "teal" },
  { slug: "magazines", color: "wine" },
  { slug: "retailers", color: "wheat" },
  { slug: "podcasts", color: "teal" },
  { slug: "tv", color: "wine" },
  { slug: "indoor", color: "wheat" },
  { slug: "places", color: "teal" },
  { slug: "tour", color: "wine" },
  { slug: "books", color: "wheat" },
  { slug: "community", color: "teal" },
  { slug: "maintenance", color: "wine" },
  { slug: "social", color: "wheat" },
  { slug: "bikes", color: "teal" },
  { slug: "events", color: "wine" },
  { slug: "nutrition", color: "wheat" },
  { slug: "training", color: "teal" },
  { slug: "technology", color: "wine" },
];

export const ROUTE_SLUGS = ROUTES.map((r) => r.slug);

export const GRID_ROUTE_SLUGS = GRID_ROUTES.map((r) => r.slug);

const routeBySlug = new Map(ROUTES.map((r) => [r.slug, r]));

export const getRoute = (slug: string): RouteEntry | undefined =>
  routeBySlug.get(slug);

export const getRoutesByGroup = (group: GridGroup): readonly RouteEntry[] =>
  ROUTES.filter((r) => r.group === group);

const gridColorBySlug = new Map(GRID_ROUTES.map((r) => [r.slug, r.color]));

export const getGridRouteColor = (slug: string): RouteColor =>
  gridColorBySlug.get(slug) ?? "teal";
