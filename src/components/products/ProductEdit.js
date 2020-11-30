import { useParams } from "react-router-dom";
import { useAuth } from "../../context";
import { Container, Col, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import TextError from "../TextError";
import "../../styles/Form.css";

export default function ProductEdit(props) {
    const { id, prodId } = useParams();
    const {user, updateProduct } = useAuth();

    const product = user.notes[id].products[prodId];
    
    const updateValues = {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
    };

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        description: yup.string().nullable(),
        price: yup.number().positive("Price is a positive number").required("Price is required"),
        quantity: yup.number().integer("Quantity is an integer number").required("Quantity is required"),
    })

    const onSubmit = (data) => {
        // console.log("Form data", data);
        data.id = id;
        data.prodId = prodId;
        updateProduct(data);
        props.history.push(`/service-edit/${id}`);
    }

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col sm>
                    <Formik
                        initialValues={updateValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(formik) => {
                            return (
                                <div className='text-center my-2'>
                                    <h1> Edit Product</h1>
                                    <Form
                                        onSubmit={
                                            formik.handleSubmit
                                        }
                                    >
                                        <div className="form-control">
                                            <label htmlFor="name">Name</label>
                                            <Field
                                                type='text'
                                                id='name'
                                                name='name'
                                            />
                                            <ErrorMessage
                                                name='name'
                                                component={TextError}
                                            />
                                        </div>

                                        <div className='form-control'>
                                            <label htmlFor='description'>
                                                Description
                                            </label>
                                            <Field
                                                type='text'
                                                id='description'
                                                name='description'
                                            />
                                            <ErrorMessage
                                                name='description'
                                                component={TextError}
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label htmlFor="price"> Price</label>
                                            <Field
                                                type='text'
                                                id='price'
                                                name='price'
                                            />
                                            <ErrorMessage
                                                name='price'
                                                component={TextError}
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label htmlFor="quantity">Quantity</label>
                                            <Field
                                                type='number'
                                                id='quantity'
                                                name='quantity'
                                            />
                                            <ErrorMessage
                                                name='quantity'
                                                component={TextError}
                                            />
                                        </div>
                                        <button
                                            type='submit'
                                            disabled={
                                                !(
                                                    formik.isValid &&
                                                    formik.dirty
                                                ) ||
                                                formik.isSubmitting
                                            }
                                        >
                                            Save Product
                                        </button>
                                    </Form>
                                </div>
                            );
                        }}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}