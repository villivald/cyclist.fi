import GridItem from "./grid-item";
import type { GridBlockProps, LinkItem } from "./types";

export default function GridBlock({ links, label }: GridBlockProps) {
  return (
    <nav aria-label={label}>
      <ul>
        {links.map((link: LinkItem) => (
          <GridItem key={link.title} link={link} />
        ))}
      </ul>
    </nav>
  );
}
