import DropdownMenu from "./dropdown-menu";
import LanguageSwitcher from "./language-switcher";
import ThemeSwitcher from "./theme-switcher";

export default function Menu() {
  return (
    <div>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <DropdownMenu />
    </div>
  );
}
