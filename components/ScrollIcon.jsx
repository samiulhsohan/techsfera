"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const ScrollIcon = () => {
  const svgRef = useRef(null);
  const dotRef = useRef(null);
  const arrowRef = useRef(null);
  const rectRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Create a continuous animation that moves the dot, arrow, and rect from top to bottom
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });

    // Animate dot, arrow, and rect moving down smoothly together
    tl.to([dotRef.current, arrowRef.current, rectRef.current], {
      y: 12, // Move down by 12px
      duration: 1.5,
      ease: "power1.inOut"
    })
      // Fade out at the bottom
      .to([dotRef.current, arrowRef.current, rectRef.current], {
        opacity: 0,
        duration: 0.2,
        ease: "power1.in"
      }, "-=0.2")
      // Reset position to top instantly (invisible)
      .set([dotRef.current, arrowRef.current, rectRef.current], {
        y: 0
      })
      // Fade in at the top
      .to([dotRef.current, arrowRef.current, rectRef.current], {
        opacity: 1,
        duration: 0.2,
        ease: "power1.out"
      })
      // Add shake effect to the SVG
      .to(svgRef.current, {
        x: -2,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(svgRef.current, {
        x: 2,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(svgRef.current, {
        x: -1,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(svgRef.current, {
        x: 1,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(svgRef.current, {
        x: 0,
        duration: 0.1,
        ease: "power2.inOut"
      });

    return () => {
      tl.kill();
    };
  }, []);

  // Handle click to scroll down
  const handleScrollClick = () => {
    window.scrollBy({
      top: window.innerHeight, // 100vh in pixels
      behavior: 'smooth'
    });
  };

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
      <div className="svg-wrapper" ref={wrapperRef} onClick={handleScrollClick}>
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

          {/* Mouse/scroll indicator rectangle */}
          <rect
            ref={rectRef}
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

          {/* Scrolling dot indicator - animates from top to bottom */}
          <circle
            ref={dotRef}
            cx="30"
            cy="22"
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
        width: 50px;
        height: 50px;
      }

      .scroll-text {
        font-size: 10px;
      }
    }
  }
`;

export default ScrollIcon;
