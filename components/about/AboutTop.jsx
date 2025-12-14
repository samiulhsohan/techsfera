"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { gsap } from "gsap";
import Link from "next/link";

const AboutTop = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const ellipseRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!pathRef.current || !ellipseRef.current || !svgRef.current) return;

    const path = pathRef.current;
    const ellipse = ellipseRef.current;
    const svg = svgRef.current;

    // Get the total length of the path
    const pathLength = path.getTotalLength();

    // Set initial stroke properties for drawing animation
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      stroke: "#F2FFE2",
      strokeWidth: 2,
      fill: "none",
    });

    gsap.set(ellipse, {
      stroke: "#C9FD8C",
      strokeWidth: 2,
      fill: "none",
    });

    // Create the animation timeline
    const tl = gsap.timeline({ repeat: -1 });

    // Function to create drawing animation
    const drawPath = () => {
      return gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      });
    };

    // Function to create ellipse drawing animation
    const drawEllipse = () => {
      return gsap.to(ellipse, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    };

    // Function to flip the SVG
    const flipSvg = () => {
      return gsap.to(svg, {
        rotationY: 180,
        duration: 1,
        ease: "power2.inOut",
      });
    };

    // Function to reset flip
    const resetFlip = () => {
      return gsap.to(svg, {
        rotationY: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    };

    // Function to fill the shapes
    const fillShapes = () => {
      return gsap.to([path, ellipse], {
        fill: (i) => (i === 0 ? "#F2FFE2" : "#C9FD8C"),
        duration: 0.5,
        ease: "power2.inOut",
      });
    };

    // Function to reverse the drawing (undraw)
    const reverseDraw = () => {
      return gsap.to([path, ellipse], {
        strokeDashoffset: (i) =>
          i === 0 ? pathLength : ellipse.getTotalLength(),
        duration: 1.5,
        ease: "power2.inOut",
      });
    };

    // Function to reset fill
    const resetFill = () => {
      return gsap.to([path, ellipse], {
        fill: "none",
        duration: 0.5,
        ease: "power2.inOut",
      });
    };

    // Build the animation sequence
    tl.add(drawPath(), 0)
      .add(drawEllipse(), 0.5)
      .add(fillShapes(), 2.5)
      .add(flipSvg(), 3)
      .add(resetFill(), 4)
      .add(reverseDraw(), 4.5)
      .add(resetFlip(), 6);

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [isMobile]); // Re-run animation when switching between mobile/desktop

  return (
    <StyledComponent className={"about-top"}>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <Row>
              <Col lg={6} md={12} className={"about-top__left"}>
                <div className={"about-top__svg"}>
                  <div className={"about-top__svg__wrapper"}>
                    <svg
                      ref={svgRef}
                      xmlns="http://www.w3.org/2000/svg"
                      width={isMobile ? "36" : "50"}
                      height={isMobile ? "76" : "108"}
                      viewBox={isMobile ? "0 0 36 76" : "0 0 50 108"}
                      fill="none"
                    >
                      <path
                        ref={pathRef}
                        d={
                          isMobile
                            ? "M16.1427 0.416748V17.4607H35.1393V30.9532H6.05666V34.4109C8.84466 34.4109 11.2227 35.4256 13.1907 37.4551C15.1587 39.4846 16.1427 41.9369 16.1427 44.8121V46.1651C16.1427 50.1113 17.5093 53.4938 20.2427 56.3126C22.976 59.1313 26.256 60.5407 30.0827 60.5407H35.1393V75.5834H30.5838C25.5544 75.5834 20.4067 74.9727 16.1427 72.5486C11.168 69.6734 7.28666 65.6708 4.49866 60.5407C2.14799 56.1434 0.972656 51.3516 0.972656 46.1651V8.11193L16.1427 0.416748Z"
                            : "M22.6324 0.30957V24.6581H49.7705V43.9331H8.22379V48.8726C12.2067 48.8726 15.6038 50.3223 18.4152 53.2215C21.2267 56.1208 22.6324 59.6241 22.6324 63.7314V65.6643C22.6324 71.3018 24.5847 76.134 28.4895 80.1607C32.3943 84.1875 37.08 86.2009 42.5467 86.2009H49.7705V107.691H43.2625C36.0778 107.691 28.7238 106.818 22.6324 103.355C15.5257 99.2477 9.98094 93.5297 5.99808 86.2009C2.63999 79.9191 0.960938 73.0736 0.960938 65.6643V11.3027L22.6324 0.30957Z"
                        }
                      />
                      <ellipse
                        ref={ellipseRef}
                        cx={isMobile ? "28.306" : "40.008"}
                        cy={isMobile ? "45.0469" : "64.067"}
                        rx={isMobile ? "6.83333" : "9.76191"}
                        ry={isMobile ? "7.04687" : "10.067"}
                      />
                    </svg>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={12} className={"about-top__right"}>
                <div className={"about-top__inner"}>
                  <h3 className={"split-up-delay"}>
                    Built in Dhaka, Engineering for the World.
                  </h3>
                  <h6 className={"split-up-delay"}>
                    We aren't just vendors; we are your extended team. By fusing
                    high-end design with powerful code, we don't just execute
                    tasks—we build digital products that drive your business
                    forward.
                  </h6>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  .col-lg-9 {
    padding-right: 30px;
  }
  overflow: hidden;

  .about-top {
    &__left {
      padding: 0 0 0 3px;
    }

    &__svg {
      border-radius: 30px;
      background: #c9fd8c;
      padding: 70px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      &__wrapper {
        width: 200px;
        height: 200px;
        border-radius: 100%;
        background: #071d21;
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1000px; /* For 3D flip effect */

        svg {
          transform-style: preserve-3d;
        }
      }
    }

    &__right {
      padding: 0 0 0 3px;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      border-radius: 30px;
      background: #fff;
      padding: 20px 25px;
      h3 {
        color: #071d21;
        font-family: "Bricolage Grotesque";
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 38px;
        text-transform: capitalize;
        width: 70%;
      }
      h6 {
        color: #808080;
        font-family: Geist;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 29px;
      }
    }
  }
  @media (max-width: 767px) {
    margin-top: 78px;
    transition: 1.5s margin-top ease;
    body.menu-open & {
      margin-top: 0 !important;
      transition: 1.5s margin-top ease;
    }
    padding: 0 15px;
    .col-lg-9 {
      padding-right: 15px;
    }
    .about-top {
      &__left {
        padding: 0;
      }
      &__inner {
        gap: 40px;
        padding: 15px 15px 14px 15px;
        border-radius: 20px;
        h3 {
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: 34px;
          width: 100%;
        }
        h6 {
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: 26px;
        }
      }
      &__svg {
        padding: 40px 0;
        margin-bottom: 3px;
        border-radius: 20px;
        &__wrapper {
          width: 140px;
          height: 140px;
        }
      }

      &__right {
        padding: 0;
      }
    }
  }
  @media (min-width: 767px) and (max-width: 991px) {
    .about-top {
      &__inner {
        gap: 40px;
      }
    }
  }
`;

export default AboutTop;
