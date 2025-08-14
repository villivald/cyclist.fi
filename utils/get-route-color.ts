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

  const colorEntry = Object.keys(
    colors.filter((color) => Object.values(color)[0].includes(route))[0],
  )[0];

  return colorEntry;
};
