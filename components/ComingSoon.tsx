import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/ComingSoon.module.css";

export default function ComingSoon() {
  const t = useTranslations("Common");

  return (
    <div className={styles.comingSoon}>
      <figure>
        <Image
          fill
          priority
          src="/images/coming_soon.avif"
          alt={t("comingSoon_alt")}
          aria-describedby="coming-soon-image"
        />
      </figure>
      <p id="coming-soon-image">{t("comingSoon")}</p>
      <Link href="/">{t("goHome")}</Link>
    </div>
  );
}
