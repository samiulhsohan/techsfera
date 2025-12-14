// lib/lenis.js
import Lenis from "@studio-freight/lenis";

let lenis;

export const initLenis = () => {
    if (!lenis) {
        lenis = new Lenis({
            smooth: true,
            lerp: 0.1,
            // ignore native scroll for elements marked with data-lenis-prevent
            prevent: (el) => {
                try {
                    if (!el) return false;
                    if (el.getAttribute && el.getAttribute('data-lenis-prevent') !== null) return true;
                    if (el.closest && el.closest('[data-lenis-prevent]')) return true;
                } catch (e) {
                    return false;
                }
                return false;
            }
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
    }

    return lenis;
};

export const getLenis = () => lenis;
