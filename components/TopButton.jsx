"use client";
import { useState, useEffect } from "react";


export default function BackToTop() {
  const [visible, setVisible] = useState(false);


  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
  className={`back-to-top ${visible ? "show" : ""}`}
  onClick={scrollToTop}
  title="Back to Top"
>
  <i className="fa-solid fa-circle-up"></i>
</button>
  );
}
