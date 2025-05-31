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
          alt="A purple bike frame on a concrete background"
          aria-describedby="coming-soon-image"
        />
      </figure>
      <p id="coming-soon-image">
        The page you are looking for is not available yet. We are working hard
        to bring you new content and features, so please check back soon!
      </p>
      <Link href="/">{t("goHome")}</Link>
    </div>
  );
}
