export const getRouteColor = (route: string): string => {
  const colors = [
    { green: ["brands", "tv", "indoor", "sharing", "social"] },
    { teal: ["youtube", "discounts", "places", "caring", "design"] },
    { wine: ["magazines", "podcasts", "tour", "books"] },
  ];

  const colorEntry = Object.keys(
    colors.filter((color) => Object.values(color)[0].includes(route))[0],
  )[0];

  return colorEntry;
};
