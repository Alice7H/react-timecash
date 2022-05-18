import React from 'react'
import ServiceTable from "./service/ServiceTable";
import CardBox from './CardBox';
import CardLoading from './CardLoading';
import CatchError from './CatchError';
import { Link } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap"

export default function Home(props) {

    const { error, columnNames, currentUser, loading, services, addService } = props;

    return (
        error ? <CatchError error={error} />
            :
            <main>
                <CardBox minHeight="55vh" maxWidth="500px">
                    <Card>
                        <Card.Body>
                            <h2 className="text-main text-center mb-4">Profile</h2>
                            <p>Name: <strong>{currentUser.displayName}</strong></p>
                            <p>Email: <strong>{currentUser.email}</strong></p>
                            <div className="w-100 d-flex justify-content-center">
                                <Link to="update-profile">
                                    <Button className="mt-3" variant="outline-primary">
                                        Update Profile
                                    </Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </CardBox>

                <Container className="d-flex justify-content-sm-end my-2">
                    <Button variant="outline-success" onClick={addService}> Add service</Button>
                </Container>

                {
                    loading === true
                        ? <CardLoading />
                        : services.length === 0
                            ? <div className="text-center mb-3">Service not found </div>
                            : <>
                                <h2 className="text-center mb-3"> Services</h2>
                                <ServiceTable services={services} colNames={columnNames} />
                            </>
                }
            </main>
    )
}
