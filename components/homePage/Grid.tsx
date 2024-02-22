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
            <a href={link.link}>{link.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
