"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { gsap } from "gsap";
import Link from "next/link";
import parse from "html-react-parser";

const SuccessBox = ({ image, title, number, description }) => {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const numberRef = useRef(null);

  useEffect(() => {
    // Extract the numeric value and extension from the number prop
    const match = number.match(/(\d+(?:\.\d+)?)([+%]?)/);
    const numericValue = match ? parseFloat(match[1]) : 0;
    const extension = match ? match[2] : "";

    // Simple counting animation using setInterval
    const startCount = 0;
    const endCount = numericValue;
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const increment = (endCount - startCount) / steps;
    const stepDuration = duration / steps;

    let currentCount = startCount;
    let step = 0;

    const counter = setInterval(() => {
      step++;
      currentCount += increment;

      if (step >= steps) {
        currentCount = endCount;
        clearInterval(counter);
      }

      setAnimatedNumber(Math.round(currentCount));
    }, stepDuration);

    // Cleanup interval on unmount
    return () => clearInterval(counter);
  }, [number]);

  return (
    <StyledComponent className={"success-box"}>
      <div className="success-box__wrapper">
        <img src={image} alt={title} />
        <h4 className={'split-up-delay'}>{parse(title)}</h4>
        <h2 className={'split-up-delay'} ref={numberRef}>
          {(() => {
            const match = number.match(/(\d+(?:\.\d+)?)([+%]?)/);
            const extension = match ? match[2] : "";
            return `${animatedNumber}${extension}`;
          })()}
        </h2>
        <p className={'split-up-delay'}>{parse(description)}</p>
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  overflow: hidden;
  border-radius: 30px;
  padding: 25px;
  background: #f5f5f5;
  transition: all 0.3s ease;
  height: 100%;

  .success-box {
    &__wrapper {
      h4 {
        color: #071d21;
        font-weight: 500;
        padding-top: 35px;
        line-height: 38px !important;
      }

      h2 {
        color: #071d21;
        font-family: "Bricolage Grotesque";
        font-size: 68px;
        font-style: normal;
        font-weight: 600;
        line-height: 38px !important;
        padding-top: 20px;
        margin-bottom: 0;
      }

      p {
        color: #808080;
        font-family: Geist;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px !important;
        padding-top: 35px;
      }
    }
  }

  @media (max-width: 767px) {
    padding: 15px;
    border-radius: 20px;
    .success-box {
      &__wrapper {
        h2 {
          font-size: 50px;
          padding-top: 15px;
        }

        h4 {
          font-size: 18px;
          padding-top: 30px;
        }

        p {
          font-size: 15px;
          padding-top: 30px;
        }
      }
    }
  }
`;

export default SuccessBox;
