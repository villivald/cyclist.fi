import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useCallback } from "react";

import styles from "@/styles/Menu.module.css";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Menu");

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <button className={styles.themeButton} onClick={handleChangeTheme}>
      <Image
        src={
          theme === "light" ? "/icons/sun_color.svg" : "/icons/moon_color.svg"
        }
        alt={t("themeToggle")}
        width={44}
        height={44}
      />
      <p>{t("theme")}</p>
    </button>
  );
};

export default ThemeSwitcher;
