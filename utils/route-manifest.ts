export type RouteColor = "green" | "teal" | "wine";
export type GridGroup = "upper" | "lower";
export type RouteLayout = "grid" | "list";

export interface RouteEntry {
  slug: string;
  group: GridGroup;
  color: RouteColor;
  layout: RouteLayout;
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

export const ROUTE_SLUGS = ROUTES.map((r) => r.slug);

const routeBySlug = new Map(ROUTES.map((r) => [r.slug, r]));

export const getRoute = (slug: string): RouteEntry | undefined =>
  routeBySlug.get(slug);

export const getRoutesByGroup = (group: GridGroup): readonly RouteEntry[] =>
  ROUTES.filter((r) => r.group === group);
