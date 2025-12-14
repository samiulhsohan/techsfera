"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../app/global.css";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"; // ✅ added useState
import StyledComponentsRegistry from "../lib/registry";
import GlobalStyle from "../styles/GlobalStyles";
import AnimatedText from "../components/animation/TextAnimation";
import { initLenis } from "../components/hooks/getLenis";
import FontPreloader from "../FontPreloader";
import { Parallax } from "../components/animation/Parallax";
import DesktopMenu from "../components/Menu";
import MobileMenu from "../components/MobileMenu";
import ScrollIcon from "../components/ScrollIcon";

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({ children }) {
  const location = usePathname();
  useGSAP(() => {
    const lenis = initLenis();
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    gsap.utils.toArray(".parallax").forEach((element) => {
      const speed = element.dataset.speed ?? 0.3;

      gsap.to(element, {
        y: () => -(window.innerHeight * speed),
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => clearTimeout(refreshTimeout);
  }, [location]);

  Parallax();
  AnimatedText();

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTop(0, true);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const mainWrapper = document.getElementById("main-wrapper");
    if (mainWrapper) {
      gsap.to(mainWrapper, { opacity: 1, delay: 0.5 });
    }
  }, [location]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/images/static/fav.png" />
        <meta content="#000000" name="theme-color" />
        <FontPreloader />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          {/* ✅ Correct conditional rendering */}
          <div id="main-wrapper">
            <DesktopMenu />
            <MobileMenu />
            {location === '/' && <ScrollIcon/>}
            <div id="main-root">
              <GlobalStyle />
              <ToastContainer />
              {children}
            </div>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
