"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { lang, t } = useLanguage();

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {product.oldPrice && (
          <span className={styles.discountBadge}>
            -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
          </span>
        )}

        <Image
          src={product.images[0]}
          alt={product.name[lang]}
          fill
          className={styles.image}
          sizes="(max-width:768px) 50vw, 300px"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name[lang]}</h3>

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
      </div>
    </Link>
  );
}