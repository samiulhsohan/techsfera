"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { hover, Transition } from "../../styles/globalStyleVars";
import { ImgParallax } from "../ImgParallax";

const Banner = () => {
  // Array of media items (images and videos)
  const mediaItems = [
    {
      src: "/images/dynamic/home/video-ethernest.mp4",
      thumb: "/images/dynamic/home/banner-ethernest.png",
      icon: "/images/dynamic/home/icon-ethernest.svg",
      type: "video",
      background: "#F5F5F5",
      hover_background: "#FFE8D3",
    },
    {
      src: "/images/dynamic/home/banner-taskflow.png",
      icon: "/images/dynamic/home/icon-taskflow.svg",
      background: "#F5F5F5",
      hover_background: "#E9E9FF",
      type: "image",
    },
    {
      src: "/images/dynamic/home/icon-lumora.png",
      icon: "/images/dynamic/home/icon-lumora.svg",
      background: "#F5F5F5",
      hover_background: "#DBE7FF",
      type: "image",
    },
    {
      src: "/images/dynamic/home/ethernest.png",
      icon: "/images/dynamic/home/ethernest.svg",
      background: "#F5F5F5",
      hover_background: "#FFF4D6",
      type: "image",
    },
    {
      src: "/images/dynamic/home/video-mindspace.mp4",
      thumb: "/images/dynamic/home/banner-mindspace.png",
      type: "video",
      icon: "/images/dynamic/home/icon-mindspace.svg",
    },
    // {
    //   src: "/images/dynamic/home/banner-vegmove.png",
    //   icon: "/images/dynamic/home/icon-vegmove.svg",
    //   background: "#F5F5F5",
    //   hover_background: "#E3FFF1",
    //   type: "image",
    // },
    // {
    //   src: "/images/dynamic/home/banner-booking.png",
    //   icon: "/images/dynamic/home/icon-booking.svg",
    //   background: "#F5F5F5",
    //   hover_background: "#E9E9FF",
    //   type: "image",
    // },
    {
      src: "/images/dynamic/home/banner-machine-dashboard.png",
      icon: "/images/dynamic/home/icon-machine-dashboard.svg",
      background: "#F5F5F5",
      hover_background: "#FFE8D3",
      type: "image",
    },
    {
      src: "/images/dynamic/home/banner-rogo.png",
      icon: "/images/dynamic/home/icon-rogo.svg",
      background: "#F5F5F5",
      hover_background: "#DBE7FF",
      type: "image",
    },
    {
      src: "/images/dynamic/home/banner-techsfera.png",
      icon: "/images/dynamic/home/icon-techsfera.svg",
      background: "#F5F5F5",
      hover_background: "#F4FFE8",
      type: "image",
    },
  ];

  // Track play state for each video
  const [videoPlayed, setVideoPlayed] = useState(
    Array(mediaItems.length).fill(false)
  );
  // Track play-button active state per item (so it can keep 'active' class after play)
  const [playActive, setPlayActive] = useState(
    Array(mediaItems.length).fill(false)
  );
  // Track which item is hovered (index) to apply per-item hover background
  const [hoverIndex, setHoverIndex] = useState(null);

  // Refs for SVG elements
  const playRefs = useRef([]);
  const pauseRefs = useRef([]);
  const videoRefs = useRef([]);
  const hideTimeoutRefs = useRef([]);
  const playContainerRefs = useRef([]);

  // Initialize refs arrays
  useEffect(() => {
    playRefs.current = playRefs.current.slice(0, mediaItems.length);
    pauseRefs.current = pauseRefs.current.slice(0, mediaItems.length);
    videoRefs.current = videoRefs.current.slice(0, mediaItems.length);
    hideTimeoutRefs.current = hideTimeoutRefs.current.slice(
      0,
      mediaItems.length
    );
    playContainerRefs.current = playContainerRefs.current.slice(
      0,
      mediaItems.length
    );
  }, [mediaItems.length]);

  const handlePlayClick = (idx) => {
    // Mark button active and start playback
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

    // Start playing the video
    setTimeout(() => {
      const video = videoRefs.current[idx];
      if (video) {
        video.play().catch(console.error);
      }
    }, 100);

    // Animate play to pause transition
    const playElement = playRefs.current[idx];
    const pauseElement = pauseRefs.current[idx];

    if (playElement && pauseElement) {
      // Smooth transition from play to pause
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

  };

  const handlePauseClick = (idx) => {
    // Pause the video
    const video = videoRefs.current[idx];
    if (video) {
      video.pause();
    }

    // Mark button inactive but keep video displayed
    setPlayActive((prev) => {
      const updated = [...prev];
      updated[idx] = false;
      return updated;
    });

    // Animate pause to play transition
    const playElement = playRefs.current[idx];
    const pauseElement = pauseRefs.current[idx];

    if (playElement && pauseElement) {
      // Smooth transition from pause to play
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
  };

  const startAutoHideTimer = (idx) => {
    // Clear existing timer
    clearAutoHideTimer(idx);

    // Set new timer to hide controls after 2 seconds
    hideTimeoutRefs.current[idx] = setTimeout(() => {
      const playContainer = playContainerRefs.current[idx];

      if (playContainer) {
        gsap.set(playContainer, {
          opacity: 0,
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
    // Clear auto-hide timer
    clearAutoHideTimer(idx);

    // Show the play container
    const playContainer = playContainerRefs.current[idx];

    if (playContainer) {
      gsap.set(playContainer, {
        opacity: 1,
      });
    }

    // Start auto-hide timer again if video is playing
    if (playActive[idx]) {
      startAutoHideTimer(idx);
    }
  };

  return (
    <StyledComponent>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <div className={"main-wrapper"}>
              {mediaItems.map((item, idx) => {
                // compute current background depending on hover state
                const baseBg = item.background || "#fff";
                const hoverBg = item.hover_background || baseBg;
                const currentBg = hoverIndex === idx ? hoverBg : baseBg;

                if (item.type === "video") {
                  return (
                    <div
                      className="image-wrapper video"
                      key={idx}
                      style={{
                        background: currentBg,
                        transition: "background 0.5s",
                      }}
                      onMouseEnter={() => setHoverIndex(idx)}
                      onMouseLeave={() => setHoverIndex(null)}
                      onFocus={() => setHoverIndex(idx)}
                      onBlur={() => setHoverIndex(null)}
                    >
                      {/* always render play button so it can keep visible; toggle video vs thumb separately */}
                      {!videoPlayed[idx] ? (
                        <ImgParallax src={item.thumb} />
                      ) : (
                        <video
                          ref={(el) => (videoRefs.current[idx] = el)}
                          loop
                          muted
                          playsInline
                        >
                          <source src={item.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}

                      <div
                        ref={(el) => (playContainerRefs.current[idx] = el)}
                        className={`play-svg ${playActive[idx] ? "active" : ""
                          }`}
                        style={{ cursor: "pointer", zIndex: 2 }}
                        onClick={() => {
                          if (!playActive[idx]) {
                            handlePlayClick(idx);
                          } else {
                            handlePauseClick(idx);
                          }
                        }}
                      >
                        <div
                          className="play-svg-icon"
                          ref={(el) => (playRefs.current[idx] = el)}
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
                          ref={(el) => (pauseRefs.current[idx] = el)}
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

                      <div className="icon">
                        <img src={item.icon} alt="icon" />
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="wrapper">
                    <div
                      className="image-wrapper"
                      key={idx}
                      style={{
                        background: currentBg,
                        transition: "background 0.5s",
                      }}
                      onMouseEnter={() => setHoverIndex(idx)}
                      onMouseLeave={() => setHoverIndex(null)}
                      onFocus={() => setHoverIndex(idx)}
                      onBlur={() => setHoverIndex(null)}
                    >
                      <ImgParallax src={item.src} />
                    </div>
                    <div className="icon">
                      <img src={item.icon} alt="icon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  overflow: hidden;
  border-radius: 30px;

  .col-md-8 {
    padding: 0 15px 0 3px;
  }

  .main-wrapper {
    border-radius: 30px;
    overflow: hidden;

    .wrapper {
      position: relative;

      .icon {
        position: absolute;
        right: 25px;
        bottom: 25px;
        z-index: 10;

        img {
          padding: 0;
        }
      }
      &:last-child {
      .image-wrapper{
        margin-bottom: 0;
      }

      }
    }

    .image-wrapper {
      position: relative;
      padding-top: calc(673 / 850 * 100%);
      border-radius: 30px;
      overflow: hidden;
      margin-bottom: 3px;

      .icon {
        position: absolute;
        right: 25px;
        bottom: 25px;
        z-index: 10;

        img {
          padding: 0;
        }
      }

      img {
        padding: 12vw;
      }

      .play-svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
        height: 120px;
        width: 120px;
        background: #071d21;
        overflow: hidden;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        transition: 0.5s ${Transition} transform, 0.3s ${Transition} opacity;

        &.active {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
          transition: 0.5s ${Transition} transform, 0.3s ${Transition} opacity;

          &:hover {
            opacity: 1;
          }
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
            transform: scale(1);
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
            transform: scale(0.9);
            transition: 0.5s ${Transition} transform;
          }

          &:after {
            top: 0;
            transition: 0.5s ${Transition} top;
          }
        }
      }

      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  @media (max-width: 767px) {
    border-radius: 20px;
    .main-wrapper {
      border-radius: 20px;

      .icon {
        display: none;
      }

      .image-wrapper {
        border-radius: 20px;
        padding-top: calc(320 / 428 * 100%);

        .play-svg {
          height: 50px;
          width: 50px;

          svg {
            height: 26px;
            width: 26px;
          }
        }
          .pause-svg-icon{
           svg{
            height: 40px;
            width: 40px;
           }
          }

        img {
          padding: 42px 45px;
        }
      }
    }

    .col-lg-9 {
      padding: 0 15px;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .main-wrapper {
      .image-wrapper {
        img {
          padding: 50px;
        }
      }
    }
  }
`;

export default Banner;
