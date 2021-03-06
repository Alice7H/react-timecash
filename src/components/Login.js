import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Link, Redirect } from "react-router-dom"; 
import { Formik } from "formik";
import { validationLogin } from "../validations-schema/validations";
import CardBox from './CardBox';
import CatchError from './CatchError';
import InputGeneric from './InputGeneric';

export default function Login(props) {

    const {login, currentUser } = useAuth()
    const [error, setError] = useState("")
    // const [loading, setLoading] = useState(false)

    const initialValues = {
        email: "",
        password: ""
    }

    async function onSubmit(data) {
        try {
            setError("");
            // setLoading(true);
            await login(data.email, data.password);
            props.history.push("/");
        }catch(error) {
            setError("Failed to log in");
            console.log(error.message);
        }
        // setLoading(false);
    }

    if(currentUser) { return <Redirect to="/"/>  } 

    return (
        <CardBox minHeight="100vh" maxWidth="400px">
            <Card>
                <Card.Body>
                    <CatchError error={error} />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationLogin}
                        onSubmit={onSubmit}
                    >
                    {({isSubmitting, isValid, dirty, handleSubmit}) => {
                        return (
                            <div className='mx-4 my-4 text-center'>
                                <h1 className="text-center mb-4">Log In</h1>
                                
                                <Form onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <InputGeneric type="email" value="email" label="Email" md="12" />
                                        <InputGeneric type="password" value="password" label="Password" md="12" />
                                    </Form.Row>               
                                    <Button disabled={!(isValid && dirty) || isSubmitting } className="w-100" variant='outline-primary' type='submit'>
                                        Log In
                                    </Button> 
                                </Form>
                            </div>
                        )
                    }}
                    </Formik>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </CardBox>
    )
}
