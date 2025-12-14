"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { Transition } from "../styles/globalStyleVars";
import Button from "./Button";
import { getLenis } from "./hooks/getLenis";
import { CustomLink } from "./CustomLink";

const menuLinks = [
  {
    path: "/",
    label: "T Studio",
  },
  {
    path: "/case-study",
    label: "Case Study",
  },
  {
    path: "/services",
    label: "Services",
  },
  {
    path: "/about",
    label: "About Us",
  },
];

const MobileMenu = () => {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef();
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // set active index based on current pathname on initial load / route change
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    const mapPathToIndex = (p) => {
      if (p === "/" || p === "") return 0;
      if (p.startsWith("/case-study")) return 1;
      if (p.startsWith("/services")) return 2;
      if (p.startsWith("/about")) return 3;
      if (p.startsWith("/contact")) return 4; // Add contact as index 4
      return null;
    };

    const idx = mapPathToIndex(pathname);
    if (idx !== null) setActiveIndex(idx);
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    let howMuchScroll = 80;

    window.addEventListener("scroll", () => {
      let currentScroll = window.pageYOffset;

      if (currentScroll <= howMuchScroll) {
        body.classList.remove(scrollUp);
        return;
      }
      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        // down
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
      } else if (
        currentScroll < lastScroll &&
        body.classList.contains(scrollDown)
      ) {
        // up
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }
      lastScroll = currentScroll;
    });
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const createTimeline = () => {
    // Reset all positions first
    gsap.set(".menu-link-item-holder,.menu-services .item-wrapper", { y: 85 });
    gsap.set(".menu-services .item-wrapper", { y: 85 });
    gsap.set(".contact-item", { y: 85 });
    gsap.set(".bottom-text", { y: 85 });

    // Set initial clipPath
    gsap.set(".menu-overlay", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });

    // Create new timeline
    const timeline = gsap.timeline({ paused: true });

    // Add overlay animation
    timeline.to(".menu-overlay", {
      duration: 1.24,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
    });

    // Add content animations
    timeline.to(".menu-link-item-holder", {
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.inOut",
      delay: -1,
    });

    timeline.to(
      ".menu-services .item-wrapper",
      {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: -0.75,
      },
      "-=0.5"
    );

    timeline.to(
      ".bottom-text",
      {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: 0,
      },
      "-=2"
    );

    timeline.to(
      ".contact-item",
      {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: 0,
      },
      "-=2"
    );

    return timeline;
  };

  const toggleMenu = () => {
    const willOpen = !isMenuOpen;
    setIsMenuOpen(willOpen);

    const lenis = getLenis();
    if (willOpen) {
      try {
        if (lenis && typeof lenis.stop === "function") lenis.stop();
      } catch (e) {}
    } else {
      try {
        if (lenis && typeof lenis.start === "function") lenis.start();
      } catch (e) {}
    }

    // compute menu overlay height (fallback to viewport height)
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuHeight = menuOverlay
      ? menuOverlay.offsetHeight
      : window.innerHeight;
    const mainRoot = document.getElementById("main-root");

    if (willOpen) {
      // Open menu
      document.body.classList.add("menu-open");
      gsap.to("#smooth-wrapper", {
        duration: 1.25,
        transform: "translateY(100%)",
        ease: "power4.inOut",
      });

      // push main content down by menu height
      if (mainRoot) {
        gsap.to(mainRoot, {
          duration: 1.25,
          y: menuHeight,
          ease: "power4.inOut",
        });
      }

      // Create and play the timeline for the menu opening
      tl.current = createTimeline();
      tl.current.play();
    } else {
      // Close menu
      document.body.classList.remove("menu-open");
      gsap.to("#smooth-wrapper", {
        duration: 1.25,
        transform: "translateY(0%)",
        ease: "power4.inOut",
      });

      gsap.to(".menu-overlay", {
        duration: 1.25,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power4.inOut",
      });

      // reset main content position
      if (mainRoot) {
        gsap.to(mainRoot, { duration: 1.2, y: 0, ease: "power4.inOut" });
      }
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");

      // Create a fresh timeline each time the menu opens
      tl.current = createTimeline();
      tl.current.play();
    } else {
      document.body.classList.remove("menu-open");
      // Reverse the menu-overlay with correct clipPath
      gsap.to(".menu-overlay", {
        duration: 1.25,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power4.inOut",
      });
    }
  }, [isMenuOpen]);

  // ensure Lenis is resumed if component unmounts while menu is open
  useEffect(() => {
    return () => {
      const lenis = getLenis();
      try {
        if (lenis && typeof lenis.start === "function") lenis.start();
      } catch (e) {}
    };
  }, []);

  return (
    <StyledComponent className={`mobile-menu`}>
      <Container fluid>
        <div className="menu-container" ref={container}>
          <div className="menu-bar">
            <div className={"menu-bar__left"}>
              <div className="menu-open" onClick={toggleMenu}>
                <div className="icon">
                  <div className="shape"></div>
                  <div className="lines">
                    <div
                      className="line lineone"
                      style={{ background: "#071D21" }}
                    ></div>
                    <div
                      className="line linetwo"
                      style={{ background: "#071D21" }}
                    ></div>
                    <div
                      className="line linethree"
                      style={{ background: "#071D21" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="menu-logo">
                <CustomLink prefetch={true} href="/">
                  <img
                    src={"/images/static/mobile_logo.svg"}
                    alt={"mobile_logo"}
                  />
                </CustomLink>
              </div>
            </div>
            <div className="menu-cta">
              <Button text={"Get in Touch"} background={"#071D21"} />
            </div>
            <div className="button-wrapper">
              <div className="close-btn" onClick={toggleMenu}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.7506 6.25L6.25061 23.75M6.25061 6.25L23.7506 23.75"
                    stroke="#071D21"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-overlay">
          <Row>
            <Col xs={12}>
              <div className="menu-copy">
                <div className={"item-wrapper"}>
                  <div className="menu-links">
                    {menuLinks.map((link, index) => (
                      <div
                        className={`menu-link-item ${activeIndex === index ? "active" : ""}`}
                        key={index}
                      >
                        <div
                          className="menu-link-item-holder"
                          onClick={() => {
                            setTimeout(() => {
                              setActiveIndex(index);
                              toggleMenu();
                            }, 350); // Delay to allow animation
                          }}
                        >
                          <CustomLink
                            prefetch={true}
                            href={link.path}
                            className="menu-link"
                          >
                            {link.label}
                          </CustomLink>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={"cta"}>
                <CustomLink prefetch={true} href="/contact" className={"talk-btn menu-link"}
                  onClick={() => {
                    setTimeout(() => {
                      setActiveIndex(4); // Set active index for contact
                      toggleMenu();
                    }, 350); // Delay to allow animation
                  }}
                >
                  Let's Talk
                </CustomLink>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.8333 8.16675L7 21.0001"
                    stroke="#5DC700"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12.8333 7.15343C12.8333 7.15343 19.4058 6.59939 20.4032 7.59679C21.4006 8.59419 20.8465 15.1667 20.8465 15.1667"
                    stroke="#5DC700"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={"social"}>
                <p>Stay connected</p>
               <div className={"social-icons"}>
                    <a
                      className={"icon"}
                      href={"https://dribbble.com/techsferahq"}
                      target={"_blank"}
                    >
                      <img
                        src={"/images/dynamic/menu/social_1.svg"}
                        alt={"dribbble"}
                      />
                    </a>
                    <a
                      className={"icon behance"}
                      href={"https://www.behance.net/TechSferaHQ"}
                      target={"_blank"}
                    >
                      <img
                        src={"/images/dynamic/menu/social_2.svg"}
                        alt={"dribbble"}
                      />
                    </a>
                    <a
                      className={"icon instagram"}
                      href={"https://www.instagram.com/techsferahq/"}
                      target={"_blank"}
                    >
                      <img
                        src={"/images/dynamic/menu/social_3.svg"}
                        alt={"dribbble"}
                      />
                    </a>
                    <a
                      className={"icon linkedin"}
                      href={"https://www.linkedin.com/company/techsferahq"}
                      target={"_blank"}
                    >
                      <img
                        src={"/images/dynamic/menu/social_4.svg"}
                        alt={"dribbble"}
                      />
                    </a>
                  </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: unset;
  padding: 0 !important;
  transition: all 0.3s ease;
  background: #f8fff0;
  border-radius: 20px;
  overflow: hidden;

  .menu-container {
    width: 100%;
    padding: 18px 8px 8px 8px;

    .menu-bar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0;
      z-index: 100;
      position: relative;

      &__left {
        display: flex;
        gap: 10px;
      }

      .menu-logo {
        height: 100%;
        position: absolute;
        top: 0;
        left: 60px;
        transition: 0.7s ${Transition} left;

        svg {
          path {
            fill: ${(props) => props.menuColor || "#000"};
            transition: 0.5s ${Transition} fill;
          }
        }
      }

      body.menu-open & {
        .menu-logo {
          left: 8px;
          transition: 0.7s ${Transition} left;
        }
      }

      .menu-open {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 15px;
        position: relative;
        z-index: 100;

        .icon {
          align-items: center;
          display: flex;
          flex-direction: column;
          height: 50px;
          justify-content: center;
          position: absolute;
          width: 50px;
          transform: scale(1);
          transition: transform 0.7s ${Transition};

          .shape {
            transform: scale(1);
            border-radius: 100px;
            background: rgba(7, 29, 33, 0.08);
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition:
              background 0.3s,
              border 0.3s,
              0.5s ${Transition} transform,
              0.3s ${Transition} background;
          }

          .line {
            background: #fff;
            height: 1px;
            margin: 2.4px;
            width: 18px;
            will-change: transform;
            transition: 0.3s ${Transition} background;
          }

          .lineone {
            transform: translate(0px, 0px);
            transition: 0.5s ${Transition} transform;
          }

          .linethree {
            transform: translate(0px, 0px);
            transition: 0.5s ${Transition} transform;
          }

          .linetwo {
            opacity: 1;
            transition: 0.3s ${Transition} opacity;
          }
        }

        &:hover {
          .shape {
            transform: scale(0.9) !important;
            transition: 0.5s ${Transition} transform;
          }
        }
      }
    }
  }

  .button-wrapper {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%) !important;

    .close-btn {
      transition: transform 0.5s ${Transition};
      transform: scale(0) !important;

      svg {
        transform: rotate(0deg) scale(1) !important;
        transition: all 0.5s ${Transition};
      }
    }
  }

  body.menu-open & {
    .close-btn {
      transform: scale(1) !important;
      transition: all 0.5s ${Transition};
    }
  }

  body.menu-open & {
    .icon {
      .lines {
        .lineone {
          background: #000 !important;
          transform: translate(0px, 3.36px) rotate(-47deg) !important;
          transition:
            0.5s ${Transition} transform,
            0.8s ${Transition} background !important;
        }

        .linethree {
          background: #000 !important;
          transform: translate(0px, -3.36px) rotate(-135deg) !important;
          transition:
            0.5s ${Transition} transform,
            0.8s ${Transition} background !important;
        }

        .linetwo {
          background: #000 !important;
          opacity: 0 !important;
          transition:
            0.3s ${Transition} opacity,
            0.8s ${Transition} background !important;
        }
      }
    }

    .shape {
      transition:
        0.8s ${Transition} background,
        0.8s ${Transition} border-color,
        0.5s ${Transition} transform !important;
    }

    .menu-logo {
      svg {
        path {
          fill: #fff !important;
          transition: 0.3s ${Transition} fill;
        }
      }
    }
  }

  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    padding: 0;
    background-color: #fff;
    overflow: hidden;
    border-radius: 20px;
    z-index: 2;
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);

    .cta {
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      cursor: pointer;
      transform: scale(1);
      transition: transform 0.5s ${Transition};

      svg {
        transform: rotate(0deg);
        transition: transform 0.5s ${Transition};
      }

      &:hover {
        transform: scale(1.02);
        transition: transform 0.5s ${Transition};

        svg {
          transform: rotate(45deg);
          transition: transform 0.5s ${Transition};
        }
      }

      .talk-btn {
        color: #5dc700;
        leading-trim: both;
        text-edge: cap;
        font-family: "Bricolage Grotesque";
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: capitalize;

        &:hover {
          color: #689f38;
        }
      }
    }

    .menu-copy {
      padding: 110px 15px 17px 15px;

      .menu-link-item {
        min-width: 100%;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      }

      .item-wrapper {
        position: relative;

        &:after {
          content: "";
          position: absolute;
          top: -20px;
          left: -20px;
          right: 0;
          background: rgba(7, 29, 33, 0.06);
          width: 130%;
          height: 1px;
        }
      }

      .menu-links {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .menu-link-item-holder {
        position: relative;
        overflow: hidden;

        &:after {
          opacity: 0;
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(-50%, 0px);
          background: #5dc700;
          width: 6px;
          height: 6px;
          border-radius: 100%;
        }

        a {
          color: #898989;
          leading-trim: both;
          text-edge: cap;
          font-family: Geist;
          font-size: 24px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-transform: capitalize;
        }
      }

      /* active state styling */

      .menu-link-item {
        &.active {
          .menu-link-item-holder {
            a {
              font-weight: 500;
            }
            &:after {
              opacity: 1;
            }
          }

          a {
            color: #071d21 !important;
          }
        }
      }
    }
  }

  .right-item {
    ul {
      li {
        overflow: hidden;

        a {
          font-family: IvarText;
          line-height: 9.3333333333vw;
          font-size: 5.3333333333vw;
          letter-spacing: -0.1066666667vw;
          color: white;
          position: relative;

          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            background: white;
            width: 0;
            height: 1px;
            transition: 0.3s ${Transition} width;
          }

          &:hover {
            &:after {
              width: 100%;
              transition: 0.5s ${Transition} width;
            }
          }
        }
      }
    }
  }

  .menu-cta {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.7s ${Transition};

    svg {
      transform: rotate(0deg);
      transition: transform 0.5s ${Transition};
    }

    &:hover {
      transform: scale(1.02);
      transition: transform 0.5s ${Transition};

      svg {
        transform: rotate(45deg);
        transition: transform 0.5s ${Transition};
      }
    }

    .talk-btn {
      color: #5dc700;
      leading-trim: both;
      text-edge: cap;
      font-family: "Bricolage Grotesque";
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: capitalize;

      &:hover {
        color: #689f38;
      }
    }
  }

  body.menu-open & .menu-cta {
    transform: scale(0);
    transition: transform 0.7s ${Transition};
  }

  body.menu-open & .icon {
    transform: scale(0) !important;
    transition: transform 0.7s ${Transition};
  }

  .social {
    padding: 0 15px 25px 15px;

    p {
      color: #071d21;
      font-family: "Bricolage Grotesque";
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 21px;
    }

    .social-icons {
      display: flex;
      gap: 15px;
      margin-top: 10px;

      .icon {
        transform: scale(1) !important;
        transition: transform 0.5s ${Transition};
        cursor: pointer;
        height: 40px;
        width: 40px;
        img {
          height: 40px;
          width: 40px;
        }

        &:hover {
          transform: scale(1.1) !important;
          transition: transform 0.5s ${Transition};
        }
      }
    }
  }

  .bottom__wrapper {
    position: unset;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 5vw;

    &__inner {
      padding: 0;

      .bottom-text {
        overflow: hidden;
      }
    }

    a {
      overflow: hidden;
      color: hsla(0, 0%, 100%, 0.6);
      font-size: 4.2666666667vw;
      line-height: 6.4vw;
      cursor: pointer;
      position: relative;
      width: fit-content;
      height: fit-content;

      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        background: white;
        width: 0;
        height: 1px;
        transition: 0.3s ${Transition} width;
      }

      &:hover {
        &:after {
          width: 100%;
          transition: 0.5s ${Transition} width;
        }
      }
    }

    .ul-wrapper {
      overflow: hidden;
    }
  }
`;

export default MobileMenu;
