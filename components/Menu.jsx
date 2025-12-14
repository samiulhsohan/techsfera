"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { Transition } from "../styles/globalStyleVars";
import { CustomLink } from "./CustomLink";

const DesktopMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleItemClick = (i) => {
    setActiveIndex(i);
    // call toggleMenu if it's provided in parent scope or globals
    try {
      if (typeof toggleMenu === "function") toggleMenu();
    } catch (e) {}
  };

  // set active index based on current pathname on initial load / route change
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    const mapPathToIndex = (p) => {
      if (p === "/" || p === "") return 0;
      if (p.startsWith("/case-study")) return 1;
      if (p.startsWith("/services")) return 2;
      if (p.startsWith("/about")) return 3;
      if (p.startsWith("/contact")) return 4;
      return null;
    };
    const idx = mapPathToIndex(pathname);
    if (idx !== null) setActiveIndex(idx);
  }, [pathname]);

  return (
    <StyledComponent className={"menu-container"}>
      <Container fluid>
        <Row>
          <Col md={4} lg={3}>
            <div className={"menu"}>
              <div className={"menu__top"}>
                <div className={"logo"}>
                  <CustomLink href={"/"}>
                    <img src={"/images/static/menu_logo.svg"} alt={"logo"} />
                  </CustomLink>
                </div>
                <div className={"title"}>
                  <h1>
                    Your Vision,
                    <br /> <span>Our Expertise</span> <br /> A Perfect Blend
                  </h1>
                </div>
                <div className={"experience-wrapper"}>
                  <div className={"experience"}>
                    <div className={"service-line"}>
                      <span className={"label"}>Great at</span>
                      <span className={"tag green"}>UI/UX Design</span>
                    </div>
                    <div className={"service-line"}>
                      <span className={"tag white"}>Branding</span>
                    </div>
                    <div className={"service-line"}>
                      <span className={"tag green"}>Development</span>
                      <span className={"label"}> & beyond</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"menu__bottom"}>
                <div className={"navigation"}>
                  <div
                    className={`item ${activeIndex === 0 ? "active" : ""}`}
                    onClick={() => handleItemClick(0)}
                  >
                    <CustomLink href="/">T Studio</CustomLink>
                  </div>
                  <div
                    className={`item ${activeIndex === 1 ? "active" : ""}`}
                    onClick={() => handleItemClick(1)}
                  >
                    <CustomLink href="/case-study">Case Study</CustomLink>
                  </div>
                  <div
                    className={`item ${activeIndex === 2 ? "active" : ""}`}
                    onClick={() => handleItemClick(2)}
                  >
                    <CustomLink href="/services">Services</CustomLink>
                  </div>
                  <div
                    className={`item ${activeIndex === 3 ? "active" : ""}`}
                    onClick={() => handleItemClick(3)}
                  >
                    <CustomLink href="/about">About Us</CustomLink>
                  </div>
                </div>
                <div
                  className={`cta ${activeIndex === 3 ? "active" : ""}`}
                  onClick={() => handleItemClick(4)}
                >
                  <div className={"talk-btn"}>
                    <CustomLink href="/contact">Let's Talk</CustomLink>
                  </div>

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
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  &.menu-container {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
    width: 100%;
    height: 100vh;
    position: fixed;

    .container-fluid,
    .row,
    .column-md-3 {
      height: 100%;
    }

    .col-md-4 {
      padding-right: 0;
    }

    .menu {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      border-radius: 30px;
      padding: 25px;
      background: #f8fff0;

      &__top {
        .logo {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 22px;
        }
      }

      .title {
        text-align: left;
        margin-bottom: 27px;

        h1 {
          font-weight: 400;

          span {
            font-weight: 700;
          }
        }
      }

      .experience-wrapper {
        display: none;
        .experience {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .service-line {
            display: flex;
            align-items: flex-end;
            gap: 10px;

            .label {
              color: #898989;
              font-family: Geist;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 21px;
            }

            .tag {
              padding: 5px 10px;
              color: #071d21;
              font-family: "Bricolage Grotesque";
              font-size: 18px;
              font-style: normal;
              font-weight: 500;
              line-height: 21px;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              gap: 10px;
              border-radius: 100px;

              &.green {
                background: #dfffb9;
                color: #071d21;
              }

              &.white {
                background: #f8fff0;
                color: #071d21;
                border: 1px solid rgba(7, 29, 33, 0.1);
              }
            }
          }
        }
      }

      &__bottom {
        .navigation {
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-bottom: 14px;

          .item {
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

            &.active {
              a {
                color: #071d21;
              }

              &:after {
                opacity: 1;
              }
            }
          }

          a {
            color: #898989;
            font-family: Geist;
            font-size: 22px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-transform: capitalize;
            transform: scale(1);
            transition:
              transform 0.5s ${Transition},
              color 0.5s ${Transition};

            &:hover {
              color: #071d21;
              transform: scale(1.02) !important;
              transition:
                transform 0.5s ${Transition},
                color 0.5s ${Transition};
            }
          }
        }

        .cta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
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
            a {
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
        }

        .social {
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
              transform: scale(1);
              transition: transform 0.5s ${Transition};
              cursor: pointer;

              &:hover {
                transform: scale(1.1);
                transition: transform 0.5s ${Transition};
              }
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      max-width: 100%;
      position: relative;
      height: auto;
      .col-md-3 {
        padding-right: 15px;
      }
    }

    @media (min-width: 767px) and (max-width: 1080px) {
      .title {
        h1 {
          font-size: 28px;
        }
      }
    }
  }
  @media (min-height: 768px) {
    .experience-wrapper {
      display: block!important;
    }
  }
`;

export default DesktopMenu;
