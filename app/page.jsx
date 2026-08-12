"use client";
import { useLanguage } from "../context/LanguageContext";
import { categories, getProductsByCategory } from "../data/products";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Hero/>
      <div className="container" id="categories" style={{ scrollMarginTop: 60, paddingTop: 40, paddingBottom: 40 }}>
        {categories.map((cat) => {
          const items = getProductsByCategory(cat);
          if (!items.length) return null;
          return (
            <section key={cat} style={{ marginBottom: 44 }}>
              <h2 className="section-title">{t.categories[cat]}</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: 18,
                }}
              >
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
