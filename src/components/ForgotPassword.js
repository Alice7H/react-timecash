import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; 
import CardBox from "./CardBox";
import InputGeneric from './InputGeneric';
import { validationForgotPass } from '../validations-schema/validations';

export default function ForgotPassword() {

    const { resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    async function onSubmit(data) {
        try {
            setMessage("")
            setError("");
            await resetPassword(data.email);
            setMessage("Check your email adress for further instructions")
        }catch(err) {
            setError("Failed to reset password");
            console.log(err.message);
        }
    }

    return (
        <CardBox minHeight="100vh" maxWidth="400px">
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    
                    <Formik initialValues={{email: ""}} validationSchema={validationForgotPass} onSubmit={onSubmit}>
                     {({isSubmitting, isValid, dirty, handleSubmit})=> {
                         return(
                            <div className="mx-4 my-4 text-center">
                                <h2 className="text-center mb-4">Password Reset</h2>
                                <Form onSubmit={handleSubmit}>
            
                                    <Form.Row>
                                    <InputGeneric value="email" label="Email" type="email" md="12"/>
                                    </Form.Row>
                                        
                                    <Button disabled={!(isValid && dirty) || isSubmitting } className="w-100" variant='outline-primary' type="submit">
                                        Reset Password
                                    </Button> 
                                </Form>
                            </div>
                         )
                     }}
                    </Formik>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>

                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </CardBox>
    )
}
