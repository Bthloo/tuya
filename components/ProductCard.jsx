"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { lang, t } = useLanguage();

  const imageUrl =
    product.images?.length > 0
      ? supabase.storage
          .from("product-images")
          .getPublicUrl(product.images[0].storage_path).data.publicUrl
      : "https://placehold.co/400x400/F7F3EE/262220?font=montserrat&text=No+Image";

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {product.old_price && (
          <span className={styles.discountBadge}>
            -{Math.round(100 - (product.price / product.old_price) * 100)}%
          </span>
        )}

        <Image
          src={imageUrl}
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

          {product.old_price && (
            <span className={styles.oldPrice}>
              {product.old_price} {t.common.currency}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}