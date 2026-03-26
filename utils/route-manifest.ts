export type RouteColor = "green" | "teal" | "wine";
export type GridGroup = "upper" | "lower";

export interface RouteEntry {
  slug: string;
  group: GridGroup;
  color: RouteColor;
}

export const ROUTES: readonly RouteEntry[] = [
  { slug: "apparel", group: "upper", color: "green" },
  { slug: "youtube", group: "upper", color: "teal" },
  { slug: "magazines", group: "upper", color: "wine" },
  { slug: "retailers", group: "upper", color: "teal" },
  { slug: "podcasts", group: "upper", color: "wine" },
  { slug: "tv", group: "upper", color: "green" },
  { slug: "indoor", group: "upper", color: "green" },
  { slug: "places", group: "upper", color: "teal" },
  { slug: "tour", group: "upper", color: "wine" },
  { slug: "books", group: "lower", color: "wine" },
  { slug: "community", group: "lower", color: "green" },
  { slug: "maintenance", group: "lower", color: "teal" },
  { slug: "social", group: "lower", color: "green" },
  { slug: "bikes", group: "lower", color: "teal" },
  { slug: "events", group: "lower", color: "wine" },
  { slug: "nutrition", group: "lower", color: "wine" },
  { slug: "training", group: "lower", color: "green" },
  { slug: "technology", group: "lower", color: "teal" },
] as const;

export const ROUTE_SLUGS = ROUTES.map((r) => r.slug);

export const getRoutesByGroup = (group: GridGroup): readonly RouteEntry[] =>
  ROUTES.filter((r) => r.group === group);
