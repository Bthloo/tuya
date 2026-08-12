"use client";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer
    id="about"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "26px 0",
        color: "white",
        fontSize: 20,
        backgroundColor:"var(--accent)"
      }}
    >
      <div className="container">
        © {new Date().getFullYear()} {t.siteName}
      </div>
    </footer>
  );
}
