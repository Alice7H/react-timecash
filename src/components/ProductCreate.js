import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik } from "formik";
import { createProducts } from "../contexts/Firestore";
import { Button, Form, Card } from "react-bootstrap"; // Container
import { validationProduct } from "../validations-schema/validations";
import InputGeneric from "./InputGeneric";
import CatchError from "./CatchError";
import CardBox from "./CardBox";
export default function ProductCreate(props) {
    const { id } = useParams();
    const [error, setError] = useState("");

    const initialValues = {
        name: "",
        description: "",
        price: "",
        quantity: 1,
    };

    async function onSubmit(data) {
        try {
            await createProducts(id, data);
        } catch(error) {
            setError("Failed to create product.");
            console.log(error.message);
        }
        props.history.push(`/service-edit/${id}`);
    }

    return (
        <CardBox minHeight="100vh" maxWidth="500px">
           <Card style={{marginTop: "20px", marginBottom: "20px"}}>
               <Card.Body>
                <CatchError error={error} />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationProduct}
                        onSubmit={onSubmit}
                    >
                    {({isSubmitting, isValid, dirty, handleSubmit}) => {
                        return (
                            <div className='mx-4 my-4 text-center'>
                                <h1> New Product</h1>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <InputGeneric type="text" value="name" label="Name" md="12" />
                                        <InputGeneric type="text" value="description" label="Description"  md="12"/>       
                                        <InputGeneric type="text" value="price" label="Price"  md="12"/>                               
                                        <InputGeneric type="number" value="qunatity" label="Quantity"  md="12"/>
                                    </Form.Row>

                                    <Button  className="mr-3" variant='outline-success' type='submit' disabled={!(isValid && dirty) || isSubmitting }>
                                        Submit
                                    </Button>
                                    <Link to='/'>
                                        <Button variant='outline-primary'>
                                            Back to note list
                                        </Button>
                                    </Link>
                                </Form>
                            </div>
                        );
                    }}
                    </Formik>
               </Card.Body>
           </Card>
        </CardBox>
    );
}
