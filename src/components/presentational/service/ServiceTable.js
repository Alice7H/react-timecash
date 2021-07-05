import React from 'react'
import { Container, Table } from 'react-bootstrap'
import ServiceItems from './ServiceItems'
import Column from '../Column'

export default function ServiceTable({ services, colNames }) {

    return (
        !services ? <p> Don't have services</p>
            :
            <Container className="p-1">
                <Table striped bordered hover responsive>
                    <Column colNames={colNames} />
                    {services.map((service, index) => {
                        return <ServiceItems key={index} service={service} />
                    })}
                </Table>
            </Container>
    )
}
