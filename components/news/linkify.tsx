import Link from "next/link";

export const Linkify = ({ children }: { children: string }) => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

  const normalizeHref = (value: string): string => {
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  };

  const getDisplayText = (value: string): string => {
    return value
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .split(".com/")[0];
  };

  const segments: React.ReactNode[] = [];
  let lastIndex = 0;
  const input = children;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(input)) !== null) {
    const start = match.index;
    const url = match[0];

    if (start > lastIndex) {
      segments.push(
        <span key={`t-${lastIndex}`}>{input.slice(lastIndex, start)}</span>,
      );
    }

    const href = normalizeHref(url);
    const label = getDisplayText(url);
    segments.push(
      <Link
        key={`l-${start}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </Link>,
    );
    lastIndex = start + url.length;
  }

  if (lastIndex < input.length) {
    segments.push(<span key={`t-${lastIndex}`}>{input.slice(lastIndex)}</span>);
  }

  return <p>{segments}</p>;
};
