import "./globals.css";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "../context/LanguageContext";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import BackToTop from "../components/TopButton";
import Script from "next/script";
import MetaPixelTracker from "@/components/MetaPixelTracker";

export const metadata = {
  title: "TUYA | HOMEBAKES",
  description: "✨Cookie ve Brownie Dünyası ✨",
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={plusJakarta.className} suppressHydrationWarning>
       <Script
         id="meta-pixel"
         strategy="afterInteractive"
         onLoad={() => {
           window.fbq =
             window.fbq ||
             function () {
               (window.fbq.q = window.fbq.q || []).push(arguments);
             };

           window.fbq("init", "1019448381125120");
         }}
         src="https://connect.facebook.net/en_US/fbevents.js"
       />

       <MetaPixelTracker />

       <noscript>
         <img
           height="1"
           width="1"
           style={{ display: "none" }}
           src="https://www.facebook.com/tr?id=1019448381125120&ev=PageView&noscript=1"
           alt=""
         />
       </noscript>

        <LanguageProvider>
          <CartProvider>
            <Header />
            <main style={{ minHeight: "60vh" }}>{children}</main>
            <Contact />
            <BackToTop />
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}