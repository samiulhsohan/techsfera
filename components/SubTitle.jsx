'use client'
import React from 'react';
import styled from 'styled-components';
import parse from "html-react-parser";
import {title} from "../styles/globalStyleVars";


const SubTitle = ({
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

        <StyledSubTitle className={`subtitle ${classname}`}
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
            <h6>{parse(text)} </h6>


        </StyledSubTitle>

    )
};


const StyledSubTitle = styled.div`
  margin: ${props => props.margin || '0px'};
  position: relative;
  width: ${props => props.width || 'fit-content'};
  font-family: ${title};
  text-align: ${props => props?.center ? 'center' : ''};
  padding: ${p => p.padding};

  h6 {
    font-size: ${props => props.fontSize || '1.464vw'};
    line-height: ${props => props.lineHeight || '120%'};
    //text-transform: uppercase;
    font-weight: ${props => props.fontWeight || '600'};
    color: ${props => props.color || "#C07863"};
  }


  @media (max-width: 767px) {
    padding: 0;
    margin: ${p => p.marginSm};
    h6 {
      font-size: 20px !important;
      line-height: 120% !important;
    }
  }
`;


export default SubTitle;














