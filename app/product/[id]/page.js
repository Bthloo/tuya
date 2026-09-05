"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";
import { useCart } from "../../../context/CartContext";
import { getProductById } from "../../../data/products";
import { supabase } from "../../../lib/supabase";
import styles from "./product.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
const [imageError, setImageError] = useState(false);
  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

 if (loading) {
   return (
     <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
       <div className={styles.grid}>
         <div>
           <div className={`${styles.mainImage} ${styles.skeleton}`} />

           <div className={styles.thumbs}>
             {[1, 2, 3].map((item) => (
               <div
                 key={item}
                 className={`${styles.thumbSkeleton} ${styles.skeleton}`}
               />
             ))}
           </div>
         </div>

         <div className={styles.info}>
           <div className={`${styles.skeleton} ${styles.titleSkeleton}`} />
           <div className={`${styles.skeleton} ${styles.priceSkeleton}`} />

           <div className={`${styles.skeleton} ${styles.textSkeleton}`} />
           <div className={`${styles.skeleton} ${styles.textSkeleton}`} />
           <div className={`${styles.skeleton} ${styles.shortTextSkeleton}`} />

           <div className={`${styles.skeleton} ${styles.buttonSkeleton}`} />
         </div>
       </div>
     </div>
   );
 }

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 0" }}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fa-solid fa-cookie-bite" />
          </div>

          <h1>{t.product.notFound || "Product not found"}</h1>

          <p>
            {t.product.notFoundDescription ||
              "Sorry, this product is no longer available."}
          </p>
        </div>
      </div>
    );
  }

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

const fallbackImage =
  "https://placehold.co/800x800/F7F3EE/262220?text=No+Image";

  const imageUrls =
    product.images?.length > 0
      ? product.images
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(
            (img) =>
              supabase.storage
                .from("product-images")
                .getPublicUrl(img.storage_path).data.publicUrl
          )
      : ["https://placehold.co/800x800/F7F3EE/262220?font=montserrat&text=No+Image"];

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div className={styles.grid}>
        <div>
          <div className={styles.mainImage}>
            <Image
              src={imageUrls[activeImg]}
              alt={product.name[lang]}
              fill
              sizes="(max-width: 700px) 100vw, 460px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className={styles.thumbs}>
            {imageUrls.map((img, i) => (
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
            {product.old_price && (
              <span className={styles.oldPrice}>
                {product.old_price} {t.common.currency}
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