"use client";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

export default function Footer() {
    const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>{t.siteName}</h2>
          <p>{t.footer.subTitle}</p>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {t.siteName}. {t.footer.copyRight}
          </p>

          <p className="developer">
            {t.footer.developer} <span>Bassel Alaa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}



