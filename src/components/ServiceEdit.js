import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Form, Card } from "react-bootstrap";
import { Formik } from "formik";
import { getById, updateService, updateProdService } from "../contexts/Firestore";
import { validationService } from "../validations-schema/validations";
import ServiceProd from "./ServiceProd";
import CardLoading from "./CardLoading";
import InputDataPicker from './InputDataPicker';
import InputGeneric from './InputGeneric';
import CatchError from './CatchError';
import CardBox from './CardBox';

export default function ServiceEdit(props) {
    const { id } = useParams();
    const [service, setService] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getServiceById() {
            try {
                setError("");
                const res = await getById("services", id);
                if (res) {
                    setService(res);
                    setLoading(false);
                }
            } catch(error){
                setError("Failed to get service");
                console.log(error.message);
            }
        }

        getServiceById();

        return () => { getServiceById() };
    }, [id]);

    async function onSubmit(data) {
        try {
            setError("");
            const priceHour = await updateService(id, data);
            console.log(priceHour);
            await updateProdService(id, data, priceHour);
        } catch(error) {
            setError("Failed to update service");
            console.log(error.message);
        }
        props.history.push("/");
    }

    if (loading === true) {
        return <CardLoading />    
    } else {
        const updateValues = {
            startTime: new Date((service.startTime.seconds)*1000),
            endTime: service.endTime,
            name: service.name,
            serviceHour: service.serviceHour,
            travelCost: service.travelCost,
            otherCost: service.otherCost,
        };

        const validationSchema = validationService(updateValues.startTime);

        return (
            <Container>
                <p className='text-center'>
                    * You can't edit or add new products in this form
                    after clicked in complete service
                </p>

                <ServiceProd id={id} />
               
                <CardBox minHeight="40vh" maxWidth="100%">
                    <Card style={{marginTop: "20px", marginBottom: "20px"}}>
                        <Card.Body>

                            <CatchError error={error}/>

                            <Formik initialValues={updateValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                                {({ isSubmitting, isValid, dirty, handleSubmit }) => {
                                    return (
                                        <div className='text-center my-2'>
                                            <h1> Edit Service</h1>
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Row>
                                                    <InputDataPicker value="startTime" label="Start time" md="6" disabled={true}/>
                                                    <InputDataPicker value="endTime" label="End time" md="6" disabled={false}/>
                                                </Form.Row>

                                                <Form.Row>
                                                    <InputGeneric value="name" type="text" label="Service name" md="6"/>
                                                    <InputGeneric value="serviceHour" type="number" label="Service per hour" md="6"/>
                                                </Form.Row>

                                                <Form.Row>
                                                    <InputGeneric value="travelCost" type="number" label="Travel cost" md="6"/>
                                                    <InputGeneric value="otherCost" type="number" label="Other cost" md="6"/>
                                                </Form.Row>

                                                <Button
                                                    className='mr-2'
                                                    variant='outline-success'
                                                    type='submit'
                                                    disabled={
                                                        !(isValid && dirty) || isSubmitting
                                                    }
                                                >
                                                    Complete Service
                                                </Button>
                                                <Link to='/'>
                                                    <Button variant='outline-primary'>
                                                        {" "}
                                                        Back to note list
                                                    </Button>
                                                </Link>
                                            </Form>
                                        </div>
                                    );
                                }}
                            </Formik>
                        </Card.Body>
                    </Card>
                </CardBox>
            </Container>
        );
    }
}
