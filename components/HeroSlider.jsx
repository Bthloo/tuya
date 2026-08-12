"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import styles from "./HeroSlider.module.css";

export default function HeroSlider() {
  const { t } = useLanguage();
  const slides = [
    {
      title: t.hero.slide1Title,
      sub: t.hero.slide1Sub,
      bg: "#F7E6E0",
      emoji: "🍫",
    },
    {
      title: t.hero.slide2Title,
      sub: t.hero.slide2Sub,
      bg: "#FBEFD9",
      emoji: "🥮",
    },
  ];

  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  function goTo(i) {
    setIndex((i + slides.length) % slides.length);
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      goTo(index + (diff < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  }

  const slide = slides[index];

  return (
    <div className={`container ${styles.outer}`}>
      <div
        className={styles.wrap}
        style={{ background: slide.bg }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        >
          ‹
        </button>

        <div className={styles.inner}>
          <div className={styles.text}>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.sub}>{slide.sub}</p>
            <a href="#categories" className="btn">
              {t.hero.shopNow}
            </a>
          </div>
          <div className={styles.emoji} aria-hidden="true">
            {slide.emoji}
          </div>
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        >
          ›
        </button>

        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              className={i === index ? styles.dotActive : styles.dot}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

