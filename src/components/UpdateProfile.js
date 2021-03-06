import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import CardBox from './CardBox';
import InputGeneric from './InputGeneric';
import { validationEmailProfile } from '../validations-schema/validations';

export default function UpdateProfile() {

    const {currentUser, updateEmail, updatePassword, updateDisplayName } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory();

    const initialValues = {
        name: "",
        email: currentUser ? currentUser.email : "",
        password: "",
        confirmPassword: ""
    }

    function onSubmit(data) {
        const promises = [];
        setError("");

        if(data.email !== currentUser.email) {
            promises.push(updateEmail(data.email));
        }

        if(data.password) {
            promises.push(updatePassword(data.password));
        }

        if(data.name) {
            promises.push(updateDisplayName(data.name));
        }

        Promise.all(promises).then(() => {
            history.push("/");
        }).catch(()=> {
            setError("Failed to update account");
        }).finally(()=> {
            console.log('Updated profile');
        })
    }

    return (
        <CardBox minHeight="100vh" maxWidth="600px">
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Formik    
                        initialValues={initialValues}
                        validationSchema={validationEmailProfile}
                        onSubmit={onSubmit}>
                    {({isSubmitting, isValid, dirty, handleSubmit})=>{
                        return (
                            <div className='mx-4 my-4 text-center'>
                                <h1 className="text-center mb-4">Update Profile</h1>
                               
                                <Form onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <InputGeneric type="email" value="email" label="Email" md="12" />
                                        <InputGeneric type="text" value="name" label="Name" md="12" placeholder="Leave blank to keep the same"/>
                                        <InputGeneric type="password" value="password" label="Password" md="12" placeholder="Leave blank to keep the same"/>
                                        <InputGeneric type="confirmPassword" value="confirmPassword" label="Password confirmation" md="12" placeholder="Leave blank to keep the same"/>
                                    </Form.Row>                            
                                    
                                    <Button disabled={ !(isValid && dirty) || isSubmitting } variant='outline-success' 
                                    className="w-40 mr-5" type="submit"> Update</Button> 
                                    <Button href="/" className="w-40" variant='outline-primary'>Cancel</Button>
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
