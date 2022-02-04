import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ServiceProdContainer from '../../service/ServiceProdContainer';
import ServiceTotal from '../../service/ServiceTotal';
import CardLoading from '../CardLoading';
import { convertSecondsToDateTime } from "../../../utils/converter";

export default function ServiceShow(props) {
    const { service, loading, status } = props;

    return (
        loading === false
            ?
            <main className="d-flex justify-content-center text-center w-100">
                <div className="center bg-light p-3 m-5 rounded">
                    <h1 className="text-main">{service.name}</h1>
                    <ServiceProdContainer id={service.id} status={status} />
                    <Container className="service-show-container">
                        <Row>
                            <Col sm className="mt-5">
                                <p>Initial time: {convertSecondsToDateTime(service.startTime.seconds)} </p>
                                <p>End time: {convertSecondsToDateTime(service.endTime.seconds)} </p>
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
                                <Button className="mt-3" variant="outline-primary">Back to home</Button>
                            </Link>
                        </div>
                    </Container>
                </div>
            </main>
            : <CardLoading />
    )
}
