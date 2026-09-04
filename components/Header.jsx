"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import styles from "./Header.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const { count } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");


  function handleNavClick(e, sectionId) {
    e.preventDefault();

    setActiveSection(sectionId);
    closeMenu();

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    const sections = ["home", "categories", "about", "contact"];

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);

          if (!element) continue;

          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
            return;
          }
        }

        if (window.scrollY < 100) {
          setActiveSection("home");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const LangSwitch = () => (
    <div className={styles.langSwitch} role="group" aria-label="Language">
      <button
        className={lang === "en" ? styles.langActive : styles.langBtn}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        className={lang === "tr" ? styles.langActive : styles.langBtn}
        onClick={() => setLang("tr")}
      >
        TR
      </button>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logoLink} onClick={closeMenu}>
          <Image
            src="/logo.jpg"
            alt={t.siteName}
            width={36}
            height={36}
            className={styles.logoImg}
          />
          <span className={styles.logo}>{t.siteName}</span>
        </Link>

        {!isOpen && (
          <button
            className={styles.burgerBtn}
            onClick={toggleMenu}
            aria-label="Open Menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        )}

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
          <button
            className={styles.closeBtn}
            onClick={closeMenu}
            aria-label="Close Menu"
          >
            <i className="fas fa-times"></i>
          </button>

          <Link
            href="#home"
            className={activeSection === "home" ? styles.linkActive : ""}
            onClick={(e) => handleNavClick(e, "home")}
          >
            {t.nav.home}
          </Link>

          <Link
            href="#categories"
            className={activeSection === "categories" ? styles.linkActive : ""}
            onClick={(e) => handleNavClick(e, "categories")}
          >
            {t.nav.products}
          </Link>

{/*           <Link */}
{/*             href="#about" */}
{/*             className={activeSection === "about" ? styles.linkActive : ""} */}
{/*             onClick={(e) => handleNavClick(e, "about")} */}
{/*           > */}
{/*             {t.nav.about} */}
{/*           </Link> */}

          <Link
            href="#contact"
            className={activeSection === "contact" ? styles.linkActive : ""}
            onClick={(e) => handleNavClick(e, "contact")}
          >
            {t.nav.contact}
          </Link>


          <div className={styles.navLangWrap}>
            <LangSwitch />
          </div>
        </nav>

        <div className={styles.actions}>

          <div className={styles.desktopLangWrap}>
            <LangSwitch />
          </div>

          <Link href="/cart" className={styles.cartLink} aria-label={t.nav.cart}>
            <i className="fa-solid fa-cart-shopping"></i>
            {count > 0 && <span className={styles.cartCount}>{count}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}