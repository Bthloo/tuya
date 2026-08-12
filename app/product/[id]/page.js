"use client";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";
import { useCart } from "../../../context/CartContext";
import { getProductById } from "../../../data/products";
import styles from "./product.module.css";



export default function ProductPage() {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const product = getProductById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);



  
  if (!product) {
    return (
      <div className="container" style={{ padding: "60px 0" }}>
        <p>Product not found.</p>
      </div>
    );
  }

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div className={styles.grid}>
        <div>
          <div className={styles.mainImage}>
            <Image
              src={product.images[activeImg]}
              alt={product.name[lang]}
              fill
              sizes="(max-width: 700px) 100vw, 460px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className={styles.thumbs}>
            {product.images.map((img, i) => (
              <button
                key={i}
                className={i === activeImg ? styles.thumbActive : styles.thumb}
                onClick={() => setActiveImg(i)}
                aria-label={`Image ${i + 1}`}
              >
                <Image src={img} alt="" fill style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{product.name[lang]}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>
              {product.price} {t.common.currency}
            </span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>
                {product.oldPrice} {t.common.currency}
              </span>
            )}
          </div>

          <h2 className={styles.descTitle}>{t.product.description}</h2>
          <p className={styles.desc}>{product.description[lang]}</p>

          <div className={styles.qtyRow}>
            <label htmlFor="qty" style={{ margin: 0 }}>
              {t.cart.qty}
            </label>
            <div className={styles.qtyControl}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="-">
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="+">
                +
              </button>
            </div>
          </div>

          <button className="btn btn-block" onClick={handleAdd}>
            {added ? `✓ ${t.product.added}` : t.product.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
