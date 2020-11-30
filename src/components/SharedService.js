import { Row, Container, Form, Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "../styles/Register.css";
import { format } from "date-fns";
import { useAuth } from "../context";
import { useParams } from "react-router-dom";

export default function SharedService() {
    const { user } = useAuth();
    const { id } = useParams();
    const note = user.notes[id];
    const initialValues = {
        from: "",
        to: "",
    };

    const validationSchema = yup.object({
        from: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        to: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
    });

    const onSubmit = async (values) => {
        alert(values + note);

        let body = `
        <p>Initial time: ${format(new Date(note.service.startTime), "dd/MM/yyyy HH:mm:ss")} </p>  
        <p>End time: ${format(new Date(note.service.endTime), "dd/MM/yyyy HH:mm:ss")} </p> 
        <p>Price per hour: ${note.service.serviceHour}</p>
        <p>Product cost: ${note.totalProducts}</p>
        <p>Service price: ${note.priceHour}</p>                    
        <p>Travel cost: ${note.service.travelCost}</p>
        <p>Other cost: ${note.service.otherCost}</p>
        <h1>Total: ${note.total}</h1>
        `;

        console.log(body);
     };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <Container>
                        <Row>
                            <Col sm>
                            <h1 className='text-center'>Share Service</h1>
                            <Form onSubmit={formik.handleSubmit}>
                                <div className='form-control'>
                                    <label htmlFor='from'>From </label>
                                    <Field type='email' id='from' name='from' />
                                    <ErrorMessage name='from'>
                                        {(errorMsg) => (
                                            <div className='error'>
                                                {errorMsg}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='to'>To </label>
                                    <Field type='email' id='to' name='to' />
                                    <ErrorMessage name='to'>
                                        {(errorMsg) => (
                                            <div className='error'>
                                                {errorMsg}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="form-control">
                                    <label>Message</label>
                                    <p> all informations about notes without products</p>
                                </div>

                                <div className="text-center my-2">
                                    <button
                                        type='submit'
                                        disabled={
                                            !(formik.isValid && formik.dirty) ||
                                            formik.isSubmitting
                                        }
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                            </Col>
                        </Row>
                    </Container>
                );
            }}
        </Formik>
    );
}
