"use client";

import { useState, useEffect } from "react";
import "./Hero.css";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";

function getDayIndex(count) {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  return dayOfYear % count;
}

const Hero = () => {
  const { t, lang } = useLanguage();

  const [heroImageUrl, setHeroImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHeroImage() {
      try {
        const { data, error } = await supabase.storage
          .from("hero-images")
          .list("", { limit: 100 });

        if (error || !data || data.length === 0) {
          return;
        }

        const files = data.filter(
          (f) => f.name && !f.name.startsWith(".")
        );

        if (files.length === 0) {
          return;
        }

        const index = getDayIndex(files.length);
        const chosen = files[index];

        const { data: urlData } = supabase.storage
          .from("hero-images")
          .getPublicUrl(chosen.name);

        if (urlData?.publicUrl) {
          setHeroImageUrl(urlData.publicUrl);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadHeroImage();
  }, []);

  const trustLine =
    lang === "tr"
      ? "Küçük parti üretim, taze teslim edilir."
      : "Handmade in small batches, delivered fresh.";

  return (
    <section id="home" className="hero">
      <div
        className="hero-bg-blur"
        style={
          heroImageUrl
            ? { backgroundImage: `url('${heroImageUrl}')` }
            : undefined
        }
      />

      <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-content">
          <h1>{t.hero.slide1Title}</h1>
          <p>{t.hero.slide1Sub}</p>

          <div className="hero-actions">
            <button
              onClick={() =>
                document
                  .getElementById("categories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hero-btn"
            >
              {t.hero.shopNow}
            </button>

            <span className="hero-trust">{trustLine}</span>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-card">
            {isLoading ? (
              <div className="hero-image-loading">
                <div className="hero-spinner" />
              </div>
            ) : heroImageUrl ? (
              <img
                src={heroImageUrl}
                alt={t.hero.slide1Title}
                className="hero-img"
              />
            ) : (
              <div className="hero-image-loading">
                <span>Unable to load image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;