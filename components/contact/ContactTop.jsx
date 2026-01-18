"use client";
import styled from "styled-components";
import { Transition } from "../../styles/globalStyleVars";
import Button from "../Button";

const ContactTop = () => {
  return (
    <StyledComponent className={"contact-top"}>
      <div className={"contact-top__wrapper"}>
        <div className={"contact-top__wrapper__inner"}>
          <h3 className={"split-up-delay"}>
            We bring your <br />
            vision to life
          </h3>
          <p className={"split-up-delay"}>
            That’s why we’re here to provide custom solutions to help you
            achieve your goals and elevate your digital presence.
          </p>
          <div className={"contact-top__wrapper__inner__buttons"}>
            <Button
              src={'https://cal.com/techsferahq/30min'}
              target="_blank"
              text={"Book a Free Consultation"}
              background={"#000"}
              color={"#fff"}
              margin={"0 0 0 3px"}
              marginSm={"0 0 0 3px"}
            />
          </div>
        </div>
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  .contact-top {
    &__wrapper {
      &__inner {
        border-radius: 30px;
        padding: 25px;
        background: #f5f5f5;

        h3 {
          color: #071d21;
          font-weight: 700;
          margin-bottom: 18px;
        }

        &__buttons {
          display: flex;
          align-items: center;
          margin-top: 25px;

          img {
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

  @media (max-width: 767px) {
    margin-top: 79px;
    margin-bottom: 3px;
    transition: 1.5s margin-top ease;
    body.menu-open & {
      margin-top: 0 !important;
      transition: 1.5s margin-top ease;
    }
    .contact-top {
      &__wrapper {
        &__inner {
          border-radius: 20px;
          padding: 15px;

          h3 {
            line-height: 32px;
            margin-bottom: 15px;
          }
        }
      }
    }
  }
`;

export default ContactTop;
