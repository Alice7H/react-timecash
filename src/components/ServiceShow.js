import React, { useState, useEffect } from 'react'
import { format } from "date-fns";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getById} from '../contexts/Firestore';
import ServiceProd from './ServiceProd';
import ServiceTotal from './ServiceTotal';
import CardLoading from './CardLoading';

export default function ServiceShow() {
    const {id} = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        async function getServices() {
            setLoading(true);
            try {
                const res = await getById("services", id) 
                if(res) {
                    setService(res);
                    setLoading(false);
                }
            }catch(error) {
                console.log("error to get service", error);
            }
        }
        getServices();

        return () => { getServices() }
    }, [id])

    return(
        loading === false
        ?
        <div className="text-center my-5">
            <h1>{service.name}</h1>
            <ServiceProd id={id} />
            <Container>
                <Row>
                    <Col sm>
                        <p>Initial time: {format(new Date(service.startTime.seconds * 1000), "dd/MM/yyyy HH:mm:ss")} </p>  
                        <p>End time: {format(new Date(service.endTime.seconds * 1000), "dd/MM/yyyy HH:mm:ss")} </p>               
                        <p>Price per hour: {service.serviceHour}</p>                  
                    </Col>                   
                    <Col sm>
                        <p>Service cost: {service.priceHour}</p>
                        <p>Travel cost: {service.travelCost}</p>
                        <p>Other cost: {service.otherCost}</p>
                        
                        <ServiceTotal id={id}/>
                    </Col>
                </Row>
            </Container>   
                {/* `/service-shared/${id}`  */}
            <Link to={"/"} className="mr-2">
                <Button variant="warning" disabled> Shared</Button>
            </Link>
            <Link to="/">
                <Button variant="primary"> Back to service list</Button>
            </Link>
        </div>
        : <CardLoading />
    ) 
}
