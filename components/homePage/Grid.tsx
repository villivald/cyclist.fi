export default function Grid({ links }: { links: string[] }) {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
