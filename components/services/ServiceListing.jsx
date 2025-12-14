"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Button from "../Button";

const services = [
  {
    number: "(1)",
    image: "/images/dynamic/services/1.svg",
    title: "Branding & Identity",
    description:
      "We craft unforgettable identities. From logos to design systems, we build brands that look distinct and translate perfectly to digital screens.",
    background: "#FFF6EA",
    hoverBackground: "#FF622F",
  },
  {
    number: "(2)",
    image: "/images/dynamic/services/2.svg",
    title: "UI/UX Design",
    description: `We design for users and developers. Our interfaces are intuitive, accessible, and structured to ensure the final code matches the creative vision pixel-for-pixel.`,
    background: "#EAF6FF",
    hoverBackground: "#4F9FFF",
  },
  {
    number: "(3)",
    image: "/images/dynamic/services/3.svg",
    title: "Software Development",
    description:
      "We bring designs to life with clean, robust code. Whether web or mobile, we engineer stable systems that are fast, secure, and ready to scale with your business.",
    background: "#F0F1FF",
    hoverBackground: "#7B7FFF",
  },
];

const ServiceList = () => {
  const location = usePathname();

  useEffect(() => {
    // Only activate on larger screens
    if (window.innerWidth <= 991) {
      return; // If not, do nothing
    }
    gsap.registerPlugin(ScrollTrigger);
    const col4Element = document.querySelector(".service-list__title");
    const rightWrapperElement = document.querySelector(
      ".service-list__wrapper"
    );

    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      // Use requestAnimationFrame to ensure DOM is fully painted
      requestAnimationFrame(() => {
        gsap.to(col4Element, {
          scrollTrigger: {
            trigger: col4Element,
            start: "top 0",
            end: () => {
              const endValue = rightWrapperElement?.offsetHeight - col4Element?.offsetHeight;
              return `+=${endValue}`;
            },
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });

        // Refresh ScrollTrigger after a short delay to recalculate positions
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location]);
  return (
    <StyledComponent className={"service-list"}>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <Row>
              <Col lg={4} md={12}>
                <div className={"pin-left"}>
                  <div className={"service-list__title"}>
                    <h3 className={"split-up-delay"}>
                      Here's What We Can Create
                    </h3>
                    <p className={"split-up-delay"}>
                      We don't just design, and we don't just code—we fuse them.
                      We build digital products where stunning aesthetics meet
                      powerful engineering. From concept to launch, we ensure
                      your product looks beautiful and works flawlessly.
                    </p>
                    <Button
                      text={"Start a Project"}
                      fontSize={"17px"}
                      lineHeight={"21px"}
                      fontWeight={"700"}
                      background={"#071D21"}
                      color={"#FFF"}
                      src={"/contact"}
                    />
                  </div>
                </div>
              </Col>
              <Col lg={8} md={12} className={"service-list__wrapper"}>
                {services.map((service, idx) => (
                  <ServiceItem
                    key={service.title}
                    background={service.background}
                    hoverBackground={service.hoverBackground}
                  >
                    <span className={"split-up"}>{service.number}</span>

                    <div className={"service-list__wrapper__content"}>
                      <div className={"service-list__icon"}>
                        <div>
                          <img src={service.image} alt={service.title} />
                        </div>
                      </div>
                      <h5 className={"split-up-delay"}>{service.title}</h5>
                      <p className={"split-up-delay"}>{service.description}</p>
                    </div>
                  </ServiceItem>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </StyledComponent>
  );
};

const ServiceItem = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  padding: 32px 0 32px 0;
  overallow: hidden;
  &:not(:last-child):after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -50px;
    height: 1px;
    width: 120%;
    background: #e0e8db;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }

  span {
    color: #071d21;
    font-family: "Bricolage Grotesque";
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }

  .service-list__wrapper__content {
    flex: 1;

    h5 {
      color: #071d21;
      font-family: "Bricolage Grotesque";
      font-size: 22px;
      font-weight: 700;
      line-height: 30px;
      text-transform: capitalize;
      margin-bottom: 7px;
    }

    p {
      color: #808080;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 0;
    }
  }

  @media (max-width: 767px) {
    padding: 0 0 25px 0;
    margin-bottom: 25px;
    span {
      margin-top: 0;
    }
  }
`;

const StyledComponent = styled.section`
  overflow: hidden;

  .col-lg-4 {
    padding: 0 3px;
  }

  .col-lg-9 {
    padding-right: 30px;
  }

  .pin-left {
    height: 100%;
    width: 100%;
    background: white;
    border-radius: 30px;
  }

  .service-list {
    &__title {
      padding: 25px;
      border-radius: 30px;

      h3 {
        color: #071d21;
        margin-bottom: 5px;
        font-weight: 700;
      }

      p {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 20px;
      }
    }

    &__wrapper {
      border-radius: 30px;
      background: #f5f5f5;
      padding: 25px 30px 30px 25px;
      overflow: hidden;
      height: 100%;

      &__content {
        padding-left: 105px;

        img {
          padding-bottom: 20px;
        }
      }
    }

    span {
      color: #071d21;
      leading-trim: both;
      text-edge: cap;
      font-family: "Bricolage Grotesque";
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 38px;
      text-transform: capitalize;
    }

    h5 {
      color: #071d21;
      leading-trim: both;
      text-edge: cap;
      font-family: "Bricolage Grotesque";
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px;
      text-transform: capitalize;
      padding-bottom: 20px;
    }

    p {
      color: #808080;
    }
  }

  @media (max-width: 767px) {
    margin-top: 78px;
    transition: 1.5s margin-top ease;
    body.menu-open & {
      margin-top: 0 !important;
      transition: 1.5s margin-top ease;
    }

    .service-list {
      &__title {
        border-radius: 20px;
        margin-bottom: -1px;
        padding: 15px;
      }

      &__wrapper {
        border-radius: 20px;
        padding: 15px;

        &__content {
          padding-left: 30px;

          h5 {
            color: #071d21;
            font-family: "Bricolage Grotesque";
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 30px;
            text-transform: capitalize;
          }

          p {
            font-size: 15px;
          }
        }
      }
    }

    .col-lg-4 {
      padding: 0;
    }

    .col-lg-9 {
      padding-left: 30px;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .service-list__wrapper {
      margin-top: 3px;
      margin-left: 3px;

      span {
        margin-top: 0;
      }

      .service-list__wrapper__content {
        padding-left: 30px;
      }
    }
  }
`;

export default ServiceList;
