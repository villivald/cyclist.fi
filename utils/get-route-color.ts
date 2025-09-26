export const getRouteColor = (route: string): string => {
  const colors = [
    { green: ["apparel", "tv", "indoor", "community", "social", "training"] },
    {
      teal: [
        "youtube",
        "discounts",
        "places",
        "maintenance",
        "bikes",
        "technology",
      ],
    },
    { wine: ["magazines", "podcasts", "tour", "books", "events", "nutrition"] },
  ];

  const colorMatch = colors.find((color) =>
    Object.values(color)[0].includes(route),
  );

  if (!colorMatch) return "teal";

  return Object.keys(colorMatch)[0];
};
