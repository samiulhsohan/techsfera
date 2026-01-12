"use client";

import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Transition } from "../../styles/globalStyleVars";

const MobileBannerTop = ({ margin }) => {
  return (
    <StyledComponent margin={margin}>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className={"mobile-banner"}>
              <div className={"mobile-banner__top"}>
                <div className={"title"}>
                  <h1>
                    Your Vision,
                    <p>Our Expertise</p>
                    <p>A Perfect Blend</p>
                  </h1>
                </div>
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
              <div className={"mobile-banner__bottom"}>
                <div className={"social"}>
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
    margin: ${({ margin }) => margin};
    transition: margin-top 1.7s ${Transition};

    /* collapse top gap when menu opens */

    body.menu-open & {
        margin-top: 3px;
        transition: margin-top 1.7s ${Transition};
    }

    display: none;
    overflow: hidden;
    @media (max-width: 768px) {
        display: block;
    }
    width: 100%;
    position: fixed;
    height: 100vh;

    .container-fluid,
    .row,
    .column-md-3 {
        height: 100%;
    }

    .col-md-3 {
        padding-right: 0;
    }

    .mobile-banner {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 25px;
        border-radius: 20px;
        padding: 15px 15px 20px 15px;
        background: #f8fff0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;

        .title {
            text-align: left;
            margin-bottom: 25px;

            h1 {
                font-weight: 400;
                font-size: 32px;
                line-height: 27px;

                p {
                    font-weight: 700;
                    text-indent: 20.5vw;

                    color: #071d21;
                    font-family: Geist;
                    font-size: 32px;
                    line-height: 45px;
                    font-style: normal;

                    font-weight: 700;
                }

                h6 {
                    text-indent: 20.5vw;
                    line-heght: 0;
                    color: #071d21;
                    font-family: Geist;
                    font-size: 32px;
                    font-style: normal;

                }
            }
        }

        .experience {
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding-left: 77px;

            .service-line {
                display: flex;
                align-items: flex-end;
                gap: 8px;

                .label {
                    color: #898989;
                    font-family: Geist;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 21px;
                }

                .tag {
                    padding: 10px 12px;
                    color: #071d21;
                    font-family: "Bricolage Grotesque";
                    font-size: 19px;
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

        &__bottom {
            padding-left: 77px;

            .social {
                .social-icons {
                    display: flex;
                    gap: 15px;

                    .icon {
                        transform: scale(1);
                        transition: transform 0.5s ${Transition};
                        cursor: pointer;

                        img {
                            width: 40px;
                            height: 40px;
                        }

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
        
        .title{
            margin-bottom: 20px!important;
        }

        .experience {
            gap: 10px!important;
        }
    }
`;

export default MobileBannerTop;
