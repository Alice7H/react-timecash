import { format } from "date-fns";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ServiceProdContainer from '../../service/ServiceProdContainer';
import ServiceTotal from '../../service/ServiceTotal';
import CardLoading from '../CardLoading';

export default function ServiceShow(props) {
    const { service, loading, status } = props;

    return (
        loading === false
            ?
            <div className="text-center my-5">
                <h1>{service.name}</h1>
                <ServiceProdContainer id={service.id} status={status} />
                <Container className="service-show-container">
                    <Row>
                        <Col sm className="mt-5">
                            <p>Initial time: {format(new Date(service.startTime.seconds * 1000), "dd/MM/yyyy HH:mm:ss")} </p>
                            <p>End time: {format(new Date(service.endTime.seconds * 1000), "dd/MM/yyyy HH:mm:ss")} </p>
                            <p>Price per hour: {service.serviceHour}</p>
                        </Col>
                        <Col sm>
                            <p>Service cost: {service.priceHour}</p>
                            <p>Travel cost: {service.travelCost}</p>
                            <p>Other cost: {service.otherCost}</p>

                            <ServiceTotal id={service.id} />
                        </Col>
                    </Row>
                    <div className="py-3">
                        <Link to="/">
                            <Button className="mt-3 mr-3" variant="outline-success" disabled> Share</Button>
                        </Link>
                        <Link to="/">
                            <Button className="mt-3" variant="outline-primary"> Back to note list</Button>
                        </Link>
                    </div>
                </Container>


            </div>
            : <CardLoading />
    )
}
