import { useState } from "react";
import { useParams } from "react-router-dom";
import { createProducts } from "../../contexts/Firestore";
import ProductForm from "../presentational/product/ProductForm";

export default function ProductCreateContainer(props) {
    const { id } = useParams();
    const [error, setError] = useState("");

    const initialValues = {
        name: "",
        description: "",
        price: "",
        quantity: 1,
    };

    async function onSubmit(data) {
        const docRef = await createProducts(id, data);
        if (docRef !== null) {
            props.history.push(`/service-edit/${id}`);
        } else {
            setError('Error to create new product');
        }
    }

    return <ProductForm error={error} titleText="New Product" initialValues={initialValues} onSubmit={onSubmit} />
}
