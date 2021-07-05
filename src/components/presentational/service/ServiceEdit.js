import { Link } from "react-router-dom";
import { Container, Button, Form, Card } from "react-bootstrap";
import { Formik } from "formik";
import ServiceProdContainer from "../../service/ServiceProdContainer";
import InputDataPicker from '../InputDataPicker';
import InputGeneric from '../InputGeneric';
import CatchError from '../CatchError';
import CardBox from '../CardBox';
import ConfirmModal from "../ConfirmModal";
import { validationService } from "../../../validations-schema/validations";

export default function ServiceEdit(props) {

    const { error, initialValues, onSubmit, id, status } = props;
    const validationSchema = validationService(initialValues.startTime);

    return (
        <Container>
            <ServiceProdContainer id={id} status={status} />

            <CardBox minHeight="40vh" maxWidth="100%">
                <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Card.Body>

                        <CatchError error={error} />

                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                            {({ isSubmitting, isValid, dirty, handleSubmit }) => {
                                return (
                                    <div className='text-center my-2'>
                                        <h1> Edit Service</h1>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Row>
                                                <InputDataPicker value="startTime" label="Start time" md="6" disabled={true} />
                                                <InputDataPicker value="endTime" label="End time" md="6" disabled={false} />
                                            </Form.Row>

                                            <Form.Row>
                                                <InputGeneric value="name" type="text" label="Service name" md="6" />
                                                <InputGeneric value="serviceHour" type="number" label="Service price per hour" md="6" />
                                            </Form.Row>

                                            <Form.Row>
                                                <InputGeneric value="travelCost" type="number" label="Travel cost" md="6" />
                                                <InputGeneric value="otherCost" type="number" label="Other cost" md="6" />
                                            </Form.Row>

                                            {
                                                !(isValid && dirty) || isSubmitting
                                                    ? <Button variant='outline-success' className="mt-3 mr-3" disabled>Complete Service</Button>
                                                    : <ConfirmModal onSubmit={handleSubmit} />
                                            }
                                            <Link to='/'>
                                                <Button className="mt-3" variant='outline-primary'> Back to note list</Button>
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
