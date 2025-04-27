import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const links = [
    { title: "Contact", link: "/contact" },
    { title: "Design elements", link: "/design" },
    { title: "Buy a coffee", link: "/coffee" },
    { title: "Newsletter", link: "/newsletter" },
    { title: "Instagram", link: "/instagram" },
    { title: "Facebook", link: "/facebook" },
  ];

  return (
    <footer className={styles.footerContainer}>
      <section>
        <span>
          The cycling resource you always needed but never had a link to
          CYCLIST.FI
        </span>
        <span>© 2025</span>
      </section>
      <section>
        <div>
          {links.map((link, index) => (
            <a key={index} href={link.link}>
              {link.title}
            </a>
          ))}
        </div>
      </section>
    </footer>
  );
}
