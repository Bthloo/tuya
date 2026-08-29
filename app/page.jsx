"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { categories, getAllProductsGrouped } from "../data/products";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const { t } = useLanguage();
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProductsGrouped();
        setGrouped(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: "60px 0" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <div
        className="container"
        id="categories"
        style={{ scrollMarginTop: 60, paddingTop: 40, paddingBottom: 40 }}
      >
        {categories.map((cat) => {
          const items = grouped[cat] || [];
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