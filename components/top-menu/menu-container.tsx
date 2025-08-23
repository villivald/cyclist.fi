import DropdownMenu from "./dropdown-menu";
import LanguageSwitcher from "./language-switcher";
import SearchButton from "./search-button";
import ThemeSwitcher from "./theme-switcher";

export default function Menu() {
  return (
    <div>
      <SearchButton />
      <ThemeSwitcher />
      <LanguageSwitcher />
      <DropdownMenu />
    </div>
  );
}
