import "./globals.css";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "../context/LanguageContext";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import Contact from "../components/Contact";
import BackToTop from "../components/TopButton";
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
   <html
     lang="en"
     className={`${plusJakarta.variable} ${playfair.variable}`}
   >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        
      </head>
      <body className={plusJakarta.className} suppressHydrationWarning>
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main style={{ minHeight: "60vh" }}>{children}</main>
{/*             <About/> */}
            <Contact/>
            <BackToTop />
             <Footer /> 
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
