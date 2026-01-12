'use client'
import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import SubTitle from "./SubTitle";
import Title from "./Title";
import Button from "./Button";


const MyComponent = () => {
    return (
        <StyledComponent className={'post-wrap'}>
            <Container>
                <Row>
                    <Col>
                        <div className="post-wrap__single">
                            <h1>H1</h1>
                            <h2>H2</h2>
                            <h3>H3</h3>
                            <h4>H4</h4>
                            <h5>H5</h5>
                            <h6>H6</h6>
                        </div>
                     
                    </Col>
                </Row>
            </Container>


        </StyledComponent>
    );
};

export default MyComponent;

const StyledComponent = styled.section`
  margin-top: 100px;

  .col-sm-4 {
    margin-bottom: 30px;

  }

  .post-wrap__single {
    border: 1px solid #DDD;
    min-height: 100%;
    padding: 20px;
    position: relative;

    a {
      position: absolute;
      inset: 0;
      z-index: 2;
    }

    &:hover {
      h4 {
        color: red;
      }
    }
  }
`;
