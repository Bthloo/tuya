import "./Hero.css";
import { useLanguage } from "../context/LanguageContext";
const Hero = () => {
    const { t } = useLanguage();
  return (
    <section className="hero">
      <div className="hero-slider" id="hero-slider">
        <div className="hero-slide">
          <div className="hero-overlay"></div>

          <div
            className="hero-background"
            style={{
              backgroundImage:
              "url('https://images.pexels.com/photos/18543481/pexels-photo-18543481.jpeg')"
                // "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3zrrC5GrGxUQz20zrNtc79OMEBZffeA4x3vL3Hzf6A7jEVuKSGZKNi9uu8PDNwrfB-mdwiMTz5AAVVmqIEWeE66RebWVCjuVRQAI55o26TQ2ZHqmu9prIbYXWowQF5r-ChPAUTjexiQjhTdkmywWQcxfs-PVTs3H01EolEYKaT_9mcvrwuhR1NzeZS_p6pxTItEu8TQtbV_XqM-EVVeLsNYEIEOO6f_Cw4Iy6L4H3dsqVdRsfPVfbuRUItdmV_cfctqhbWBufSiw')",
            }}
          />

          <div className="hero-content">
            <h1>{t.hero.slide1Title}</h1>

            <p>
            {t.hero.slide1Sub}
            </p>

            <button 
            onClick={() => document.getElementById("categories").scrollIntoView({ behavior: "smooth" })}
            className="hero-btn"> 
                {t.hero.shopNow}
                </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;