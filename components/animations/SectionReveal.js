import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const RevealAnimation = () => {
    const hasAnimated = useRef(false);
    const isDesktop = typeof window !== "undefined" ? window.innerWidth > 991 : false;

    useEffect(() => {
        if (hasAnimated.current || !isDesktop) return;
        hasAnimated.current = true;

        const elements = document.querySelectorAll(".reveal");

        elements.forEach((container, index) => {
            const media = container.querySelector("img,video");
            if (!media) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: `reveal-${index}`,
                    trigger: container,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true,
                    onLeave: () => {
                        // Optionally kill the timeline/trigger after complete
                        ScrollTrigger.getById(`reveal-${index}`)?.kill();
                    }
                },
            });

            tl.set(container, { autoAlpha: 1 });
            tl.from(container, {
                xPercent: -100,
                duration: 1.5,
                ease: Power2.out,
            });
            tl.from(media, {
                xPercent: 100,
                scale: 1.3,
                duration: 1.5,
                ease: Power2.out,
            }, "<");
        });

        ScrollTrigger.refresh();

        return () => {
            // Optional cleanup
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.id?.startsWith("reveal-")) trigger.kill();
            });
        };
    }, []);

    return null;
};
