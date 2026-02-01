import { useTranslations } from "next-intl";

import DropdownMenu from "./dropdown-menu";
import LanguageSwitcher from "./language-switcher";
import SavedButton from "./saved-button";
import SearchButton from "./search-button";
import ThemeSwitcher from "./theme-switcher";

export default function Menu() {
  const t = useTranslations("Menu");

  return (
    <nav aria-label={t("label")}>
      <SearchButton />
      <SavedButton />
      <ThemeSwitcher />
      <LanguageSwitcher />
      <DropdownMenu />
    </nav>
  );
}
