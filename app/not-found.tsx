import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/NotFound.module.css";

export default function NotFound() {
  const t = useTranslations("Common");

  const randomImage = Math.floor(Math.random() * 3) + 1;

  const altText = [
    "A man in a cycling outfit fixes his road bike on the side of the road",
    "A presumably a broken bicycle on the side of the forest road",
    "A lonely bike tire on the side of the road - is all that remains of the bike",
  ];

  return (
    <div className={styles.notFound}>
      <figure>
        <Image
          fill
          priority
          src={`/images/404_${randomImage}.avif`}
          alt={altText[randomImage - 1]}
          aria-describedby="not-found-image"
        />
      </figure>
      <p id="not-found-image">
        This page could not be found. It may have been removed or never existed.
      </p>
      <Link href="/">{t("goHome")}</Link>
    </div>
  );
}
