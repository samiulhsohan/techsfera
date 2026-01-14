"use client";
import { gsap } from "gsap";
import parse from "html-react-parser";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const MyComponent = ({ icon, title, subtitle, desc, isFlipped = false, isMobile = false }) => {
  const innerRef = useRef(null);

  // Handle auto-flip on mobile
  useEffect(() => {
    if (!isMobile || !innerRef.current) return;

    gsap.to(innerRef.current, {
      rotateY: isFlipped ? 180 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [isFlipped, isMobile]);

  const handleMouseEnter = () => {
    if (isMobile) return; // Disable hover on mobile
    gsap.to(innerRef.current, {
      rotateY: 180,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };
  const handleMouseLeave = () => {
    if (isMobile) return; // Disable hover on mobile
    gsap.to(innerRef.current, {
      rotateY: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const handleTouchStart = (e) => {
    if (isMobile) {
      e.preventDefault(); // Prevent touch-to-flip on mobile
    }
  };

  const handleTouchEnd = (e) => {
    if (isMobile) {
      e.preventDefault(); // Prevent touch-to-flip on mobile
    }
  };

  return (
    <StyledComponent>
      <div
        className={"flip-box"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
      >
        <div className={"flip-box__inner"} ref={innerRef}>
          <div className={"flip-box__front"}>
            <div className={"flip-box__svg"}>
              <img src={icon} alt={"flip-box"} />
            </div>
            <div className={"flip-box__content"}>
              {title && <h5 className={"split-up-straight"}>{parse(title)}</h5>}
            </div>
          </div>
          <div className={"flip-box__back"}>
            <div className="flip-box__back-content">
              <p className={"title split-up"}>{parse(subtitle)}</p>
              <p className={"split-up"}>{parse(desc)}</p>
            </div>
          </div>
        </div>
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  .flip-box {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background: transparent;
    perspective: 1000px;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  .flip-box__inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    transform-style: preserve-3d;
    transition: none;
  }

  .flip-box__front,
  .flip-box__back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 25px;
    box-sizing: border-box;
    backface-visibility: hidden;
  }

  .flip-box__front {
    background: #f5f5f5;
    justify-content: space-between;
    z-index: 2;
    transform: rotateY(0deg);
  }

  .flip-box__back {
    background: #dfffb9;
    color: #071d21;
    transform: rotateY(180deg);
    align-items: flex-start;
    justify-content: flex-end;
  }

  .flip-box__back-content {
    width: 100%;
  }

  h5 {
    font-weight: 600;
    color: #071d21;
  }

  p {
    color: #071d21;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
  }

  .title {
    color: #071d21;
    font-weight: 600;
    font-size: 16px;
    font-style: normal;
    line-height: 25px;
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    .flip-box__front,
    .flip-box__back {
      padding: 15px 15px 20px 15px;
      justify-content: space-between;
    }

    .flip-box__inner {
      min-height: 170px;
    }

    .flip-box__content {
      color: #071d21;
      font-family: "Bricolage Grotesque";
      font-size: 22px;
      font-style: normal;
      font-weight: 600;
      line-height: 26px;
    }
  }
`;

export default MyComponent;
