"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext.js";
import { useCart } from "../../context/CartContext.js";
import styles from "./cart.module.css";

const DELIVERY_FEE = 150;
const FREE_DELIVERY_THRESHOLD = 500000000;



const paymentInfo = {
  iban: "TR10 0001 5001 5800 7389 0374 24",
  accountName: "RADWA ELKHAMISY",
};

const visaUploadText = {
  en: {
    label: "Payment screenshot",
    hint: "Upload a screenshot or photo of your transfer/payment",
    chooseFile: "Choose image",
    change: "Change image",
  },
  tr: {
    label: "Ödeme görseli",
    hint: "Ödeme/transfer ekran görüntüsünü veya fotoğrafını yükleyin",
    chooseFile: "Görsel seç",
    change: "Görseli değiştir",
  },
};

const paymentInfoText = {
  en: {
    title: "Payment Details",
    hint: "Please transfer the total amount to the account below, then upload a screenshot as proof.",
    iban: "IBAN",
    name: "Account Name",
    copied: "Copied!",
    copy: "Copy",
  },
  tr: {
    title: "Ödeme Bilgileri",
    hint: "Lütfen toplam tutarı aşağıdaki hesaba transfer edin, ardından kanıt olarak ekran görüntüsü yükleyin.",
    iban: "IBAN",
    name: "Hesap Adı",
    copied: "Kopyalandı!",
    copy: "Kopyala",
  },
};

export default function CartPage() {
    const [sending, setSending] = useState(false);
    const [orderError, setOrderError] = useState("");

  const { lang, t } = useLanguage();
  const { items, updateQty, removeFromCart, subtotal, clearCart } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
    notes: "",
  });
  const [paymentImage, setPaymentImage] = useState(null);
  const [paymentImagePreview, setPaymentImagePreview] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (paymentImagePreview) {
        URL.revokeObjectURL(paymentImagePreview);
      }
    };
  }, [paymentImagePreview]);

  const vt = visaUploadText[lang] || visaUploadText["en"];
  const pt = paymentInfoText[lang] || paymentInfoText["en"];

  const delivery =
    items.length === 0
      ? 0
      : subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_FEE;
  const grandTotal = subtotal + delivery;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (paymentImagePreview) {
      URL.revokeObjectURL(paymentImagePreview);
    }

    setPaymentImage(file);
    setPaymentImagePreview(URL.createObjectURL(file));
  }

  function handleCopyIban() {
    navigator.clipboard.writeText(paymentInfo.iban.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleQtyMinus(item) {
    if (item.qty > 1) {
      updateQty(item.id, item.qty - 1);
    } else {
      const confirmRemove = window.confirm(
        t.cart.confirmRemove || "Remove this item?"
      );
      if (confirmRemove) {
        removeFromCart(item.id);
      }
    }
  }

  function handleRemoveItem(id) {
    const confirmRemove = window.confirm(
      t.cart.confirmRemove || "Are you sure?"
    );
    if (confirmRemove) {
      removeFromCart(id);
    }
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setOrderError("");
    setSending(true);

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("address", form.address);
      formData.append("phone", form.phone);
      formData.append("notes", form.notes || "");
      formData.append("items", JSON.stringify(items));
      formData.append("subtotal", subtotal);
      formData.append("delivery", delivery);
      formData.append("grandTotal", grandTotal);
      if (paymentImage) {
        formData.append("image", paymentImage);
      }

      const res = await fetch("/api/send-order", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to send order");
      }

      setOrderDone(true);
      clearCart();
    } catch (err) {
      console.error(err);
      setOrderError(
        lang === "tr"
          ? "Sipariş gönderilemedi. Lütfen tekrar deneyin."
          : "Couldn't send your order. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  if (orderDone) {
    return (
      <div
        className="container"
        style={{ paddingTop: 70, paddingBottom: 70, textAlign: "center" }}
      >
        <h1 style={{ fontSize: 26, marginBottom: 14 }}>
          ✓ {t.cart.orderSuccess}
        </h1>
        <Link href="/" className="btn">
          {t.cart.backToHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 70 }}>
      <h1 className="section-title">{t.cart.title}</h1>

      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>
            <i className="fa-solid fa-cookie-bite" />
          </div>

          <h2>{t.cart.empty || "Your cart is empty"}</h2>

          <p>{t.cart.empty || "Looks like you haven't added anything yet."}</p>

          <Link href="/" className="btn">
            <i className="fa-solid fa-arrow-left" />
            {t.cart.continueShopping}
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.list}>
            {items.map((item) => (
              <div key={item.id} className={styles.row}>
                <div className={styles.rowImage}>
                  <Image
                    src={item.image}
                    alt={item.name[lang] || ""}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.rowInfo}>
                  <Link href={`/product/${item.id}`} className={styles.rowName}>
                    {item.name[lang]}
                  </Link>
                  <span className={styles.rowPrice}>
                    {item.price} {t.common.currency}
                  </span>
                </div>
                <div className={styles.qtyControl}>
                  <button
                    type="button"
                    onClick={() => handleQtyMinus(item)}
                    aria-label="-"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    aria-label="+"
                  >
                    +
                  </button>
                </div>
                <div className={styles.rowTotal}>
                  {item.price * item.qty} {t.common.currency}
                </div>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  {t.cart.remove}
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>{t.cart.subtotal}</span>
              <span>
                {subtotal} {t.common.currency}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span>{t.cart.delivery}</span>
              <span>
                {delivery === 0
                  ? t.cart.free
                  : `${delivery} ${t.common.currency}`}
              </span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>{t.cart.grandTotal}</span>
              <span>
                {grandTotal} {t.common.currency}
              </span>
            </div>

            {!checkoutOpen && (
              <button
                className="btn btn-block"
                onClick={() => setCheckoutOpen(true)}
              >
                {t.cart.checkout}
              </button>
            )}

            {checkoutOpen && (
              <form className={styles.checkoutForm} onSubmit={handlePlaceOrder}>
                <label className={styles.formTitle}>
                  💳 {t.cart.visa}
                </label>

                <div className={styles.field}>
                  <label htmlFor="fullName">{t.cart.fullName}</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="address">{t.cart.address}</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone">{t.cart.phone}</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="notes">
                    {t.cart.notes || "Notes (Optional)"}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder={
                      t.cart.notesPlaceholder ||
                      "Write any notes about your order..."
                    }
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.formTitle} style={{ marginBottom: 4 }}>
                    🏦 {pt.title}
                  </label>
                  <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 10px" }}>
                    {pt.hint}
                  </p>

                  <div
                    style={{
                      background: "var(--surface, #f7f3ee)",
                      border: "1px solid var(--border, #e5ddd3)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>
                        {pt.iban}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <strong style={{ fontSize: 15, letterSpacing: 0.5 }}>
                          {paymentInfo.iban}
                        </strong>
                        <button
                          type="button"
                          onClick={handleCopyIban}
                          style={{
                            fontSize: 12,
                            padding: "4px 10px",
                            borderRadius: 6,
                            border: "1px solid var(--border, #ccc)",
                            background: "#fff",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {copied ? pt.copied : pt.copy}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>
                        {pt.name}
                      </span>
                      <div>
                        <strong style={{ fontSize: 15 }}>
                          {paymentInfo.accountName}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="paymentImage">{vt.label}</label>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      margin: "0 0 8px",
                    }}
                  >
                    {vt.hint}
                  </p>

                  {paymentImagePreview && (
                    <div className={styles.imagePreviewWrap}>
                      <Image
                        src={paymentImagePreview}
                        alt="Preview"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <label htmlFor="paymentImage" className={styles.uploadBtn}>
                    {paymentImage ? vt.change : vt.chooseFile}
                  </label>
                  <input
                    id="paymentImage"
                    name="paymentImage"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className={styles.hiddenFileInput}
                  />
                </div>

                {orderError && (
                  <p style={{ color: "#c0392b", fontSize: 14, marginTop: 8 }}>
                    {orderError}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-block"
                  style={{ marginTop: 10 }}
                  disabled={sending}
                >
                  {sending ? "..." : t.cart.placeOrder}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}