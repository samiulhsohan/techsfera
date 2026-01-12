"use client";
import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import ContactTop from "./ContactTop";
import ContactForm from "./ContactForm";
import RotateSvg from "./RotateSvg";
import ContactWeather from "./ContactWeather";

const MyComponent = () => {
  return (
    <StyledComponent>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <Row className="d-none d-md-flex">
              <Col lg={7}>
                <ContactTop />
                <ContactForm />
              </Col>
              <Col lg={5}>
                <RotateSvg />
                <ContactWeather />
              </Col>
            </Row>

            <Row className="d-md-none">
              <Col lg={7}>
                <ContactTop />
                <RotateSvg />
              </Col>
              <Col lg={5}>
                <ContactForm />
                <ContactWeather />
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
  .col-lg-7 {
    padding: 0 3px;
  }

  .col-lg-5 {
    padding: 0 15px 0 0;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 767px) {
    .col-lg-9 {
      padding: 0 30px;
    }
    .col-lg-7 {
      padding: 0;
    }
    .col-lg-5 {
      padding: 0;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .col-lg-9 {
      padding-right: 30px;
    }
    .col-lg-5 {
      padding: 3px 0 0 3px;
    }
  }
`;

export default MyComponent;
