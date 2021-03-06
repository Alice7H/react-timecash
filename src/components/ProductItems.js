export default function ProductItems({product}) {
 
    return (
        <tbody>
            <tr className="text-center">
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.total}</td>
            </tr>
        </tbody>
    )
}
