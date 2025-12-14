"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

// Register the DrawSVG plugin
gsap.registerPlugin(DrawSVGPlugin);

const MyComponent = () => {
  const svgRef = useRef(null);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);

  // Partner images array
  const partnerImages = [
    { full_path: "/images/dynamic/partners/1.svg", alt: "Partner 1" },
    { full_path: "/images/dynamic/partners/2.svg", alt: "Partner 2" },
    { full_path: "/images/dynamic/partners/3.svg", alt: "Partner 3" },
    { full_path: "/images/dynamic/partners/4.svg", alt: "Partner 4" },
    { full_path: "/images/dynamic/partners/1.svg", alt: "Partner 5" },
    { full_path: "/images/dynamic/partners/2.svg", alt: "Partner 6" },
    { full_path: "/images/dynamic/partners/3.svg", alt: "Partner 7" },
    { full_path: "/images/dynamic/partners/4.svg", alt: "Partner 8" },
  ];

  const emblaOptions = { loop: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [
    AutoScroll({ playOnInit: true, speed: 0.7 }), // Auto-scroll starts automatically
  ]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    emblaApi.on("reInit", () => {
      autoScroll.play(); // Ensure autoplay resumes after reinitialization
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!path1Ref.current || !path2Ref.current) return;

    // Create timeline for continuous animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    // Initial state - paths are invisible and no fill
    gsap.set([path1Ref.current, path2Ref.current], {
      drawSVG: "0%",
      fill: "none",
    });

    // Animate drawing the paths
    tl.to([path1Ref.current, path2Ref.current], {
      drawSVG: "100%",
      duration: 2,
      ease: "power2.inOut",
      stagger: 0.2,
    })
      // Add fill color after drawing is complete
      .to([path1Ref.current, path2Ref.current], {
        fill: "#071D21",
        duration: 0.5,
        ease: "power2.inOut",
      })
      // Hold the filled state briefly
      .to({}, { duration: 0.8 })
      // Remove fill before erasing
      .to([path1Ref.current, path2Ref.current], {
        fill: "none",
        duration: 0.3,
        ease: "power2.inOut",
      })
      // Reverse the drawing (erase)
      .to([path1Ref.current, path2Ref.current], {
        drawSVG: "0%",
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.1,
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <StyledComponent className={"partners"}>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <Row>
              <Col lg={4} md={12}>
                <div className="title-wrapper">
                  <svg
                    ref={svgRef}
                    width="43"
                    height="44"
                    viewBox="0 0 43 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      ref={path1Ref}
                      d="M31.01 12.2244C30.3336 11.5225 29.2529 11.5225 28.5765 12.2244L19.0975 22.0596C18.8756 22.2899 18.5344 22.3631 18.236 22.2446C17.9377 22.1261 17.7423 21.8397 17.7428 21.5215L17.7489 17.5101C17.7509 16.1765 16.6502 15.2185 15.4733 15.3561C14.5623 15.4626 13.7943 16.2045 13.6545 17.2093L12.4476 25.8818C12.1691 27.8828 12.0492 28.7731 12.1086 29.6181C12.2015 30.9364 12.6085 32.2067 13.2906 33.3147C13.7268 34.0234 14.3312 34.6566 15.7074 36.0845C17.0038 37.4296 17.9508 38.4117 18.7505 39.1418C19.5459 39.8679 20.1548 40.3058 20.7605 40.5849C22.7233 41.4891 24.9646 41.4858 26.9318 40.5744C27.5392 40.2931 28.1501 39.8526 28.9479 39.1236C29.75 38.3908 30.7395 37.3674 32.0399 36.018L37.5948 30.2544L39.3423 28.4412C40.0387 27.7187 40.0387 26.5326 39.3423 25.8101C38.6658 25.1082 37.5851 25.1082 36.9087 25.8101L33.9329 28.8977C33.6333 29.2086 33.1358 29.2202 32.8217 28.9236C32.5076 28.627 32.4959 28.1346 32.7955 27.8237L38.152 22.2659C38.8484 21.5434 38.8484 20.3573 38.152 19.6348C37.4755 18.9329 36.3948 18.9329 35.7184 19.6348L30.3619 25.1925C30.0623 25.5034 29.5648 25.515 29.2507 25.2184C28.9366 24.9219 28.9249 24.4294 29.2245 24.1185L34.581 18.5608L36.9616 16.0907C37.658 15.3681 37.658 14.182 36.9616 13.4595C36.2852 12.7576 35.2045 12.7576 34.5281 13.4595L32.1485 15.9285L26.791 21.4873C26.4913 21.7982 25.9938 21.8098 25.6798 21.5133C25.3657 21.2167 25.354 20.7242 25.6536 20.4134L31.01 14.8556L31.0116 14.8539C31.7064 14.1312 31.7059 12.9464 31.01 12.2244Z"
                      fill="none"
                      stroke="#071D21"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      ref={path2Ref}
                      d="M21.014 5.68179C20.6922 5.34207 20.202 5.34207 19.8802 5.68179L11.6915 14.3251C11.3129 14.7248 10.7289 14.853 10.2177 14.6489C9.70649 14.4447 9.37148 13.9494 9.3723 13.399L9.37754 9.87375C9.37876 9.05221 8.732 8.56853 8.15552 8.63708C7.69427 8.69193 7.24753 9.0884 7.16397 9.69921L6.12137 17.3207C5.87705 19.1066 5.78743 19.8106 5.83307 20.4701C5.90617 21.5265 6.22669 22.5415 6.76074 23.4241C7.09228 23.9721 7.5544 24.4703 8.7629 25.7459L8.76295 25.7459C8.99788 25.9939 9.21934 26.2277 9.42975 26.4489C9.94117 26.9867 9.9198 27.8372 9.38202 28.3487C8.84424 28.8601 7.99369 28.8387 7.48227 28.3009C7.26993 28.0776 6.93917 27.7285 6.70479 27.4811L6.70476 27.4811C5.63862 26.3561 4.96089 25.6409 4.46138 24.8154C3.70232 23.5609 3.25411 22.1314 3.15198 20.6557C3.0849 19.6863 3.22091 18.6929 3.43777 17.1091L4.50127 9.33496C4.73811 7.60361 6.07177 6.17844 7.83817 5.96839C10.173 5.69073 12.0684 7.60791 12.065 9.87774L12.0648 10.0235L17.9292 3.83346C19.3111 2.37485 21.5832 2.37485 22.965 3.83346C23.1714 4.05128 23.346 4.28924 23.489 4.54113C24.878 3.47352 26.8564 3.59943 28.1064 4.91884C29.4493 6.33629 29.4493 8.6059 28.1065 10.0233C27.596 10.5621 26.7455 10.5851 26.2068 10.0747C25.668 9.56426 25.6451 8.71376 26.1555 8.17501C26.5163 7.79413 26.5163 7.14806 26.1555 6.76718C25.8336 6.42746 25.3434 6.42746 25.0216 6.76718L19.8075 12.2708C19.2971 12.8096 18.4466 12.8326 17.9078 12.3222C17.3691 11.8117 17.3461 10.9612 17.8565 10.4225L21.014 7.08962C21.3749 6.70874 21.3749 6.06268 21.014 5.68179Z"
                      fill="none"
                      stroke="#071D21"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <h3>Partners Who Believe in Us</h3>
                </div>
              </Col>
              <Col lg={8} md={12}>
                <div className="icons-wrapper">
                  <div className="embla-partners">
                    <div className="embla-partners__viewport" ref={emblaRef}>
                      <div className="embla-partners__container">
                        {partnerImages?.map((image, index) => (
                          <div className="embla-partners__slide" key={index}>
                            <div className="embla-partners__slide-image">
                              <img src={image?.full_path} alt={image?.alt} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
    overflow: hidden;

    .col-lg-9 {
        padding-right: 30px;
    }

    .col-lg-4,
    .col-lg-8 {
        padding: 3px 0 0 3px;
    }

    .title-wrapper {
        border-radius: 25px;
        background: #c9fd8c;
        padding: 25px;
        display: flex;
        gap: 10px;
        align-items: center;
        height: 100%;
        svg {
            min-width: 36.73px;
            min-height: 38.521px;
        }

        h3 {
            color: #071d21;
            font-family: "Bricolage Grotesque";
            font-size: 30px;
            font-style: normal;
            font-weight: 700;
            line-height: 34px;
            text-transform: capitalize;
        }
    }

    .icons-wrapper {
        border-radius: 25px;
        background: #f8fff0;
        padding: 22px 25px;
        overflow: hidden;
        min-height: 100%;
    }

    .embla-partners {
        overflow: hidden;
    }

    .embla-partners__viewport {
        overflow: hidden;
    }

    .embla-partners__container {
        display: flex;
        // gap: 60px;
        align-items: center;
    }

    .embla-partners__slide {
        flex: 0 0 auto;
    }

    .embla-partners__slide-image {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            padding: 0 30px;
            height: auto;
            object-fit: contain;
        }
    }

    @media (max-width: 767px) {
        .col-lg-4,
        .col-lg-8 {
            padding: 3px 0 0 15px;
        }

        .col-lg-9 {
            padding-right: 30px;
        }

        .title-wrapper {
            padding: 20px 15px;
            border-radius: 20px;
        }

        .icons-wrapper {
            border-radius: 20px;
            padding: 15px;
        }
    }
    @media (min-width: 768px) and (max-width: 991px) {
        .col-lg-9 {
            padding-right: 30px;
        }
    }
`;

export default MyComponent;
