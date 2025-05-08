export type Locale = (typeof locales)[number];

export const locales = ["en", "fi"] as const;
export const defaultLocale: Locale = "en";
