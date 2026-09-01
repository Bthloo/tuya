"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getCategoriesWithProducts, getBestSellers } from "../data/products";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

export default function HomePage() {
  const { lang } = useLanguage();
  const [categoriesData, setCategoriesData] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, best] = await Promise.all([
          getCategoriesWithProducts(),
          getBestSellers(),
        ]);
        setCategoriesData(cats);
        setBestSellers(best);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
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
        {bestSellers.length > 0 && (
          <section style={{ marginBottom: 44 }}>
            <h2 className="section-title">
              {lang === "tr" ? "Çok Satanlar" : "Best Sellers"}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: 18,
              }}
            >
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {categoriesData.map((cat) => {
          if (!cat.products.length) return null;
          return (
            <section key={cat.slug} style={{ marginBottom: 44 }}>
              <h2 className="section-title">{cat.name[lang]}</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: 18,
                }}
              >
                {cat.products.map((p) => (
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