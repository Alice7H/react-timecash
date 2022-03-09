import { useState, useEffect, useCallback } from "react";
import { getProductsByService } from '../../api/Firestore';
import ServiceProd from '../presentational/service/ServiceProd';

export default function ServiceProdContainer({ id, status }) {
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
        ? <ServiceProd id={id} columnNames={columnNames2} loading={loading} products={products} />
        : <ServiceProd columnNames={columnNames} loading={loading} products={products} />
}

