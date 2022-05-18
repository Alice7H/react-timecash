import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import CardBox from '../CardBox';
import InputGeneric from '../InputGeneric';
import { validationProfile } from '../../../validations-schema/validations';

export default function Signup(props) {
    const { initialValues, error, onSubmit } = props;

    return (
        <CardBox minHeight="100vh" maxWidth="400px">
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationProfile}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, isValid, dirty, handleSubmit }) => {
                            return (
                                <div className="mx-4 my-4 text-center">
                                    <h1 className="text-center mb-4">Sign Up</h1>

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Row>
                                            <InputGeneric value="email" label="Email" type="email" md="12" />
                                            <InputGeneric value="password" label="Password" type="password" md="12" />
                                            <InputGeneric value="confirmPassword" label="Password confirmation" type="password" md="12" />
                                        </Form.Row>
                                        <Button disabled={!(isValid && dirty) || isSubmitting} className="w-100" variant='outline-primary' type="submit">
                                            Sign Up
                                        </Button>
                                    </Form>
                                </div>
                            )
                        }}
                    </Formik>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login" className="link-dif">Login In</Link>
            </div>
        </CardBox>
    )
}
