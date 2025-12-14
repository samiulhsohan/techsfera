"use client";
import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Button from "../Button";
import FlipBox from "./FlipBox";

const MyComponent = () => {
  return (
    <StyledComponent>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <div className={"cta"}>
              <h4 className={"split-up"}>The TechSfera Method</h4>
              <Button
                text={"Get in Touch"}
                background={"#000"}
                color={"#fff"}
              />
            </div>
          </Col>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <div className={"box-wrapper"}>
              <Row>
                <Col lg={4}>
                  <FlipBox
                    title={"Defining Project Scope Clearly"}
                    subtitle={"Defining Project Scope Clearly"}
                    desc={`We align your business goals with technical feasibility upfront. This ensures a clear roadmap with zero surprises and minimizes risk.`}
                    icon={"/images/dynamic/services/flip-box/1.svg"}
                  />
                </Col>
                <Col lg={4}>
                  <FlipBox
                    title={"Designing And Building Solutions"}
                    subtitle={"Designing And Building Solutions"}
                    desc={`No silos. Our designers and developers collaborate daily, iterating fast to ensure the final product is both beautiful and bug-free.`}
                    icon={"/images/dynamic/services/flip-box/2.svg"}
                  />
                </Col>
                <Col lg={4}>
                  <FlipBox
                    title={"Ongoing Support After Launch"}
                    subtitle={"Ongoing Support After Launch"}
                    desc={`Launch is just the start. We monitor performance, handle updates, and help you add new features as your business grows.`}
                    icon={"/images/dynamic/services/flip-box/3.svg"}
                  />
                </Col>
              </Row>
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
    padding-left: 3px;
  }
  .col-lg-4 {
    padding: 0 1.5px;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
  .box-wrapper {
    padding: 0 15px;
  }
  .cta {
    margin-top: 3px;
    padding: 8px 8px 8px 25px;
    background: #fff;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    h4 {
      color: #071d21;
      font-family: "Bricolage Grotesque";
      font-weight: 700;
    }
  }
  @media (max-width: 768px) {
    .col-lg-9 {
      padding-left: 15px;
    }

    .cta {
      padding: 5px 5px 5px 15px;
      h4 {
        color: #071d21;
        font-family: "Bricolage Grotesque";
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 38px;
      }
    }
  }
`;

export default MyComponent;
