import React from 'react'
import { Container, Table } from 'react-bootstrap'
import ServiceItems from './ServiceItems'
import ColumnComponent from '../utils/ColumnComponent'

export default function ServiceTable({services, colNames}) {
    // console.log(services);
    return (
        !services ? <p> Don't have services</p>
        :
        <Container className="p-1">
            <Table striped bordered hover responsive> 
                <ColumnComponent colNames={colNames} />    
                { services.map((service, index) => {                                    
                    return <ServiceItems key={index} service={service}/>
                })}  
            </Table>
        </Container>
    )
}
