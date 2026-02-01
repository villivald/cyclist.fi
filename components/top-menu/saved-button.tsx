"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import styles from "@/styles/SavedButton.module.css";

const SavedButton = () => {
  const t = useTranslations("Pages");

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/saved"
      className={`${styles.savedLink} ${mounted ? styles.mounted : ""}`}
      aria-label={t("saved")}
      data-testid="saved-link"
    >
      <Image src="/icons/star_filled.svg" alt="" width={44} height={44} />
      <p>{t("saved")}</p>
    </Link>
  );
};

export default SavedButton;
