"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { hover, Transition } from "../../styles/globalStyleVars";
import Button from "../Button";

const services = [
  {
    number: "(01)",
    title: "How do your designers and developers work together?",
    desc: "Seamlessly. They collaborate from day one, ensuring the beautiful interface we design is technically feasible and the code stays true to the vision.",
  },
  {
    number: "(02)",
    title: "Do I own the source code and design files?",
    desc: "Yes, 100%. Upon completion, you receive full ownership of all IP, source code (GitHub), and open design files (Figma).",
  },
  {
    number: "(03)",
    title: "How do you handle time zones?",
    desc: "We turn it into an advantage. We overlap our hours with yours for meetings, then focus on deep work while you sleep, so you wake up to progress.",
  },
  {
    number: "(04)",
    title: "Do you use templates?",
    desc: `No. We build custom solutions. Your design is crafted for your brand, and your code is architected specifically for your business logic.`,
  },
  {
    number: "(05)",
    title: "Can you redesign an existing product?",
    desc: "Absolutely. We can audit your current site or app, giving it a visual refresh and a technical upgrade to improve performance and conversion.",
  }
];

const ServiceAccordion = () => {
  const location = usePathname();

  const [url, setUrl] = useState("");

  // GSAP scroll pinning logic
  useEffect(() => {
    if (window.innerWidth <= 991) {
      return; // If not, do nothing
    }
    gsap.registerPlugin(ScrollTrigger);
    const col4Element = document.querySelector(".service-accordion__title");
    const rightWrapperElement = document.querySelector(".accordion-wrapper");

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

  // Set URL only in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(decodeURIComponent(window.location.href));
    }
  }, []);

  return (
    <StyledComponent className={"service-accordion"}>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <Row>
              <Col lg={4} md={12}>
                <div className={"pin-left-accordion"}>
                  <div className={"service-accordion__title"}>
                    <h3 className={"split-up-straight"}>Have any questions?</h3>
                    <p className={"split-up-straight"}>
                      Find the right answers and solutions for your business and
                      project. If you need more details, our team is ready to
                      chat.
                    </p>
                    <Button
                      text={"Book a Quick Call"}
                      fontSize={"17px"}
                      lineHeight={"21px"}
                      fontWeight={"700"}
                      background={"#071D21"}
                      color={"#FFF"}
                      src={"https://cal.com/techsferahq/30min"}
                      target={"_blank"}
                    />
                  </div>
                </div>
              </Col>
              <Col lg={8} md={12} className={"service-accordion__wrapper"}>
                <div className="accordion-wrapper">
                  <Accordion defaultActiveKey="0" className="custom-accordion">
                    {services.map((service, index) => (
                      <Accordion.Item
                        eventKey={index.toString()}
                        key={`${service.title}-${index}`}
                        className="service-accordion-item"
                      >
                        <Accordion.Header className="service-accordion-header">
                          <div className="accordion-content">
                            <p className="number split-up-straight">
                              {service.number}
                            </p>
                            <h5 className={"split-up-straight"}>
                              {service.title}
                            </h5>
                            <div className="icon">
                              <div className="icon-wrapper">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 22 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11 18.3335L11 3.66682"
                                    stroke="#071D21"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M15.5837 13.7504C15.5837 13.7504 12.2081 18.3337 11.0003 18.3337C9.79249 18.3338 6.41699 13.7504 6.41699 13.7504"
                                    stroke="#071D21"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="service-accordion-body">
                          <p className={"split-up-straight"}>{service.desc}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
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
  margin-top: 3px;
  overflow: hidden;

  .col-lg-4 {
    padding: 0 3px;
  }

  .col-lg-9 {
    padding-right: 30px;
  }

  .pin-left-accordion {
    height: 100%;
    width: 100%;
    position: relative;
    border-radius: 30px;
    background: #fff;
  }

  .service-accordion {
    overflow: hidden;
    margin-top: 3px;

    &__title {
      padding: 25px;

      h3 {
        color: #071d21;
        margin-bottom: 18px;
        font-weight: 700;
      }

      p {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 25px;
      }
    }

    &__wrapper {
      border-radius: 30px;
      background: #f5f5f5;
      padding: 25px 30px 30px 25px;
      overflow: hidden;
    }

    .custom-accordion {
      .accordion-item {
        border: none;
        background: transparent;
        margin-bottom: 0;

        .accordion-body {
          padding: 0 0 32px 0;
          border-top: 1px solid #e0e8db;
        }

        &:last-child {
          .accordion-body {
            border-bottom: none;
          }
        }
      }
    }

    .service-accordion-body {
      p {
        color: #808080;
        font-size: 16px;
        line-height: 24px;
        margin: 20px 0 0 0;
      }
    }
  }

  .service-accordion-item {
    position: relative;

    &:not(:last-child) {
      padding: 0 0 25px 0;
      margin: 25px 0;

      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: -30px;
        width: 120%;
        height: 1px;
        background: #e0e8db;
      }
    }

    &:first-child {
      margin-top: 0;
    }

    .accordion-collapse {
      padding-left: 8.8vw;
      padding-right: 65px;
    }

    .accordion-header {
      button {
        border: unset;
        background: transparent;
        width: 100%;
        padding: 0;

        .icon {
          height: 40px;
          width: 40px;
          border-radius: 100px;
          background: rgba(7, 29, 33, 0.08);

          .icon-wrapper {
            position: relative;
            height: 40px;
            width: 40px;
            overflow: hidden;
            border-radius: 100px;

            &:after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              height: 0;
              width: 100%;
              background: #071d21;
              border-radius: 100px;
              z-index: -1;
              transition: height 0.5s ${Transition};
            }
          }

          svg {
            transform: rotate(0deg);
            transition: transform 0.5s ${Transition};

            rect {
              transition: all 0.5s ${Transition};
            }

            path {
              transition: stroke 0.5s ${Transition};
            }
          }
        }

        &:not(.collapsed) {
          background: transparent;
          box-shadow: none;

          h5 {
            color: ${hover};
            transition: color 0.5s ${Transition};
          }

          .icon {
            .icon-wrapper {
              &:after {
                height: 100%;
                transition: height 0.5s ${Transition};
              }
            }

            svg {
              transform: rotate(180deg);
              transition: transform 0.5s ${Transition};

              rect {
                fill: #071d21;
                fill-opacity: 1;
                transition: all 0.5s ${Transition};
              }

              path {
                stroke: #ffffff;
                transition: stroke 0.5s ${Transition};
              }
            }
          }
        }
      }

      .accordion-content {
        position: relative;

        .icon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        .number {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        p {
          color: #071d21;
          font-family: "Bricolage Grotesque";
          font-size: 20px;
          font-style: normal;
          font-weight: 500;
          line-height: 38px;
          text-transform: capitalize;
        }

        h5 {
          color: #071d21;
          font-family: "Bricolage Grotesque";
          font-size: 20px;
          font-style: normal;
          font-weight: 600;
          line-height: 26px;
          text-align: left;
          padding-left: 8.8vw;
          padding-right: 4vw;
          transition: color 0.5s ${Transition};
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .service-accordion__wrapper {
      margin-top: 3px;
      margin-left: 3px;
    }

    .service-accordion-item .accordion-header .accordion-content {
      h5 {
        padding-right: 60px;
      }
    }
  }

  @media (max-width: 767px) {
    .col-lg-4 {
      padding: 0;
    }

    .service-accordion__wrapper {
      padding: 25px 15px;
    }

    .accordion-content {
      h5 {
        padding-left: 50px !important;
        padding-right: 50px !important;
      }
    }

    .service-accordion-item .accordion-collapse {
      padding-left: 50px !important;
      padding-right: 50px !important;
    }
    .number {
      top: -5px !important;
      transform: translateY(0%) !important;
    }
    .icon {
      top: 0 !important;
      transform: translateY(0%) !important;
    }

    .col-lg-9 {
      padding-left: 30px;
    }
  }
`;

export default ServiceAccordion;
