import Link from "next/link";
import Image from "next/image";

import "@/styles/not-found.css";

export default function NotFound() {
  const randomImage = Math.floor(Math.random() * 3) + 1;

  const altText = [
    "A man in a cycling outfit fixes his road bike on the side of the road",
    "A presumably a broken bicycle on the side of the forest road",
    "A lonely bike tire on the side of the road - is all that remains of the bike",
  ];

  return (
    <div className="not-found">
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
      <Link href="/">Go to the homepage</Link>
    </div>
  );
}
