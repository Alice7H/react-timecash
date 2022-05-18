import React from 'react'
import { Container } from 'react-bootstrap';

export default function CardBox(props) {
    const { minHeight, children, maxWidth } = props;

    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: minHeight }}>
            <div className="w-100" style={{ maxWidth: maxWidth }}>
                {children}
            </div>
        </Container>
    )
}
