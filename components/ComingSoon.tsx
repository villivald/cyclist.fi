import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/ComingSoon.module.css";

export default function ComingSoon() {
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
      <Link href="/">Go to the homepage</Link>
    </div>
  );
}
