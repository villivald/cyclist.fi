import Image from "next/image";

export default function HeroBanner() {
  return (
    <aside aria-hidden="true">
      <Image
        src="/images/banner.avif"
        alt=""
        fill
        priority
        fetchPriority="high"
        decoding="async"
        sizes="100vw"
      />
    </aside>
  );
}
