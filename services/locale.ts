"use server";

import { defaultLocale, Locale, locales } from "i18n/config";
import { cookies, headers } from "next/headers";

const COOKIE_NAME = "cyclist.fi_locale";

export async function getUserLocale() {
  // 1) Explicit user choice via cookie wins
  const cookieValue = (await cookies()).get(COOKIE_NAME)?.value;
  if (cookieValue && (locales as readonly string[]).includes(cookieValue)) {
    return cookieValue as Locale;
  }

  // 2) Otherwise, prefer Finnish if it is the top browser preference
  const acceptLanguageHeader = (await headers()).get("accept-language") ?? "";
  if (prefersFinnish(acceptLanguageHeader)) {
    return "fi" satisfies Locale;
  }

  // 3) Fallback to English for all other preferences
  return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}

function prefersFinnish(headerValue: string): boolean {
  // Assume modern browsers send the top preference first. Extract the first tag and strip any parameters.
  // Examples:
  // - "fi-FI,fi;q=0.9,en-US;q=0.8" => firstTag = "fi-FI"
  // - "fi;q=1.0,en;q=0.9" => firstTag = "fi"
  const firstItem = headerValue.split(",")[0]?.trim();
  if (!firstItem) return false;
  const firstTag = firstItem.split(";")[0]?.trim().toLowerCase();
  return firstTag?.startsWith("fi") ?? false;
}
