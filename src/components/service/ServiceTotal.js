import { useState, useEffect, useCallback } from 'react'
import { getProductsServices } from '../../contexts/Firestore';
import CardLoading from '../presentational/CardLoading';

export default function ServiceTotal({ id }) {
    const [totals, setTotal] = useState("");
    const [loading, setLoading] = useState("");

    const getTotals = useCallback(
        async () => {
            setLoading(true);
            const result = await getProductsServices(id);
            if (result.length !== 0) {
                setTotal(result[0]);
                setLoading(false);
            }
        },
        [id],
    )

    useEffect(() => {
        getTotals();
    }, [getTotals])

    return (
        loading === false
            ?
            <>
                <hr />
                <p>Total service: {totals.totalService}</p>
                <p>Total product: {totals.totalProduct}</p>
                <p><strong>Total: {totals.total}</strong></p>
            </>
            : <CardLoading />
    )
}
