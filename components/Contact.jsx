"use client";

import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";

export default function Contact() {
  const { t } = useLanguage();

  const contactItems = [
    {
      type: "facebook",
      icon: "fa-brands fa-facebook-f",
      label: "Facebook",
      value: "Tuya Home Bakes",
      link: "https://facebook.com/",
    },
    {
      type: "instagram",
      icon: "fa-brands fa-instagram",
      label: "Instagram",
      value: "@tuya.homebakes",
      link: "https://instagram.com/tuya.homebakes",
    },
    {
      type: "whatsapp",
      icon: "fa-brands fa-whatsapp",
      label: "WhatsApp",
      value: "+90 551 475 68 25",
      link: "https://wa.me/905514756825",
    },
    {
      type: "telegram",
      icon: "fa-brands fa-telegram",
      label: "Telegram",
      value: "@tuyahomebakes",
      link: "https://t.me/",
    },
    {
      type: "location",
      icon: "fa-solid fa-location-dot",
      label: t.contact?.location || "Address",
      value: "Istanbul, Turkey",
      link: "https://maps.google.com/?q=Istanbul,Turkey",
    },
    {
      type: "phone",
      icon: "fa-solid fa-phone",
      label: t.contact?.phone || "Phone",
      value: "+90 551 475 68 25",
      link: "tel:+905514756825",
    },
    {
      type: "email",
      icon: "fa-solid fa-envelope",
      label: "Email",
      value: "tuyahomebakes@gmail.com",
      link: "mailto:tuyahomebakes@gmail.com",
    },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-header">
          <span className="section-tag">
            {t.contact?.tag || "Contact"}
          </span>

          <h2>{t.contact?.title || "Get In Touch"}</h2>

          <p>
            {t.contact?.description ||
              "Have questions? We'd love to hear from you."}
          </p>
        </div>

        <div className="contact-grid">
          {contactItems.map((item) => (
            <a
              key={item.type}
              href={item.link}
              className="contact-card"
              target={
                item.type === "facebook" ||
                item.type === "instagram" ||
                item.type === "telegram"
                  ? "_blank"
                  : undefined
              }
              rel="noopener noreferrer"
            >
              <div className={`contact-icon ${item.type}`}>
                <i className={item.icon}></i>
              </div>

              <div className="contact-details">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>

              <i className="fa-solid fa-arrow-right contact-arrow"></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}