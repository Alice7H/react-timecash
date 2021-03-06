import React from 'react'
import {Container, Spinner} from 'react-bootstrap';

export default function CardLoading() {
    return (
        <Container className="d-flex justify-content-center mb-2"> 
            <Spinner animation="border" variant="primary"/>
        </Container>
    )
}
