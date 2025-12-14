import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";

export const Parallax = () => {
    gsap.registerPlugin(ScrollTrigger);
    const isDesktop = typeof window !== 'undefined' ? window.innerWidth > 991 : false;
    const location = usePathname();
    useEffect(() => {
        if (isDesktop) {
            gsap.utils.toArray('.global-image-parallax').forEach(container => {
                const img = container.querySelector('img');
                let parallaxSpeed = container.getAttribute('speed');
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        scrub: true,
                        pin: false,
                    }
                });

                tl.fromTo(img, {
                    yPercent: parallaxSpeed ? -parallaxSpeed : -15,
                    scale: 1.2,
                    ease: 'none'
                }, {
                    yPercent: parallaxSpeed ? parallaxSpeed : 15,
                    scale: 1,
                    ease: 'none'
                });
            });
        }
    }, [location])
}


/* how to use
 - Add 'parallax' class on the parent section. Add 'data-speed={speed string/number}' for parallax speed (if needed)
 - Add 'parallax' props on Img component.
*/



/*
How to use:
- add 'parallax-img' to the parent div of Img component/img tag
- Add 'data-speed={speed string/number}' for parallax speed (if needed)
*/