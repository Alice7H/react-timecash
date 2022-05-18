import { useState, useEffect, useCallback } from "react";
import { getProductsByService } from '../../services/Firestore';
import ProductShow from '../presentational/product/ProductShow';

export default function ProductShowContainer(props) {
    const id = props.location.id;
    const status = props.location.status;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const columnNames = ["Name", "Price", "Quantity", "Total"];
    const columnNames2 = ["Name", "Price", "Quantity", "Total", "Action"];

    const getProducts = useCallback(
        async () => {
            setLoading(true)
            const tempProducts = await getProductsByService(id);
            if (tempProducts) {
                setProducts(tempProducts);
                setLoading(false);
            }
        },
        [id],
    )

    useEffect(() => {
        getProducts();
    }, [getProducts])

    return status === 'in progress'
        ? <ProductShow id={id} columnNames={columnNames2} loading={loading} products={products} />
        : <ProductShow columnNames={columnNames} loading={loading} products={products} />
}

