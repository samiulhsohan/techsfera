import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'

const MyComponent = () => {
    return (
        <StyledComponent>

            <Container>
                <Row>
                    <Col>
                        <h1>Text</h1>
                    </Col>
                </Row>
            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
h1{
  color:black;
}
`;

export default MyComponent;
