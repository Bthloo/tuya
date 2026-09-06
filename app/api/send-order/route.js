import { supabase } from '../../../lib/supabase'

export async function POST(req) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const address = formData.get("address");
    const phone = formData.get("phone");
    const notes = formData.get("notes");
    const itemsJson = formData.get("items");
    const subtotal = formData.get("subtotal");
    const delivery = formData.get("delivery");
    const grandTotal = formData.get("grandTotal");
    const image = formData.get("image");

    const items = JSON.parse(itemsJson);


    let message = `🛍️ *New Order*\n\n`;
    message += `👤 *Name:* ${fullName}\n`;
    message += `📍 *Address:* ${address}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    if (notes) message += `📝 *Notes:* ${notes}\n`;
    message += `\n🧾 *Products:*\n`;

    items.forEach((item) => {
      const name = item.name?.en || item.name?.tr || item.name;
      message += `• ${name} x${item.qty} — ${item.price * item.qty}₺\n`;
    });

    message += `\n💰 *Subtotal:* ${subtotal}₺`;
    message += `\n🚚 *Delivery:* ${delivery}₺`;
    message += `\n*Total:* ${grandTotal}₺`;


    if (image && image.size > 0) {
      const telegramForm = new FormData();
      telegramForm.append("chat_id", CHAT_ID);
      telegramForm.append("caption", message);
      telegramForm.append("parse_mode", "Markdown");
      telegramForm.append("photo", image, image.name);

      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
        { method: "POST", body: telegramForm }
      );
      const data = await res.json();
      if (!data.ok) throw new Error(data.description || "Telegram error");
    } else {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );
      const data = await res.json();
      if (!data.ok) throw new Error(data.description || "Telegram error");
    }


    try {
      try {
        const orderId = crypto.randomUUID();

        const { error: orderError } = await supabase.from("orders").insert({
          id: orderId,
          customer_name: fullName,
          address: address,
          phone: phone,
          notes: notes || null,
          total: parseFloat(grandTotal),
        });

        if (orderError) throw orderError;

        const orderItemsPayload = items.map((item) => ({
          order_id: orderId,
          product_id: item.id,
          product_name: item.name?.en || item.name?.tr || item.name,
          price: item.price,
          qty: item.qty,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItemsPayload);

        if (itemsError) throw itemsError;
      } catch (dbErr) {
        console.error("Supabase save failed (non-blocking):", dbErr);
      }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Telegram send error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}