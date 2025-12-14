import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SplitUp = () => {
    const hasAnimated = useRef(false);
    const isDesktop = typeof window !== "undefined" ? window.innerWidth > 991 : false;

    useEffect(() => {
        if (hasAnimated.current || !isDesktop) return;
        hasAnimated.current = true;

        document.fonts.ready.then(() => {
            gsap.utils.toArray(".split-up").forEach(item => {
                const originalHTML = item.innerHTML;
                const originalLetterSpacing = window.getComputedStyle(item).letterSpacing;

                const parentSplit = new SplitText(item, { linesClass: "split-parent" });
                new SplitText(item, { type: "lines, chars", linesClass: "split-child" });

                gsap.from(parentSplit.lines, {
                    yPercent: 100,
                    duration: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        once: true,
                        onLeave: () => {
                            // Restore to original after animation
                            item.classList.remove("split-up");
                            item.style.visibility = "hidden";
                            item.innerHTML = originalHTML;
                            item.style.letterSpacing = originalLetterSpacing;
                            item.style.visibility = "visible";
                        }
                    },
                });
            });

            gsap.utils.toArray(".split-left").forEach(item => {
                const splitText = new SplitText(item, {
                    type: "chars,words,lines",
                    reduceWhiteSpace: true,
                });

                const chars = splitText.chars;

                gsap.from(chars, {
                    x: "10vw",
                    scale: 0.95,
                    stagger: 0.015,
                    ease: "expo.out",
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: item,
                        toggleActions: "play none none none",
                        once: true,
                    },
                });

                gsap.from(chars, {
                    opacity: 0,
                    stagger: 0.016,
                    ease: "power4.out",
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: item,
                        toggleActions: "play none none none",
                        once: true,
                    },
                });
            });
        });

        return () => {
            // Optional cleanup
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return null;
};
