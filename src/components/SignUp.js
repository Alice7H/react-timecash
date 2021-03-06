import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAuth } from "../contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import CardBox from './CardBox';
import InputGeneric from './InputGeneric';
import { validationProfile } from '../validations-schema/validations';

export default function Signup(props) {
    const {signup } = useAuth()
    const [error, setError] = useState("")

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    async function onSubmit(data) {
        try {
            setError("");
            await signup(data.name, data.email, data.password);
            props.history.push("/");
        }catch{
            setError("Failed to create an account");
        }
    }

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
                     {({isSubmitting, isValid, dirty, handleSubmit})=> {
                        return (
                            <div className="mx-4 my-4 text-center">
                                <h1 className="text-center mb-4">Sign Up</h1>
                                
                                <Form onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <InputGeneric value="name" label="Name" type="text" md="12" />
                                        <InputGeneric value="email" label="Email" type="email" md="12" />
                                        <InputGeneric value="password" label="Password" type="password" md="12"/>
                                        <InputGeneric value="confirmPassword" label="Password confirmation" type="password" md="12"/>
                                    </Form.Row>
                                    <Button disabled={ !(isValid && dirty) || isSubmitting} className="w-100"  variant='outline-primary' type="submit">
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
                Already have an account? <Link to="/login">Login In</Link> 
            </div>
        </CardBox>
    )
}
