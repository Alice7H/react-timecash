import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { getById, updateProducts } from '../../services/Firestore';
import CardLoading from "../presentational/CardLoading";
import ProductForm from '../presentational/product/ProductForm';
import { calculateProduct } from "../../utils/calculate";

export default function ProductEditContainer(props) {
    const [product, setProduct] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const getProduct = useCallback(
        async () => {
            const res = await getById('products', props.location.state);
            if (res) {
                setProduct(res);
                setLoading(false);
            } else {
                setError("Failed to get product");
            }
        }, [props.location.state],
    )

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    async function onSubmit(data) {
        const total = calculateProduct(data.quantity, data.price);
        const docRef = await updateProducts(product.id, data, total);
        if (docRef) {
            props.history.push(`/service-edit/${id}`);
        } else {
            setError('Error to edit product');
        }
    }

    if (loading === true) {
        return <CardLoading />
    } else {

        const updateValues = {
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity
        };

        return <ProductForm error={error} titleText="Edit Product" initialValues={updateValues} onSubmit={onSubmit} />
    }
}
