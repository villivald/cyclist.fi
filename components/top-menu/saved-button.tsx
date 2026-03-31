"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useSavedCount } from "@/components/saved/saved-context";
import styles from "@/styles/SavedButton.module.css";

const SavedButton = () => {
  const t = useTranslations("Pages");
  const savedCount = useSavedCount();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/saved"
      className={`${styles.savedLink} ${mounted ? styles.mounted : ""}`}
      aria-label={savedCount > 0 ? `${t("saved")} (${savedCount})` : t("saved")}
      data-testid="saved-link"
    >
      <Image src="/icons/star_filled.svg" alt="" width={44} height={44} />
      <p>{t("saved")}</p>
      {savedCount > 0 && (
        <span className={styles.savedCountSuperscript} aria-hidden="true">
          {savedCount > 99 ? "99+" : savedCount}
        </span>
      )}
    </Link>
  );
};

export default SavedButton;
