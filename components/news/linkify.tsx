import Link from "next/link";

interface Match {
  start: number;
  end: number;
  type: "internal" | "external";
  href: string;
  label: string;
}

interface LinkifyProps {
  children: string;
  className?: string;
}

export const Linkify = ({ children, className }: LinkifyProps) => {
  const linkRegex = /\{\{([^}]+)\}\}/g;

  const normalizeHref = (value: string): string => {
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  };

  const parseLink = (
    match: string,
  ): { type: "internal" | "external"; href: string; label: string } => {
    const content = match.slice(2, -2); // Remove {{ and }}

    // Check if it's an external link (contains |)
    if (content.includes("|")) {
      const [label, url] = content.split("|", 2);
      return {
        type: "external",
        href: normalizeHref(url.trim()),
        label: label.trim(),
      };
    }

    // Internal link: check if it has label/route format
    const parts = content.split("/");
    if (parts.length === 2) {
      return {
        type: "internal",
        href: `/${parts[1]}`,
        label: parts[0],
      };
    }

    // Internal link: simple route format
    return {
      type: "internal",
      href: `/${content}`,
      label: content,
    };
  };

  const matches: Match[] = [];
  const input = children;

  // Find all link matches
  let linkMatch: RegExpExecArray | null;
  const regex = new RegExp(linkRegex);

  while ((linkMatch = regex.exec(input)) !== null) {
    const parsed = parseLink(linkMatch[0]);
    matches.push({
      start: linkMatch.index,
      end: linkMatch.index + linkMatch[0].length,
      type: parsed.type,
      href: parsed.href,
      label: parsed.label,
    });
  }

  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);

  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match) => {
    // Add text before the match
    if (match.start > lastIndex) {
      segments.push(
        <span key={`t-${lastIndex}`}>
          {input.slice(lastIndex, match.start)}
        </span>,
      );
    }

    // Add the link
    if (match.type === "internal") {
      segments.push(
        <Link key={`i-${match.start}`} href={match.href}>
          {match.label}
        </Link>,
      );
    } else {
      segments.push(
        <Link
          key={`e-${match.start}`}
          href={match.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match.label}
        </Link>,
      );
    }

    lastIndex = match.end;
  });

  // Add remaining text
  if (lastIndex < input.length) {
    segments.push(<span key={`t-${lastIndex}`}>{input.slice(lastIndex)}</span>);
  }

  return <p className={className}>{segments}</p>;
};
