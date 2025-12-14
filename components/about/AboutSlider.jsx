"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Transition, hover } from "../../styles/globalStyleVars";
import { gsap } from "gsap";

const demoTestimonials = [
  {
    name: "Anika Roy",
    deg: "Head of Marketing, Vegmove",
    heading: "TechSfera Transformed Our Digital Presence",
    feedback:
      "Collaborating with TechSfera was a seamless experience. Their team not only delivered a visually stunning app but also ensured it was highly functional and user-friendly. Their creativity and attention to detail exceeded our expectations.",
    image: "/images/dynamic/about/slider/review-1.png",
    type: "image",
    bg_left: "#F6F6F6",
    bg_right: "#FFE8D3",
  },
  {
    name: "Rafi Ahmed",
    deg: "CEO, FinTech Solutions",
    heading: "Innovative Solutions and Exceptional Service",
    feedback:
      "TechSfera's expertise in software development is unparalleled. They took the time to understand our unique needs and delivered a solution that perfectly aligned with our business goals. Their commitment to quality and customer satisfaction is truly commendable.",
    image: "/images/dynamic/home/demo-video.mp4",
    type: "video",
    thumb: "/images/dynamic/home/thumbnail.png",
    bg_left: "#F6F6F6",
    bg_right: "#FFE8D3",
  },
  {
    name: "Maya Sen",
    deg: "Product Manager, HealthPlus",
    heading: "A Reliable Partner for Our Tech Needs",
    feedback:
      "From start to finish, TechSfera demonstrated professionalism and technical prowess. Their team was responsive, collaborative, and proactive in addressing challenges. The end product not only met but exceeded our expectations, driving significant value for our users.",
    image: "/images/dynamic/about/slider/review-1.png",
    type: "image",
    bg_left: "#F6F6F6",
    bg_right: "#FFE8D3",
  },
];

const AboutSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRefs = useRef([]);
  const leftWrapperRefs = useRef([]);

  // Video player states
  const [videoPlayed, setVideoPlayed] = useState(
    Array(demoTestimonials.length).fill(false)
  );
  const [playActive, setPlayActive] = useState(
    Array(demoTestimonials.length).fill(false)
  );
  const [hoverIndex, setHoverIndex] = useState(null);

  // Refs for video controls
  const playRefs = useRef([]);
  const pauseRefs = useRef([]);
  const videoRefs = useRef([]);
  const hideTimeoutRefs = useRef([]);
  const playContainerRefs = useRef([]);

  // Set all .review__left__wrapper to the tallest height
  useEffect(() => {
    function setUniformHeight() {
      const wrappers = leftWrapperRefs.current;
      if (!wrappers || wrappers.length === 0) return;
      // Reset heights
      wrappers.forEach((w) => {
        if (w) w.style.height = "auto";
      });
      // Find max height
      const maxHeight = Math.max(
        ...wrappers.map((w) => (w ? w.offsetHeight : 0))
      );
      // Set all to max height
      wrappers.forEach((w) => {
        if (w) w.style.height = maxHeight + "px";
      });
    }
    setUniformHeight();
    window.addEventListener("resize", setUniformHeight);
    return () => window.removeEventListener("resize", setUniformHeight);
  }, [demoTestimonials.length]);

  // Set slider-container height to current slide-wrapper height on mobile
  const sliderContainerRef = useRef();
  useEffect(() => {
    function setSliderContainerHeight() {
      if (typeof window === "undefined") return;

      const currentSlide = slideRefs.current[currentIndex];
      if (currentSlide && sliderContainerRef.current) {
        // Only update if the slide is currently visible
        if (currentSlide.style.display !== "none") {
          const newHeight = currentSlide.offsetHeight + "px";
          // Only update if height is different to prevent unnecessary reflows
          if (sliderContainerRef.current.style.height !== newHeight) {
            sliderContainerRef.current.style.height = newHeight;
          }
        }
      }
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setSliderContainerHeight();
    });

    const resizeHandler = () => {
      requestAnimationFrame(setSliderContainerHeight);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [currentIndex]);

  // Initialize video refs arrays
  useEffect(() => {
    playRefs.current = playRefs.current.slice(0, demoTestimonials.length);
    pauseRefs.current = pauseRefs.current.slice(0, demoTestimonials.length);
    videoRefs.current = videoRefs.current.slice(0, demoTestimonials.length);
    hideTimeoutRefs.current = hideTimeoutRefs.current.slice(
      0,
      demoTestimonials.length
    );
    playContainerRefs.current = playContainerRefs.current.slice(
      0,
      demoTestimonials.length
    );
  }, [demoTestimonials.length]);

  const handlePlayClick = (idx) => {
    setPlayActive((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });

    setVideoPlayed((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });

    setTimeout(() => {
      const video = videoRefs.current[idx];
      if (video) {
        video.play().catch(console.error);
      }
    }, 100);

    const playElement = playRefs.current[idx];
    const pauseElement = pauseRefs.current[idx];

    if (playElement && pauseElement) {
      gsap.to(playElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.to(pauseElement, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
        delay: 0.1,
      });
    }

    startAutoHideTimer(idx);
  };

  const handlePauseClick = (idx) => {
    const video = videoRefs.current[idx];
    if (video) {
      video.pause();
    }

    setPlayActive((prev) => {
      const updated = [...prev];
      updated[idx] = false;
      return updated;
    });

    const playElement = playRefs.current[idx];
    const pauseElement = pauseRefs.current[idx];

    if (playElement && pauseElement) {
      gsap.to(pauseElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.to(playElement, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
        delay: 0.1,
      });
    }

    clearAutoHideTimer(idx);
  };

  const startAutoHideTimer = (idx) => {
    clearAutoHideTimer(idx);

    hideTimeoutRefs.current[idx] = setTimeout(() => {
      const playContainer = playContainerRefs.current[idx];

      if (playContainer) {
        gsap.to(playContainer, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    }, 2000);
  };

  const clearAutoHideTimer = (idx) => {
    if (hideTimeoutRefs.current[idx]) {
      clearTimeout(hideTimeoutRefs.current[idx]);
      hideTimeoutRefs.current[idx] = null;
    }
  };

  const showControls = (idx) => {
    clearAutoHideTimer(idx);

    const playContainer = playContainerRefs.current[idx];

    if (playContainer) {
      gsap.to(playContainer, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    if (playActive[idx]) {
      startAutoHideTimer(idx);
    }
  };

  const nextSlide = () => {
    if (isAnimating) return;
    if (currentIndex === demoTestimonials.length - 1) return; // Prevent next if at last
    setIsAnimating(true);
    const nextIndex = currentIndex + 1;

    // Prevent page scroll during transition
    const scrollY = window.scrollY;

    const currentSlide = slideRefs.current[currentIndex];
    const nextSlideElement = slideRefs.current[nextIndex];

    // Pre-calculate heights before showing
    if (nextSlideElement && sliderContainerRef.current) {
      nextSlideElement.style.display = "block";
      const nextHeight = nextSlideElement.offsetHeight;
      sliderContainerRef.current.style.height = nextHeight + "px";
      nextSlideElement.style.display = "none";
    }

    // Show next slide
    nextSlideElement.style.display = "block";
    currentSlide.style.display = "none";

    setCurrentIndex(nextIndex);

    // Restore scroll position to prevent jump
    window.scrollTo(0, scrollY);

    setIsAnimating(false);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    if (currentIndex === 0) return; // Prevent prev if at first
    setIsAnimating(true);
    const prevIndex = currentIndex - 1;

    // Prevent page scroll during transition
    const scrollY = window.scrollY;

    const currentSlide = slideRefs.current[currentIndex];
    const prevSlideElement = slideRefs.current[prevIndex];

    // Pre-calculate heights before showing
    if (prevSlideElement && sliderContainerRef.current) {
      prevSlideElement.style.display = "block";
      const prevHeight = prevSlideElement.offsetHeight;
      sliderContainerRef.current.style.height = prevHeight + "px";
      prevSlideElement.style.display = "none";
    }

    // Show previous slide
    prevSlideElement.style.display = "block";
    currentSlide.style.display = "none";

    setCurrentIndex(prevIndex);

    // Restore scroll position to prevent jump
    window.scrollTo(0, scrollY);

    setIsAnimating(false);
  };

  return (
    <StyledComponent className={"review"}>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <Row>
              <Col md={12}>
                <div className="nav-wrapper">
                  <h4 className={"split-up-delay"}>
                    Real Feedback, Real Impact
                  </h4>
                  <div className={"nav"}>
                    <div
                      className={`prev${currentIndex === 0 ? " disabled" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevSlide();
                      }}
                      style={{
                        cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="14"
                        viewBox="0 0 22 14"
                        fill="none"
                      >
                        <path
                          d="M1.66602 6.99976L20.3327 6.99976"
                          stroke="white"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.4993 12.8334C7.4993 12.8334 1.66603 8.53723 1.66602 7.00004C1.666 5.46284 7.49935 1.16675 7.49935 1.16675"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div
                      className={`next${currentIndex === demoTestimonials.length - 1 ? " disabled" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        nextSlide();
                      }}
                      style={{
                        cursor:
                          currentIndex === demoTestimonials.length - 1
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="14"
                        viewBox="0 0 22 14"
                        fill="none"
                      >
                        <path
                          d="M20.334 7.00024L1.6673 7.00024"
                          stroke="white"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.5007 1.16659C14.5007 1.16659 20.334 5.46277 20.334 6.99996C20.334 8.53716 14.5007 12.8333 14.5007 12.8333"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="slider-container" ref={sliderContainerRef}>
              {demoTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  ref={(el) => (slideRefs.current[index] = el)}
                  className="slide-wrapper"
                  style={{
                    display: index === 0 ? "block" : "none",
                  }}
                >
                  <Row>
                    <Col lg={8} className={"review__left"}>
                      <div
                        className={"review__left__wrapper"}
                        style={{ background: `${testimonial.bg_left}` }}
                        ref={(el) => (leftWrapperRefs.current[index] = el)}
                      >
                        <div>
                          <h3>{testimonial.name}</h3>
                          <p>{testimonial.deg}</p>
                        </div>
                        <div>
                          <h6>{testimonial.heading}</h6>
                          <p>{testimonial.feedback}</p>
                        </div>
                      </div>
                      <div className={"review__left__qoutation"}>
                        <img
                          src={"/images/dynamic/about/slider/quotation.svg"}
                          alt={"icon"}
                        />
                      </div>
                    </Col>
                    <Col lg={4} className={"review__right"}>
                      <div
                        className={`review__right__wrapper ${testimonial.type === "video" ? "video" : ""}`}
                        style={{ background: `${testimonial.bg_right}` }}
                        onMouseMove={() =>
                          testimonial.type === "video"
                            ? showControls(index)
                            : null
                        }
                      >
                        {testimonial.type === "video" ? (
                          <>
                            {!videoPlayed[index] ? (
                              <img
                                src={testimonial.thumb}
                                alt="video thumbnail"
                              />
                            ) : (
                              <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                loop
                                muted
                                playsInline
                              >
                                <source
                                  src={testimonial.image}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            )}

                            <div
                              ref={(el) =>
                                (playContainerRefs.current[index] = el)
                              }
                              className={`play-svg ${playActive[index] ? "active" : ""}`}
                              style={{ cursor: "pointer", zIndex: 2 }}
                              onClick={() => {
                                if (!playActive[index]) {
                                  handlePlayClick(index);
                                } else {
                                  handlePauseClick(index);
                                }
                              }}
                            >
                              <div
                                className="play-svg-icon"
                                ref={(el) => (playRefs.current[index] = el)}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  zIndex: 100,
                                  pointerEvents: "none",
                                }}
                              >
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 25 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.3177 6.33706C15.9507 7.26475 17.2339 7.99375 18.1481 8.66154C19.0685 9.33392 19.7493 10.0367 19.9931 10.9632C20.1719 11.6427 20.1719 12.3574 19.9931 13.0369C19.7493 13.9634 19.0685 14.6662 18.1481 15.3386C17.2339 16.0064 15.9507 16.7354 14.3178 17.663L14.3178 17.663C12.7404 18.5592 11.4102 19.3149 10.4004 19.7444C9.38249 20.1774 8.45449 20.3968 7.55255 20.1412C6.88972 19.9534 6.28661 19.5969 5.80076 19.1067C5.14139 18.4414 4.87671 17.522 4.75148 16.4154C4.62718 15.317 4.62719 13.879 4.6272 12.0502V12.0502V11.95V11.95C4.62719 10.1211 4.62718 8.68315 4.75148 7.5847C4.87671 6.47816 5.14139 5.55867 5.80076 4.89341C6.28661 4.40323 6.88972 4.04672 7.55255 3.8589C8.45449 3.60331 9.38249 3.82275 10.4004 4.25571C11.4102 4.68522 12.7404 5.4409 14.3177 6.33706Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                              <div
                                className="pause-svg-icon"
                                ref={(el) => (pauseRefs.current[index] = el)}
                                style={{
                                  opacity: 0,
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  zIndex: 100,
                                  pointerEvents: "none",
                                }}
                              >
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M29.3834 17.2525L29.4271 17.2525L29.4709 17.2525C30.0595 17.2525 30.5667 17.2524 30.9729 17.3071C31.4082 17.3655 31.8254 17.4975 32.1639 17.836C32.5023 18.1745 32.6343 18.5917 32.6928 19.027C32.7474 19.4332 32.7474 19.9404 32.7474 20.5291V29.4708C32.7474 30.0595 32.7474 30.5667 32.6928 30.9729C32.6343 31.4082 32.5023 31.8254 32.1639 32.1639C31.8254 32.5024 31.4082 32.6344 30.9729 32.6928C30.5667 32.7475 30.0595 32.7474 29.4709 32.7474H29.3834C28.7947 32.7474 28.2874 32.7475 27.8812 32.6928C27.446 32.6344 27.0288 32.5024 26.6903 32.1639C26.3518 31.8254 26.2198 31.4082 26.1614 30.9729C26.1067 30.5667 26.1068 30.0595 26.1068 29.4708V20.5291C26.1068 19.9404 26.1067 19.4332 26.1614 19.027C26.2198 18.5917 26.3518 18.1745 26.6903 17.836C27.0288 17.4975 27.446 17.3655 27.8812 17.3071C28.2874 17.2524 28.7947 17.2525 29.3834 17.2525Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M20.5293 17.2525L20.5731 17.2525L20.6168 17.2525C21.2055 17.2525 21.7127 17.2524 22.1189 17.3071C22.5541 17.3655 22.9713 17.4975 23.3098 17.836C23.6483 18.1745 23.7803 18.5917 23.8387 19.027C23.8934 19.4332 23.8934 19.9404 23.8933 20.5291V29.4708C23.8934 30.0595 23.8934 30.5667 23.8387 30.9729C23.7803 31.4082 23.6483 31.8254 23.3098 32.1639C22.9713 32.5024 22.5541 32.6344 22.1189 32.6928C21.7127 32.7475 21.2055 32.7474 20.6168 32.7474H20.5293C19.9406 32.7474 19.4334 32.7475 19.0272 32.6928C18.5919 32.6344 18.1747 32.5024 17.8362 32.1639C17.4977 31.8254 17.3657 31.4082 17.3073 30.9729C17.2527 30.5667 17.2527 30.0595 17.2527 29.4708V20.5291C17.2527 19.9404 17.2527 19.4332 17.3073 19.027C17.3657 18.5917 17.4977 18.1745 17.8362 17.836C18.1747 17.4975 18.5919 17.3655 19.0272 17.3071C19.4334 17.2524 19.9406 17.2525 20.5293 17.2525Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <img src={testimonial.image} alt="image" />
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
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

  .col-md-12 {
    padding: 3px 0 3px 3px;
  }

  .nav-wrapper {
    border-radius: 100px;
    background: #fff;
    padding: 8px 8px 8px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      color: #071d21;
      font-weight: 700;
    }

    .nav {
      gap: 3px;

      .prev,
      .next {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 18px 20px;
        border-radius: 100px;
        background: #071d21;
        transition: background 0.3s ${Transition};
        height: 50px;
        width: 70px;

        svg {
          path {
            transition: stroke 0.3s ${Transition};
          }
        }
      }

      .prev.disabled,
      .next.disabled {
        background: #f5f5f5;
        transition: background 0.3s ${Transition};

        svg {
          path {
            stroke: #071d21 !important;
            transition: stroke 0.3s ${Transition};
          }
        }
      }
    }
  }

  .slider-container {
    position: relative;
    transition: height 0.3s ${Transition};
  }

  .slide-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 1;
    transition: opacity 0.3s ${Transition};
  }

  .review__left {
    overflow: hidden;
    padding: 0 3px;
    position: relative;

    &__wrapper {
      height: 100%;
      width: 100%;
      border-radius: 30px;
      padding: 80px 45px 25px 25px;
      display: flex;
      flex-direction: column;
      gap: 25px;
      min-height: 100%;
      justify-content: flex-end;
      p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &__qoutation {
      img {
        position: absolute;
        top: 3px;
        right: 6px;
        z-index: 1;
      }
    }

    h3 {
      color: #071d21;
      font-weight: 700;
      margin-bottom: 5px;
    }

    h6 {
      font-weight: 600;
      line-height: 36px;
    }
  }

  .review__right {
    border-radius: 30px;
    padding: 0;
    overflow: hidden;

    &__wrapper {
      height: 100%;
      width: 100%;
      border-radius: 30px;
      display: flex;
      align-items: self-end;
      justify-content: center;
      position: relative;
      padding-top: calc(290 / 420 * 100%);

      img {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }

      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 30px;
      }

      &.video {
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(7, 29, 33, 0.2);
          border-radius: 30px;
        }
      }

      .play-svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
        height: 70px;
        width: 70px;
        background: #071d21;
        overflow: hidden;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ${Transition} transform;

        &.active {
          transform: translate(-50%, -50%) scale(0);
          transition: 0.5s ${Transition} transform;
        }

        .play-svg-icon,
        .pause-svg-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          z-index: 100;

          svg {
            position: relative;
            z-index: 100;
            transform: scale(0.7);
            transition: 0.5s ${Transition} transform;
          }
        }

        &:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${hover};
          border-radius: 100px;
          transition: 0.5s ${Transition} top;
        }

        &:hover {
          .play-svg-icon svg,
          .pause-svg-icon svg {
            transform: scale(0.6);
            transition: 0.5s ${Transition} transform;
          }

          &:after {
            top: 0;
            transition: 0.5s ${Transition} top;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .col-lg-9 {
      padding-right: 30px;
      padding-left: 30px;
    }

    .col-md-12 {
      padding: 3px 0 0 0;
    }

    .nav-wrapper {
      padding: 8px 8px 8px 15px;
      gap: 20px;
      h4 {
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
      }
      .nav {
        flex-wrap: unset;
      }
    }

    .slide-wrapper {
      .row {
        flex-direction: column-reverse;
      }
    }

    .review {
      &__right {
        padding: 0;
        border-radius: 20px;
        &__wrapper {
          padding-top: calc(180 / 428 * 100%);

          video {
            border-radius: 20px;
          }
          img {
            height: 100%;
          }

          &.video:after {
            border-radius: 20px;
          }

          .play-svg {
            height: 50px;
            width: 50px;

            .play-svg-icon svg,
            .pause-svg-icon svg {
              transform: scale(0.5);
            }

            &:hover {
              .play-svg-icon svg,
              .pause-svg-icon svg {
                transform: scale(0.4);
              }
            }
          }
        }
      }

      &__left {
        padding: 0;
        &__wrapper {
          border-radius: 20px;
          padding: 40px 15px 18px 15px;
          gap: 10px;
          justify-content: space-between;
          h6 {
            line-height: unset;
          }
        }
        &__qoutation {
          img {
            width: 100px;
            height: 70px;
            right: 3px;
          }
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .slide-wrapper {
      .row {
        flex-direction: column-reverse;
      }
    }
  }
`;

export default AboutSlider;
