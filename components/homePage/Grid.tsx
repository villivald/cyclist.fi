import Link from "next/link";

export default function Grid({
  links,
}: {
  links: { title: string; link: string }[];
}) {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.link}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
