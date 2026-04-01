const SEARCH_PLACEHOLDERS = {
  en: [
    "Pas Normal Studios...",
    "MAAP...",
    "Tour de France...",
    "GCN...",
    "Zwift...",
    "Rouleur Podcast...",
    "Peloton Helsinki...",
    "Chain Waxing...",
    "Helsinki Gran Fondo...",
    "Strava...",
  ],
  fi: [
    "Pas Normal Studios...",
    "MAAP...",
    "Fillari...",
    "Helsinki Velodrome...",
    "Kilometrikisa...",
    "Tour de France...",
    "Zwift...",
    "Suomen Pyöräily...",
    "Pyöräliitto...",
    "Peloton Helsinki...",
  ],
} as const;

type PlaceholderLocale = keyof typeof SEARCH_PLACEHOLDERS;

const isPlaceholderLocale = (value: string): value is PlaceholderLocale =>
  value === "en" || value === "fi";

export const getRandomSearchPlaceholder = (
  locale: string,
  fallback: string,
): string => {
  const resolvedLocale: PlaceholderLocale = isPlaceholderLocale(locale)
    ? locale
    : "en";
  const candidates = SEARCH_PLACEHOLDERS[resolvedLocale];

  if (!candidates.length) {
    return fallback;
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex] ?? fallback;
};
