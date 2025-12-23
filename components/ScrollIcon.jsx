"use client";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useEffect, useRef } from "react";
import styled from "styled-components";

// Register the DrawSVG plugin
gsap.registerPlugin(DrawSVGPlugin);

const ScrollIcon = () => {
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const arrowRef = useRef(null);
  const dotRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Initial state - everything invisible
    gsap.set([circleRef.current, arrowRef.current, dotRef.current], {
      drawSVG: "0%"
    });

    // Animate circle drawing
    tl.to(circleRef.current, {
      drawSVG: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    })
      // Animate arrow drawing
      .to(arrowRef.current, {
        drawSVG: "100%",
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.5")
      // Animate dot moving down
      .to(dotRef.current, {
        drawSVG: "100%",
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.3")
      // Pulse effect
      .to(svgRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      }, "-=0.2")
      // Fade out before repeat
      .to([circleRef.current, arrowRef.current, dotRef.current], {
        drawSVG: "0%",
        duration: 0.5,
        ease: "power2.inOut"
      }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate distance from bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Smoothly transition opacity and position based on distance from bottom
      if (distanceFromBottom <= 500) {
        gsap.to(wrapperRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(wrapperRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "none"
        });
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledComponent>
      <div className="svg-wrapper" ref={wrapperRef}>
        <svg
          ref={svgRef}
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <rect width="60" height="60" rx="30" fill="#5DC700" />

          {/* Mouse/scroll indicator circle */}
          <rect
            ref={circleRef}
            x="22"
            y="18"
            width="16"
            height="24"
            rx="8"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />

          {/* Down arrow */}
          <path
            ref={arrowRef}
            d="M26 32L30 36L34 32"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Scrolling dot indicator */}
          <circle
            ref={dotRef}
            cx="30"
            cy="26"
            r="2"
            fill="white"
          />
        </svg>

      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  .svg-wrapper {
    position: fixed;
    bottom: 25px;
    right: 25px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    svg {
      transition: filter 0.3s ease;
      
      &:hover {
        filter: drop-shadow(0 4px 12px rgba(93, 199, 0, 0.3));
      }
    }

    .scroll-text {
      color: white;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
      text-align: center;
      white-space: nowrap;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      transition: opacity 0.3s ease;
    }

    &:hover .scroll-text {
      opacity: 1;
    }

    @media (max-width: 768px) {
      bottom: 15px;
      right: 15px;
      
      svg {
        width: 40px;
        height: 40px;
      }

      .scroll-text {
        font-size: 10px;
      }
    }
  }
`;

export default ScrollIcon;
