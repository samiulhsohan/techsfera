"use client";

import { useGSAP } from "@gsap/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../app/global.css";
import { Parallax } from "./animation/Parallax";
import AnimatedText from "./animation/TextAnimation";
import Footer from "./home/Footer";
import { initLenis } from "./hooks/getLenis";
import DesktopMenu from "./Menu";
import MobileMenu from "./MobileMenu";
import ScrollIcon from "./ScrollIcon";
import StyledComponentsRegistry from "../lib/registry";
import GlobalStyle from "../styles/GlobalStyles";

gsap.registerPlugin(ScrollTrigger);

export default function ClientLayout({ children }) {
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
    const smoother = typeof window !== "undefined" ? window.ScrollSmoother?.get?.() : null;
    if (smoother) {
      smoother.scrollTop(0, true);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const mainWrapper = document.getElementById("main-wrapper");
    if (mainWrapper) {
      gsap.to(mainWrapper, { opacity: 1, delay: 0.3 });
    }
  }, [location]);

  return (
    <StyledComponentsRegistry>
      <div id="main-wrapper">
        <DesktopMenu />
        <MobileMenu />
        {location === "/" && <ScrollIcon />}
        <div id="main-root">
          <GlobalStyle />
          <ToastContainer />
          {children}
        </div>
        <Footer />
      </div>
    </StyledComponentsRegistry>
  );
}
