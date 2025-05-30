"use client";

import { useEffect, useState } from "react";

export default function ScrollBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button id="scrollToTopBtn" onClick={scrollToTop}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 21.001L11 2.48245"
              stroke="#0055CC"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
            <path
              d="M21 10.6304L11.2775 1.26792C11.1226 1.11875 10.8774 1.11876 10.7225 1.26792L1 10.6304"
              stroke="#0055CC"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      )}
    </>
  );
}
