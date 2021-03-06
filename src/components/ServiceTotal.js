import { useState, useEffect } from 'react'
import { getProductsServices } from '../contexts/Firestore';
import CardLoading from './CardLoading';

export default function ServiceTotal({id}) {
    const [totals, setTotal] = useState("");
    const [loading, setLoading] = useState("");

    useEffect(() => {
        async function getTotals() {
            setLoading(true)
            const res = await getProductsServices(id)  
            if(res) {
                setTotal(res[0])
                setLoading(false)
            }
        }
        getTotals();

        return () => { getTotals() }
    }, [id])

    return (
        loading === false
        ?
        <>
            <hr/>
            <p>Total service: {totals.totalService}</p>
            <p>Total product: {totals.totalProduct}</p> 
            <p>Total: <strong>{totals.total}</strong></p> 
        </>
        :  <CardLoading />
    )
}
