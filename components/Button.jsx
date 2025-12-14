"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Black, hover, Transition } from "../styles/globalStyleVars";
import {CustomLink} from "./CustomLink";

const Button = ({
  onSubmit,
  text,
  src,
  img,
  hoverImg,
  fontSize,
  fontWeight,
  color,
  letterSpacing,
  lineHeight,
  margin,
  background,
  borderRadius,
  border,
  width,
  height,
  hoverbackground,
  target,
  borderColor,
  hovercolor,
  icon,
  marginSm,
  onClick,
  className,
}) => {
  return (
    <StyledBtn
      onClick={onClick}
      className={`${className ? className : null} dc-btn fade-up`}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      background={background}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      margin={margin}
      border={border}
      img={img}
      borderRadius={borderRadius}
      width={width}
      hoverImg={hoverImg}
      hoverbackground={hoverbackground}
      height={height}
      borderColor={borderColor}
      target={target}
      hovercolor={hovercolor}
      onSubmit={onSubmit}
      icon={icon}
      marginSm={marginSm}
    >
      {src && typeof src === "string" ? (
        src?.startsWith("http") || src?.startsWith("www") ? (
          <a href={src} target="_blank" rel="noopener noreferrer">
            <span>{text}</span>
          </a>
        ) : (
          <CustomLink href={src || "/"}>
            {icon && (
              <div className={"icon"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="14"
                  viewBox="0 0 22 14"
                  fill="none"
                >
                  <path
                    d="M1.66645 7.12647L20.3331 7.12646"
                    stroke="white"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.49956 12.9601C7.49956 12.9601 1.66628 8.66394 1.66627 7.12674C1.66625 5.58955 7.4996 1.29346 7.4996 1.29346"
                    stroke="white"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            )}
            <span>{text}</span>
          </CustomLink>
        )
      ) : (
        <a target={target || "_self"}>
          <span className={"split-up"}>{text}</span>
        </a>
      )}
    </StyledBtn>
  );
};

const StyledBtn = styled.div`
  &.dc-btn {
    margin: ${(props) => props.margin || "0"};
    width: ${(props) => props.width || "fit-content"};
    height: ${(props) => props.height || "50"}px;
    cursor: pointer;

    a {
      display: flex;
      width: fit-content;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-family: "Bricolage Grotesque";
      font-size: ${(props) => props.fontSize || "17"}px;
      font-weight: ${(props) => props.fontWeight || 700};
      margin: 0;
      line-height: ${(props) => props.lineHeight || "21"}px;
      background-color: ${(props) => props.background || `#fff`};
      position: relative;
      border-radius: ${(props) => props.borderRadius || "100"}px;
      overflow: hidden;
      z-index: 0;
      transition: border 0.3s ease;
      padding: 10px 20px;
      box-sizing: border-box;
      border: ${(p) => p.border || "0"};
      color: ${(props) => props.color || `${Black}`};
      .icon {
        margin-right: 5px;
        position: relative;
        z-index: 10;
      }
      span {
        transition: color 0.3s ease;
        color: ${(props) => props.color || `#fff`};
        position: relative;
        z-index: 2;

        img {
          padding-left: 5px;
          filter: none;
          transition: 0.6s ${Transition};
          // ${(p) => !p.icon && `display:none`}
        }
      }

      &:before {
        //bottom: 0;
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 100%;
        left: 0;
        background-color: ${(p) => p.hoverbackground || hover};
        height: 100%;
        width: 100%;
        margin: auto;
        transition: all 0.5s ${Transition};
        border-radius: 22px;
      }

      &:hover {
        span {
          color: ${(props) => props.hovercolor || `#fff`};
        }

        img {
          filter: invert(92%) sepia(99%) saturate(1%) hue-rotate(235deg)
            brightness(105%) contrast(100%);
        }

        &:before {
          top: 0;
        }
      }

      &:focus {
        color: #222222;
      }
    }

    @media (max-width: 767px) {
      ${(p) => (p.marginSm ? `margin:${p.marginSm}` : "")}
    }
  }
`;

export default Button;
