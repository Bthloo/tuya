import "./Hero.css";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  const heroImageUrl =
    "https://images.pexels.com/photos/18543481/pexels-photo-18543481.jpeg";

  return (
    <section className="hero">
      <div className="hero-slider" id="hero-slider">
        <div className="hero-slide">
          {/* Full-width Blurred & Low Opacity Background Image */}
          <div
            className="hero-bg-blur"
            style={{ backgroundImage: `url('${heroImageUrl}')` }}
          />

          {/* Dark Overlay for Text Readability */}
          <div className="hero-overlay"></div>

          {/* Grid Layout Container */}
          <div className="hero-container">
            {/* Text Content Block */}
            <div className="hero-content">
              <h1>{t.hero.slide1Title}</h1>
              <p>{t.hero.slide1Sub}</p>
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
            </div>

            {/* Foreground Sharp Image Card */}
            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img
                  src={heroImageUrl}
                  alt="Hero Showcase"
                  className="hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;