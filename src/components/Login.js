import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import '../styles/Register.css';
import TextError from '../components/TextError';
import { Card } from 'react-bootstrap';
import { useAuth } from '../context';
import { Redirect } from 'react-router-dom';

export default function Login(props) {

    const { signup, user, loading } = useAuth();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(6, 'Minimum 6 characters').max(50, 'Maximum 50 charaters').required('Password is required'),
    });

    const onSubmit = async(values) => {
        localStorage.setItem("userEmail", values.email);
        localStorage.setItem("userPassword", values.password);
        await signup();
        props.history.push('/user');
    }

    // const handleForgotPass = () => {
    //     props.history.push('/forgot-password');
    // }

    // const handleSignup = () => {
    //     props.history.push('/signup');
    // }

    return (
        user && !loading ? <Redirect to="/user"/> :
        <Formik  
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (
                    <Card >     
                        <Card.Body className="text-center my-5 p-5">
                            <h1>Login</h1>
                            <Form onSubmit={formik.handleSubmit}>
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
                                <div>
                                    <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Submit</button>
                                </div>
                                {/* <div>
                                    <button className="button-link" onClick={handleForgotPass}>Forgot Password</button>
                                    <button className="button-link" onClick={handleSignup}>Sign Up</button>
                                </div> */}
                            </Form>
                        </Card.Body>
                    </Card>
                )
            }}
        </Formik>
    )
}
