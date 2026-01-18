'use client'
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Button from '../Button';

gsap.registerPlugin(DrawSVGPlugin);

const Footer = ({

}) => {
  const svgRef = useRef(null);
  const pathsRef = useRef([]);

  useEffect(() => {
    if (svgRef.current) {
      const paths = pathsRef.current;

      // Set initial state
      gsap.set(paths, {
        drawSVG: "0%",
        fill: "rgba(7, 29, 33, 0)" // Transparent initially
      });

      // Create infinite loop animation with yoyo
      gsap.to(paths, {
        drawSVG: "100%",
        fill: "rgba(7, 29, 33, 1)", // Fade in fill color as it draws
        duration: 2,
        stagger: 0.1,
        ease: "power2.inOut",
        repeat: -1, // Infinite repeat
        yoyo: true, // Reverse on alternate iterations
        repeatDelay: 0.5 // Pause between loops
      });
    }
  }, []);

  return (
    <StyledComponent>
      <Container fluid>
        <Row>
          <Col lg={{ span: 9, offset: 3 }} md={{ span: 8, offset: 4 }}>
            <div className='wrapper'>
              <div className='wrapper__top'>
                <div className='svg'>
                  <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" width="825" height="168" viewBox="0 0 825 168" fill="none">
                    <path ref={el => pathsRef.current[0] = el} d="M34.7587 0V34.1914H75.5298V68.5676H11.6489V74.297C18.037 74.297 23.4856 76.5148 27.9949 80.9505C32.5041 85.3861 34.7587 90.7459 34.7587 97.0297V99.9868C34.7587 108.612 37.8901 116.004 44.153 122.165C50.4158 128.326 57.9312 131.406 66.6992 131.406H75.5298V165.597H66.6992C55.1756 165.597 44.5287 162.948 34.7587 157.65C23.3604 151.366 14.4671 142.618 8.07905 131.406C2.69302 121.795 0 111.322 0 99.9868V16.8185L34.7587 0Z" stroke="#071D21" strokeWidth="2" fill="none" />
                    <path ref={el => pathsRef.current[1] = el} d="M161.472 137.135H180.449C175 156.172 159.03 168 136.672 168C108.113 168 90.0762 148.594 90.0762 119.393C90.0762 90.1914 108.301 70.7855 137.423 70.7855C169.552 70.7855 184.958 94.4422 176.691 124.937H108.677C110.556 142.31 120.514 152.66 136.672 152.66C148.696 152.66 157.903 146.746 161.472 137.135ZM136.86 85.7558C121.265 85.7558 111.495 94.9967 109.053 110.891H160.721C162.224 95.3663 153.581 85.7558 136.86 85.7558Z" stroke="#071D21" strokeWidth="2" fill="none" />
                    <path ref={el => pathsRef.current[2] = el} d="M240.701 168C212.894 168 194.294 148.409 194.294 119.393C194.294 90.1914 212.706 70.7855 241.641 70.7855C270.575 70.7855 286.733 90.3762 281.096 117.175H263.06C266.441 97.9538 257.987 86.1254 241.265 86.1254C223.792 86.1254 212.706 99.4323 212.706 119.393C212.706 139.353 223.979 152.66 240.889 152.66C253.853 152.66 263.06 144.713 266.817 132.515H285.794C281.848 150.812 267.005 168 240.701 168Z" stroke="#071D21" strokeWidth="2" fill="none" />
                    <path ref={el => pathsRef.current[3] = el} d="M352.255 70.7855C373.298 70.7855 383.068 86.3102 383.068 109.967V165.597H365.595V109.967C365.595 95.9208 360.146 86.495 346.806 86.495C331.212 86.495 320.127 100.172 320.127 120.686V165.597H302.653V36.2244H320.127V90.7459C325.951 78.363 337.6 70.7855 352.255 70.7855Z" stroke="#071D21" strokeWidth="2" fill="none" />
                    <path ref={el => pathsRef.current[4] = el} d="M440.376 168C414.448 168 396.975 154.693 399.041 131.591H415.951C414.072 144.898 423.654 153.769 440.564 153.769C453.528 153.769 461.983 148.779 461.983 140.832C461.983 119.578 400.356 133.993 400.356 99.9868C400.356 82.0594 417.83 70.7855 439.249 70.7855C464.237 70.7855 481.711 85.571 477.201 105.162H460.292C463.298 93.3333 453.34 85.0165 438.873 85.0165C427.224 85.0165 418.393 90.3762 418.393 98.5082C418.393 119.208 479.832 104.422 479.832 139.353C479.832 157.281 463.862 168 440.376 168Z" stroke="#071D21" strokeWidth="2" fill="none" />
                    <path ref={el => pathsRef.current[5] = el} d="M553.885 61.9142H538.103C541.109 53.967 539.23 48.9769 533.593 48.9769C528.333 48.9769 525.326 53.2277 525.326 60.4356V73.1881H553.885V88.528H525.326V165.597H507.853V88.528H490.943V73.1881H507.853V60.4356C507.853 43.802 517.059 33.8218 534.157 33.8218C552.194 33.8218 558.958 45.4653 553.885 61.9142Z" stroke="#071D21" strokeWidth="2" fill="none" />
                    <path ref={el => pathsRef.current[6] = el} d="M631.919 137.135H650.895C645.447 156.172 629.476 168 607.118 168C578.56 168 560.523 148.594 560.523 119.393C560.523 90.1914 578.747 70.7855 607.87 70.7855C639.998 70.7855 655.404 94.4422 647.138 124.937H579.123C581.002 142.31 590.96 152.66 607.118 152.66C619.143 152.66 628.349 146.746 631.919 137.135ZM607.306 85.7558C591.711 85.7558 581.941 94.9967 579.499 110.891H631.167C632.67 95.3663 624.028 85.7558 607.306 85.7558Z" stroke="#071D21" strokeWidth="2" fill="none" />
                    <path ref={el => pathsRef.current[7] = el} d="M711.899 70.7855C725.99 70.7855 734.821 81.5049 734.821 95.3663C734.821 101.281 733.13 107.01 730.876 111.815H712.463C715.281 107.38 716.408 103.129 716.408 99.2475C716.408 91.67 712.087 86.6799 705.323 86.6799C694.238 86.6799 686.723 100.172 686.723 120.502V165.597H669.249V73.1881H686.723V88.8977C691.983 77.4389 700.626 70.7855 711.899 70.7855Z" stroke="#071D21" strokeWidth="2" fill="none" />
                    <path ref={el => pathsRef.current[8] = el} d="M785.732 70.7855C812.036 70.7855 825 87.604 825 112.924V165.597H808.466V149.333C801.702 161.162 790.053 168 774.835 168C755.483 168 742.519 156.911 742.519 140.462C742.519 121.98 759.052 110.521 785.168 110.521C792.684 110.521 800.575 111.446 807.527 113.294V112.924C807.527 97.3993 802.078 86.1254 785.544 86.1254C772.768 86.1254 764.689 92.7789 767.507 104.977H749.282C744.21 85.0165 761.683 70.7855 785.732 70.7855ZM777.465 153.399C792.872 153.399 805.46 143.419 808.09 127.525C801.702 125.492 793.811 124.383 786.484 124.383C769.762 124.383 760.555 130.851 760.555 140.647C760.555 148.779 766.944 153.399 777.465 153.399Z" stroke="#071D21" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className='button-wrapper'>
                  <Button
                    text={"Start a Project"}
                    fontSize={"17px"}
                    lineHeight={"21px"}
                    fontWeight={"700"}
                    background={"#071D21"}
                    color={"#FFF"}
                    src={"/contact"}
                  />
                </div>
              </div>
              <div className='wrapper__bottom'>
                <div className='slider-container'>
                  <div className='slider-track'>
                    {[...Array(2)].map((_, index) => (
                      <div key={index} className='slider-content'>
                        <p>TechSfera © {new Date().getFullYear()} — All Rights Reserved.</p>
                        <img src='/images/static/star.svg' alt='Decorative star' className='star-icon' />
                        <p>TechSfera © {new Date().getFullYear()} — All Rights Reserved.</p>
                        <img src='/images/static/star.svg' alt='Decorative star' className='star-icon' />
                        <p>TechSfera © {new Date().getFullYear()} — All Rights Reserved.</p>
                        <img src='/images/static/star.svg' alt='Decorative star' className='star-icon' />
                        <p>TechSfera © {new Date().getFullYear()} — All Rights Reserved.</p>
                        <img src='/images/static/star.svg' alt='Decorative star' className='star-icon' />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </StyledComponent>
  )
};

const StyledComponent = styled.section`
  overflow: hidden;
  
  .wrapper {
    border-radius: 30px;
    background: #C9FD8C;
    overflow: hidden;
    margin-top:3px;
    
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 30px;
    }
    
    &__bottom {
      overflow: hidden;
      padding-bottom: 30px;
      
      .slider-container {
        width: 100%;
        overflow: hidden;
      }
      
      .slider-track {
        display: flex;
        animation: scroll 30s linear infinite;
        width: fit-content;
      }
      
      .slider-content {
        display: flex;
        align-items: center;
        gap: 20px;
        white-space: nowrap;
        padding-right: 20px;
        
        p {
          color: #071D21;
          font-family: "Bricolage Grotesque", sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 38px;
          text-transform: capitalize;
          margin: 0;
        }
        
        .star-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
      }
    }
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .col-md-8 {
    padding: 0 15px 0 3px;
  }
  
  .col-lg-9 {
    @media (max-width: 767px) {
      padding: 0 15px;
    }
  }
  
  @media (max-width: 767px) {
    .wrapper {
      &__top {
        // flex-direction: column;
        align-items: center;
        gap:20px;
        
        svg {
          width: 180px;
          height: 100px;
        }
      }
    }
  }
  
  @media (min-width: 768px) and (max-width: 991px) {
    .wrapper {
      &__top {
        svg {
          width: 300px;
          height: 85px;
        }
      }
    }
  }
`;

export default Footer;
