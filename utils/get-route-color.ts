import { RouteColor, ROUTES } from "./route-manifest";

const colorBySlug = new Map(ROUTES.map((r) => [r.slug, r.color]));

export const getRouteColor = (route: string): RouteColor =>
  colorBySlug.get(route) ?? "teal";
