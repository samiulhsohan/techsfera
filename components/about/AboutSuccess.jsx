"use client";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import SuccessBox from "./SuccessBox";

const AboutSuccess = () => {
  const successData = [
    {
      image: "/images/dynamic/about/success-1.svg",
      title: "Projects",
      number: "45+",
      description:
        "Delivered across diverse industries with creativity and precision.",
    },
    {
      image: "/images/dynamic/about/success-2.svg",
      title: "Success",
      number: "98%",
      description:
        "Client satisfaction rate based on global feedback and reviews.",
    },
    {
      image: "/images/dynamic/about/success-3.svg",
      title: "Countries",
      number: "4+",
      description:
        "We seamlessly collaborate with clients across North America, Europe, and Asia.",
    },
  ];

  return (
    <StyledComponent className={"about-success"}>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <Row>
              {successData.map((item, index) => (
                <Col lg={4} md={12} key={index}>
                  <SuccessBox
                    image={item.image}
                    title={item.title}
                    number={item.number}
                    description={item.description}
                  />
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
  .col-lg-9 {
    padding-right: 30px;
    padding-top: 3px;
  }
  overflow: hidden;

  .row {
    margin: 0 -15px;
  }

  .col-lg-4 {
    padding: 0 3px 0 3px;
    &:first-child {
      padding-right: 0;
    }
    &:last-child {
      padding-left: 0;
    }
  }
  @media (max-width: 767px) {
  .col-lg-9{
  padding-top:0;

  }
  .col-lg-4{
   padding: 0 0 0 15px;
   &:not(:first-child){
   margin-top:-1px;}
    &:last-child {
      padding-left: 15px;
    }

      .success-box {
          &__wrapper {
              h4 {
                  padding-top: 20px;
              }
              h2 {
                  padding-top: 5px;
              }
              p {
                  padding-top: 18px;
              }
          }
      }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .success-box {
      &__wrapper {
        h4 {
          padding-top: 20px;
        }
        h2 {
          padding-top: 15px;
        }
        p {
          padding-top: 20px;
        }
      }
    }
  }
`;

export default AboutSuccess;
