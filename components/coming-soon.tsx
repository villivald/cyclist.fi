import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/ComingSoon.module.css";

export default function ComingSoon() {
  const t = useTranslations("Common");

  return (
    <main className={styles.comingSoon}>
      <h1 data-testid="coming-soon-title">{t("comingSoon_title")}</h1>
      <figure>
        <Image
          fill
          priority
          src="/images/coming_soon.avif"
          alt={t("comingSoon_alt")}
          aria-describedby="coming-soon-image"
          sizes="(max-width: 743px) 300px, (max-width: 1943px) calc(35vw + 40px), 720px"
        />
      </figure>
      <p id="coming-soon-image">{t("comingSoon")}</p>
      <Link href="/">{t("goHome")}</Link>
    </main>
  );
}
