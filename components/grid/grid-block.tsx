import Link from "next/link";

interface LinkItem {
  title: string;
  link: string;
}

interface GridBlockProps {
  links: LinkItem[];
}

export default function GridBlock({ links }: GridBlockProps) {
  return (
    <nav>
      <ul>
        {links.map((link: LinkItem, index: number) => (
          <li key={index}>
            <Link href={link.link}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
