import { Formik, Form, ErrorMessage, Field } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../../context";
import TextError from "../TextError";

export default function Product(props) {
    const { id } = useParams(); 
    const { addProduct } = useAuth();

    const initialValues = {
        name: "",
        description: "",
        price: "",
        quantity: 1,
    };

    const validationSchema = yup.object({
        name: yup
            .string()
            .min(3, "Minimum is 3 characters")
            .max(50, "Maximum is 50 characters")
            .required("Name is required"),
        description: yup.string().nullable(),
        price: yup
            .number()
            .min(0, "Minimum 0")
            .positive("Price is a positive number")
            .required("Price is required"),
        quantity: yup
            .number()
            .min(0, "Minimum 0")
            .integer("Quantity is an integer number")
            .required("Quantity is required"),
    });


    const onSubmit = (data) => {
        console.log("form data", data);
        data.id = id;
        addProduct(data);
        props.history.push(`/service-edit/${id}`);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
        {(formik) => {
            return (
                <div className='my-5 text-center'>
                    <h1> Product</h1>
                    <Form onSubmit={formik.handleSubmit}>
                        <div className='form-control'>
                            <label htmlFor='name'>Name</label>
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

                        <div className='form-control'>
                            <label htmlFor='price'>Price</label>
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

                        <div className='form-control'>
                            <label htmlFor='quantity'>
                                Quantity
                            </label>
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

                        <button type='submit' 
                        disabled={
                            !(
                                formik.isValid &&
                                formik.dirty
                            ) ||
                            formik.isSubmitting
                        }>Submit</button>
                    </Form>
                </div>
            );
        }}
        </Formik>
    );
}