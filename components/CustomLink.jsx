"use client";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import React, {useEffect} from "react";

export const CustomLink = ({ children, href, toggleMenu, stopPropagation = false, className = '', ...props }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e) => {
        if (stopPropagation) e.stopPropagation(); // safely stop here

        e.preventDefault();
        if (pathname === href) return;

        const mainWrapper = document.querySelector("#main-wrapper");

        const tl = gsap.timeline({
            onComplete: () => {
                toggleMenu?.();
                router.push(href);
            }
        });

        tl.to(mainWrapper, {
            opacity: 0,
            duration: 0.3,
            ease: 'power1.out'
        });
    };

    return (
        <Link href={href} prefetch={true} onClick={handleClick} className={className} {...props}>
            {children}
        </Link>
    );
};


//how to use
//add this to the layout.tsx or layout.jsx file
// const location = usePathname();
// useEffect(() => {
//     const mainWrapper = document.getElementById('main-wrapper');
//     if (mainWrapper) {
//         gsap.to(mainWrapper, {opacity: 1, delay: 0.5});
//     }
// }, [location]);

// then wrap the main parent with 'main-wrapper' class
//
//     <div id="main-wrapper">
//     {children}
//     </div>

//add css to the global.css file with project bodycolor
// #main-wrapper {
//     opacity: 0;
//     background: #051936;
// }

//finally use CustomLink instead of default Link
// <CustomLink href="about">About</CustomLink>

