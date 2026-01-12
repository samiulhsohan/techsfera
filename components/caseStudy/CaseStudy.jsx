"use client";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { hover, Transition } from "../../styles/globalStyleVars";
import { Img } from "../Img";

const caseStudies = [
  {
    title: "Ethernest App",
    image: "/images/dynamic/case-study/ethernest.png",
    wrapperClass: "left__wrapper",
    colClass: "left",
    colProps: { lg: 6 },
    background: "#F5F5F5",
    hoverBackground: "#FFE8D3",
    href: "https://www.behance.net/gallery/227355463/DeFi-App-UIUX-Case-Study-Crypto-Wallet-Finance-App"
  },
  {
    title: "Vegmove",
    image: "/images/dynamic/case-study/vegmove.png",
    wrapperClass: "right__wrapper",
    colClass: "right",
    colProps: { lg: 6 },
    background: "#F5F5F5",
    hoverBackground: "#E4FFE9",
    href: "https://dribbble.com/shots/26351025-Vegmove-Grocery-Delivery-Solution"
  },
  // {
  //   title: "Lumara AI",
  //   image: "/images/dynamic/case-study/lumara.png",
  //   wrapperClass: "full",
  //   colClass: "full",
  //   colProps: { lg: 12 },
  //   imageWrapperClass: "case-study__image-wrapper big",
  //   background: "#F5F5F5",
  //   hoverBackground: "#C9D3FF",
  // },
  {
    title: "Booking Stays App",
    image: "/images/dynamic/case-study/booking.png",
    wrapperClass: "left__wrapper",
    colClass: "left",
    colProps: { lg: 6 },
    background: "#F5F5F5",
    hoverBackground: "#E9E9FF",
    href: "https://dribbble.com/shots/25775105-Booking-Stays-Mobile-App"
  },
  {
    title: "MindSpace Dashboard",
    image: "/images/dynamic/case-study/mindspace.png",
    wrapperClass: "right__wrapper",
    colClass: "right",
    colProps: { lg: 6 },
    background: "#F5F5F5",
    hoverBackground: "#DBF2FF",
    href: "https://dribbble.com/shots/26212313-MindSpace-Dashboard-UI"
  },
  {
    title: "Performance Checker Dashboard",
    image: "/images/dynamic/case-study/performance-dashboard.png",
    wrapperClass: "full",
    colClass: "full",
    colProps: { lg: 12 },
    imageWrapperClass: "case-study__image-wrapper big",
    background: "#F5F5F5",
    hoverBackground: "#FFE8D3",
    href: "https://dribbble.com/shots/25748376-Machine-Performance-Checker-Dashboard"
  },
  {
    title: "MindSpace Landing Page",
    image: "/images/dynamic/case-study/mindspace-landing.png",
    wrapperClass: "right__wrapper",
    colClass: "right",
    colProps: { lg: 6 },
    background: "#F5F5F5",
    hoverBackground: "#FFEAF6",
    href: "https://dribbble.com/shots/26135075-MindSpace-Landing-Page"
  },
  {
    title: "Digital Agency Landing Page",
    image: "/images/dynamic/case-study/agency-landing.png",
    wrapperClass: "left__wrapper",
    colClass: "left",
    colProps: { lg: 6 },
    background: "#F5F5F5",
    hoverBackground: "#F4FFE8",
    href: "https://dribbble.com/shots/26563693-Digital-Agency-Landing-Page"
  },

];

const CaseStudyImageWrapper = styled.div`
  position: relative;
  padding-top: ${(props) =>
    props.big ? "calc(558 / 1135 * 100%)" : "calc(337 / 566 * 100%)"};
  background: ${(props) => props.background};
  border-radius: 30px;
  overflow: hidden;
  transition: background 0.5s ease;

  img {
    object-fit: contain !important;
    transform: scale(1);
    transition: transform 0.5s ${Transition};

    &:hover {
      transform: scale(1.05);
      transition: transform 0.5s ${Transition};
    }
  }

  &:hover {
    background: ${(props) => props.hoverBackground};
    transition: background 0.5s ease;
  }
  @media (max-width: 767px) {
    border-radius: 20px;
  }
`;

const CaseStudy = () => {
  return (
    <StyledComponent className={"case-study"}>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <Row>
              {caseStudies.map((item, idx) => (
                <Col
                  key={item.title}
                  className={item.colClass}
                  {...item.colProps}
                >
                  <Link href={item.href ?? "#"} target={item.href ? "_blank" : "_self"}>
                    <div className={item.wrapperClass}>
                      <div className={"case-study__title"}>
                        <h6 className={"split-up-delay"}>{item.title}</h6>
                        <div>
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.8333 8.16675L7 21.0001"
                              stroke="#071D21"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                            <path
                              d="M12.833 7.15343C12.833 7.15343 19.4055 6.59939 20.4029 7.59679C21.4003 8.59419 20.8462 15.1667 20.8462 15.1667"
                              stroke="#071D21"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <CaseStudyImageWrapper
                        background={item.background}
                        hoverBackground={item.hoverBackground}
                        big={!!item.imageWrapperClass}
                      >
                        <Img src={item.image} alt={"logo"} />
                      </CaseStudyImageWrapper>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  &.case-study {
    overflow: hidden;

    .col-lg-6 {
      padding: 0;
    }

    .col-lg-9 {
      padding-right: 30px;
    }

    .left {
      &__wrapper {
        cursor: pointer;
        padding: 0 0 0 3px;
      }
    }

    .right {
      &__wrapper {
        cursor: pointer;
        padding-left: 3px;
      }
    }

    .full {
      cursor: pointer;
      padding-left: 3px;
      padding-right: 0;
    }

    .left__wrapper,
    .right__wrapper,
    .full {
      .case-study__title h6 {
        transform: scale(1);
        transition: transform 0.5s ${Transition};
        transition:
          transform 0.5s ${Transition},
          color 0.5s ${Transition};
      }

      &:hover .case-study__title h6 {
        color: ${hover};
        transform: scale(1.05);
        transition:
          transform 0.5s ${Transition},
          color 0.5s ${Transition};
      }
    }

    .left__wrapper,
    .right__wrapper,
    .full {
      .case-study__title svg {
        path {
          transition: stroke 0.7s ${Transition};
        }
        transform: rotate(0deg);
        transition: transform 0.5s ${Transition};
      }

      &:hover .case-study__title svg {
        path {
          stroke: ${hover};
          transition: stroke 0.5s ${Transition};
        }
        transform: rotate(45deg);
        transition: transform 0.5s ${Transition};
      }
    }

    .left__wrapper:hover .case-study__title svg,
    .right__wrapper:hover .case-study__title svg,
    .full:hover .case-study__title svg {
    }

    .case-study {
      background: #fff;

      &__title {
        background: #fff;
        border-radius: 30px;
        padding: 18px 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h6 {
          border-radius: 30px;
          color: #071d21;
          font-family: "Bricolage Grotesque";
          text-transform: capitalize;
        }
      }

      &__image-wrapper {
        position: relative;
        padding-top: calc(337 / 566 * 100%);
        background: #F5F5F5;
        border-radius: 30px;
        overflow: hidden;

        &.big {
          padding-top: calc(558 / 1135 * 100%);
        }

        img {
          object-fit: contain !important;
          transform: scale(1);
          transition: transform 0.5s ${Transition};

          &:hover {
            transform: scale(1.05);
            transition: transform 0.5s ${Transition};
          }
        }
      }
    }

    @media (max-width: 767px) {
      margin-top: 78px;
      transition: 1.5s margin-top ease;
      .left,.right{
      margin-bottom:3px;}
      body.menu-open & {
        margin-top: 0 !important;
        transition: 1.5s margin-top ease;
      }
      .case-study {
        &__image-wrapper {
          position: relative;
          padding-top: calc(320 / 428 * 100%);
        }
        &__title {
          padding: 10px 16px;
          border-radius: 100px;
        }
      }

      .col-lg-9,
      .col-lg-6,
      .col-lg-12 {
        padding: 0 15px;
      }
    }
  }
`;

export default CaseStudy;
