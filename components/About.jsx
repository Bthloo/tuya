"use client";

import { useLanguage } from "../context/LanguageContext";
import "./About.css";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about">
      <div className="container about-container">
        <div className="about-image">
          <img src="/logo.jpg" alt="About Us" />
        </div>

        <div className="about-content">
          <span className="section-tag">
            {t.about?.tag || "About Us"}
          </span>

          <h2>
            {t.about?.title || "Crafting Sweet Memories Every Day"}
          </h2>

          <p>
            {t.about?.description ||
              "We create handmade desserts using premium ingredients and traditional recipes. Every cake, cookie, and pastry is carefully crafted to bring happiness to every celebration."}
          </p>

          <div className="about-stats">
            <div>
              <h3>500+</h3>
              <span>Happy Customers</span>
            </div>

            <div>
              <h3>50+</h3>
              <span>Desserts</span>
            </div>

            <div>
              <h3>10+</h3>
              <span>Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}