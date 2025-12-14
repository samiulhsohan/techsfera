import {useEffect, useState} from "react";
import { gsap } from "gsap";
import SplitText from "gsap/dist/SplitText";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Helper to get rootMargin based on device width
const getRootMargin = () => {
    if (typeof window !== 'undefined') {
        return window.innerWidth < 1024 ? "0px 0px 1% 0px" : "0px 0px 20% 0px";
    }
    return "0px 0px 20% 0px";
};

const AnimatedText = () => {
    const location = usePathname();
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        // Query all elements with the 'split-up' class
        const elements = document.querySelectorAll(".split-up");

        if (elements.length === 0) return;

        // Register GSAP plugin if not already registered
        if (!gsap.core.globals().SplitText) {
            gsap.registerPlugin(SplitText);
        }

        // Function to wrap lines around <br />
        const wrapLines = (element) => {
            const html = element.innerHTML;
            element.innerHTML = html.replace(/<br\s*\/?\>/g, '<div class="lineBreak"></div>');
        };

        // Process each element
        elements.forEach(wrapLines);

        // IntersectionObserver callback
        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // Apply SplitText and animations
                    const splitTextChild = new SplitText(element, { type: "lines", linesClass: "lineChild" });
                    const splitTextParent = new SplitText(element, { type: "lines", linesClass: "lineParent" });

                    // Ensure 'lineParent' has overflow hidden
                    splitTextParent.lines.forEach((line) => {
                        line.style.overflow = "hidden";
                    });

                    const tl = gsap.timeline({
                        onComplete: () => {
                            splitTextChild.revert(); // Cleanup to revert SplitText
                        },
                    });

                    tl.from(splitTextChild.lines, {
                        delay: 0.2,
                        y: "100%",
                        duration: 0.5,
                        stagger: 0.05,
                    });

                    observer.unobserve(element); // Stop observing once animation is triggered
                }
            });
        };

        // Create an IntersectionObserver
        const observer = new IntersectionObserver(handleIntersect, {
            rootMargin: getRootMargin(),
            threshold: 0,
        });


        // Observe each element
        elements.forEach((element) => observer.observe(element));

        // Cleanup the observer
        return () => {
            observer.disconnect();
        };
    }, [location]);

    // New effect for split-up-delay
    useEffect(() => {
        const elements = document.querySelectorAll(".split-up-delay");
        if (elements.length === 0) return;
        if (!gsap.core.globals().SplitText) {
            gsap.registerPlugin(SplitText);
        }
        const wrapLines = (element) => {
            const html = element.innerHTML;
            element.innerHTML = html.replace(/<br\s*\/?\>/g, '<div class="lineBreak"></div>');
        };
        elements.forEach(wrapLines);
        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const splitTextChild = new SplitText(element, { type: "lines", linesClass: "lineChild" });
                    const splitTextParent = new SplitText(element, { type: "lines", linesClass: "lineParent" });
                    splitTextParent.lines.forEach((line) => {
                        line.style.overflow = "hidden";
                    });
                    const tl = gsap.timeline({
                        onComplete: () => {
                            splitTextChild.revert();
                        },
                    });
                    tl.from(splitTextChild.lines, {
                        delay: .5,
                        y: "100%",
                        duration: 0.5,
                        stagger: 0.05,
                    });
                    observer.unobserve(element);
                }
            });
        };
        const observer = new IntersectionObserver(handleIntersect, {
            rootMargin: getRootMargin(),
            threshold: 0,
        });
        elements.forEach((element) => observer.observe(element));
        return () => {
            observer.disconnect();
        };
    }, [location]);

    useEffect(() => {

        document.fonts.ready.then(() => {
            gsap.utils.toArray(".split-up-straight").forEach(item => {
                const originalHTML = item.innerHTML;
                const originalLetterSpacing = window.getComputedStyle(item).letterSpacing;

                const parentSplit = new SplitText(item, { linesClass: "split-parent" });
                new SplitText(item, { type: "lines, chars", linesClass: "split-child" });

                gsap.from(parentSplit.lines, {
                    yPercent: 100,
                    duration: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: window.innerWidth < 1024 ? "top 99%" : "top 98%", // 1% for mobile/tablet, 2% for desktop
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

        });

        return () => {
            // Optional cleanup
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [location]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return null; // or JSX if needed
};

export default AnimatedText;
