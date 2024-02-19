import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const links = [
    "Contact",
    "Design elements",
    "Buy a coffee",
    "Newsletter",
    "Instagram",
    "Facebook",
  ];

  return (
    <footer className={styles.footerContainer}>
      <section>
        <span>
          The cycling resource you always needed but never had a link to
          CYCLIST.FI
        </span>
        <span>© 2024</span>
      </section>
      <section>
        <div>
          {links.map((link, index) => (
            <a key={index} href="#">
              {link}
            </a>
          ))}
        </div>
      </section>
    </footer>
  );
}
