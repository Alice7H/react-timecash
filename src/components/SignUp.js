import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import '../styles/Register.css';
import TextError from './TextError';
import { Card } from 'react-bootstrap';
import { useAuth } from '../context';
import { Redirect } from 'react-router-dom';

export default function SignUp(props) {

    const { user, register, loading } = useAuth();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = yup.object({
        name: yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(6, 'Minimum 6 characters').max(50, 'Maximum 50 charaters').required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Password must match').required('Required'),
    });

    const onSubmit = (values) => {
        // console.log('Form data: ', values);
        
        localStorage.setItem("userEmail", values.email);
        localStorage.setItem("userPassword", values.password);
        register(values);
        props.history.push("/user");
    }

    const handleLogin = () => {
        props.history.push("/login");
    }

    return (
        user && !loading ? <Redirect to="/user"/> :
        <Formik  
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (
                    <Card>     
                        <Card.Body className="text-center my-3 p-3">
                            <h1>Sign Up</h1>
                            <Form onSubmit={formik.handleSubmit}>
                                <div className="form-control">
                                    <label htmlFor="name">Name</label>
                                    <Field type='text' id='name' name='name' />
                                    <ErrorMessage name='name' component={TextError} />                          
                                </div>
                            
                                <div className='form-control'>
                                    <label htmlFor='email'>E-mail</label>
                                    <Field type='text' id='email' name='email' />
                                    <ErrorMessage name='email'>
                                        {(errorMsg) => (
                                            <div className='error'>{errorMsg}</div>
                                        )}
                                    </ErrorMessage>
                                </div>

                                <div className="form-control">
                                    <label htmlFor="password">Password</label>
                                    <Field type='password' id='password' name='password' />
                                    <ErrorMessage name='password' component={TextError} />  
                                </div>
                                <div className="form-control">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field type='password' id='confirmPassword' name='confirmPassword' />
                                    <ErrorMessage name='confirmPassword' component={TextError} /> 
                            </div>
                                <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Submit</button>
                                <button className="button-link" onClick={handleLogin}>Login</button>
                            </Form>
                        </Card.Body>
                    </Card>
                )
            }}
        </Formik>
    )
}