import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/NotFound.module.css";

export default function NotFound() {
  const t = useTranslations("Common");

  const randomImage = Math.floor(Math.random() * 3) + 1;

  return (
    <div className={styles.notFound}>
      <figure>
        <Image
          fill
          priority
          src={`/images/404_${randomImage}.avif`}
          alt={t(`notFound_alt_${[randomImage]}`)}
          aria-describedby="not-found-image"
        />
      </figure>
      <p id="not-found-image">{t("notFound")}</p>
      <Link href="/">{t("goHome")}</Link>
    </div>
  );
}
