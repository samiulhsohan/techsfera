"use client";

import { useGSAP } from "@gsap/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react"; // ✅ added useState
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../app/global.css";
import { Parallax } from "../components/animation/Parallax";
import AnimatedText from "../components/animation/TextAnimation";
import Footer from "../components/home/Footer";
import { initLenis } from "../components/hooks/getLenis";
import DesktopMenu from "../components/Menu";
import MobileMenu from "../components/MobileMenu";
import ScrollIcon from "../components/ScrollIcon";
import FontPreloader from "../FontPreloader";
import StyledComponentsRegistry from "../lib/registry";
import GlobalStyle from "../styles/GlobalStyles";

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
      gsap.to(mainWrapper, { opacity: 1, delay: 0.3 });
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
          <div id="main-wrapper">
            <DesktopMenu />
            <MobileMenu />
            {location === '/' && <ScrollIcon />}
            <div id="main-root">
              <GlobalStyle />
              <ToastContainer />
              {children}
            </div>
            <Footer />
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
