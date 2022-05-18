import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import CardBox from '../CardBox';
import InputGeneric from '../InputGeneric';
import { validationEmailProfile } from '../../../validations-schema/validations';

export default function UpdateProfile(props) {
    const { initialValues, error, onSubmit } = props;
    return (
        <CardBox minHeight="100vh" maxWidth="600px">
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationEmailProfile}
                        onSubmit={onSubmit}>
                        {({ isSubmitting, isValid, dirty, handleSubmit }) => {
                            return (
                                <div className='mx-4 my-4 text-center'>
                                    <h1 className="text-center mb-4">Update Profile</h1>

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Row>
                                            <InputGeneric type="email" value="email" label="Email" md="12" />
                                            <InputGeneric type="text" value="name" label="Name" md="12" placeholder="Leave blank to keep the same" />
                                            <InputGeneric type="password" value="password" label="Password" md="12" placeholder="Leave blank to keep the same" />
                                            <InputGeneric type="confirmPassword" value="confirmPassword" label="Password confirmation" md="12" placeholder="Leave blank to keep the same" />
                                        </Form.Row>

                                        <Button disabled={!(isValid && dirty) || isSubmitting} variant='outline-success'
                                            className="w-40 mr-5" type="submit"> Update</Button>
                                        <Link to="/">
                                            <Button className="w-40" variant='outline-primary'>Back to home</Button>
                                        </Link>
                                    </Form>
                                </div>
                            )
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </CardBox>
    )
}
