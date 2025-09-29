import Link from "next/link";

interface LinkItem {
  title: string;
  link: string;
}

interface GridBlockProps {
  links: LinkItem[];
  label: string;
}

export default function GridBlock({ links, label }: GridBlockProps) {
  return (
    <nav aria-label={label}>
      <ul>
        {links.map((link: LinkItem) => (
          <li key={link.title}>
            <Link href={link.link}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
