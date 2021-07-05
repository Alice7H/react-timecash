import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form, Card } from "react-bootstrap";
import { validationProduct } from "../../../validations-schema/validations";
import InputGeneric from "../InputGeneric";
import CatchError from "../CatchError";
import CardBox from "../CardBox";

export default function ProductForm(props) {
    const { error, initialValues, onSubmit, titleText } = props;

    return (
        <CardBox minHeight="100vh" maxWidth="500px">
            <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Card.Body>
                    <CatchError error={error} />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationProduct}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, isValid, dirty, handleSubmit }) => {
                            return (
                                <div className='mx-4 my-4 text-center'>
                                    <h1>{titleText}</h1>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Row>
                                            <InputGeneric type="text" value="name" label="Name" md="12" />
                                            <InputGeneric type="text" value="description" label="Description" md="12" />
                                            <InputGeneric type="text" value="price" label="Price" md="12" />
                                            <InputGeneric type="number" value="quantity" label="Quantity" md="12" />
                                        </Form.Row>

                                        <Button className="mt-3 mr-3" variant='outline-success' type='submit' disabled={!(isValid && dirty) || isSubmitting}>
                                            Submit
                                        </Button>
                                        <Link to='/'>
                                            <Button className="mt-3" variant='outline-primary'>Back to note list</Button>
                                        </Link>
                                    </Form>
                                </div>
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </CardBox>
    );
}
