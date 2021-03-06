import React from 'react'
import { Row, Col, Alert } from "react-bootstrap";

export default function CatchError({error}) {
    return (
        <Row>
            <Col sm>
                {error && <Alert variant='danger'>{error}</Alert>}
            </Col>
        </Row>
    )
}
