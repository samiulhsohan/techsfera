'use client'
import React from 'react';
import styled from 'styled-components';

import {title} from "../styles/globalStyleVars";
import parse from "html-react-parser";


const Title = ({
                   text,
                   fontSize,
                   fontWeight,
                   color,
                   letterSpacing,
                   lineHeight,
                   textTransform,
                   margin,
                   padding,
                   borderColor,
                   varient,
                   center,
                   classname,
                   marginSm,
                   width
               }) => {
    return (
        <StyledTitle className={`title ${classname}`}
                     fontSize={fontSize}
                     fontWeight={fontWeight}
                     color={color}
                     lineHeight={lineHeight}
                     LetterSpacing={letterSpacing}
                     textTransform={textTransform}
                     margin={margin}
                     padding={padding}
                     varient={varient}
                     center={center}
                     marginSm={marginSm}
                     width={width}
                     borderColor={borderColor}>
            <h2>{typeof text === 'string' ? parse(text) : text}</h2>
        </StyledTitle>
    );
};


const StyledTitle = styled.div`
  margin: ${props => props.margin || '0px'};
  position: relative;
  width: ${props => props.width || 'fit-content'};
  font-family: ${title};
  text-align: ${props => props?.center ? 'center' : ''};
  padding: ${p => p.padding};

  h2 {
    font-size: ${props => props.fontSize || '2.05vw'};
    line-height: ${props => props.lineHeight || '128.5%'};
    //text-transform: uppercase;
    font-weight: ${props => props.fontWeight || '300'};
    color: ${props => props.color || "#051936"};
    text-indent: 15vw;
  }


  @media (max-width: 767px) {
    padding: 0;
    margin: ${p => p.marginSm};
    h2 {
      font-size: 28px !important;
      line-height: 128.5% !important;
    }
  }
`;


export default Title;














