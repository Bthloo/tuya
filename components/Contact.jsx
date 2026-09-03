"use client";

import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="contact">
      <div className="container contact-container">

        <div className="contact-info">

          <span className="section-tag">
            {t.contact?.tag || "Contact"}
          </span>

          <h2>
            {t.contact?.title || "Get In Touch"}
          </h2>

          <p>
            {t.contact?.description ||
              "Have questions or want a custom cake? We'd love to hear from you."}
          </p>

          <div className="info-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>Istanbul, Turkey</span>
          </div>

          <div className="info-item">
            <i className="fa-solid fa-phone"></i>
            <span>+90 551 475 68 25</span>
          </div>

          <div className="info-item">
            <i className="fa-solid fa-envelope"></i>
            <span>tuyahomebakes@gmail.com</span>
          </div>

        </div>

        <form className="contact-form">

          <input
            type="text"
            placeholder={t.contact?.name || "Your Name"}
          />

          <input
            type="email"
            placeholder={t.contact?.email || "Email Address"}
          />

          <textarea
            rows="6"
            placeholder={t.contact?.message || "Your Message"}
          ></textarea>

          <button type="submit">
            {t.contact?.send || "Send Message"}
          </button>

        </form>

      </div>
    </section>
  );
}