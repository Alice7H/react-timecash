import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import * as yup from 'yup';
import { useAuth } from "../context";
import "../styles/Register.css";

export default function ForgotPassword(props) {
    
    const { user, loading } = useAuth();

    const initialValue = { email: ''};

    const validationSchema = yup.object ({
        email: yup.string().email("Invalid email format").required("Email is required")
    });

    const handleLogin = () => {
        props.history.push("/login");
    }

    const onSubmit = value => {
        console.log('form data', value);
    }

    return(
        user && !loading ? <Redirect to="/user"/> :
        <Formik 
        initialValues={initialValue} 
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
           { formik => {
                return (
                    <Card>
                        <Card.Body className="text-center my-5 p-5">
                            <h2>Forgot Password</h2>
                            <p>Inform your email address: </p>
                            <Form onSubmit={formik.handleSubmit}>
                                <div className='form-control mb-4'>
                                    <label htmlFor='email'>E-mail</label>
                                    <Field type='text' id='email' name='email' />
                                    <ErrorMessage name='email'>
                                        {(errorMsg) => (
                                            <div className='error'>{errorMsg}</div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <button disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Submit</button>
                                <button className="button-link" onClick={handleLogin}>Login</button>
                            </Form>
                        </Card.Body>
                    </Card>
                )
           }}
        </Formik>
    )
}
