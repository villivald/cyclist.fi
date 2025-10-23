"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import styles from "@/styles/NotFound.module.css";

export default function NotFoundClient() {
  const t = useTranslations("Common");

  // Deterministic on SSR, randomized on client after mount
  const [randomImage, setRandomImage] = useState<number>(1);

  useEffect(() => {
    const imageIndex = Math.floor(Math.random() * 3) + 1;
    setRandomImage(imageIndex);
  }, []);

  return (
    <main id="main-content" className={styles.notFound} tabIndex={-1}>
      <h1 data-testid="page-not-found-title">{t("pageNotFound")}</h1>
      <figure>
        <Image
          fill
          priority
          src={`/images/404_${randomImage}.avif`}
          alt={t(`notFound_alt_${randomImage}`)}
          aria-describedby="not-found-image"
          sizes="(max-width: 400px) 300px, (max-width: 1415px) calc(65vw + 40px), 960px"
        />
      </figure>
      <p id="not-found-image">{t("notFound")}</p>
      <Link href="/">{t("goHome")}</Link>
    </main>
  );
}
