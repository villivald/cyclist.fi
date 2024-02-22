"use client";

import { useEffect } from "react";

export default function ScrollToTopButton() {
  useEffect(() => {
    const scrollToTopButton = document.getElementById("scrollToTop");
    const scrollFunction = () => {
      if (
        document.body.scrollTop > 1200 ||
        document.documentElement.scrollTop > 1200
      ) {
        scrollToTopButton!.style.display = "block";
      } else {
        scrollToTopButton!.style.display = "none";
      }
    };
    window.onscroll = () => {
      scrollFunction();
    };
  }, []);

  return (
    <button
      id="scrollToTop"
      style={{
        display: "none",
        position: "fixed",
        bottom: "20px",
        right: "30px",
        zIndex: 99,
        border: "none",
        outline: "none",
        backgroundColor: "#00A86B",
        color: "white",
        cursor: "pointer",
        padding: "15px",
        borderRadius: "10px",
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Scroll to top
    </button>
  );
}
