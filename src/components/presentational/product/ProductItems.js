import { Link } from 'react-router-dom';

export default function ProductItems({ product, serviceId }) {

    return (
        <tbody>
            <tr className="text-center">
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.total}</td>
                {serviceId
                    ? <td>
                        <Link to={{ pathname: `/product-edit/${serviceId}`, state: product.id }} title='Edit product'>
                            <i className='fa fa-cubes' aria-hidden='true' />
                        </Link>
                    </td>
                    :
                    null
                }
            </tr>
        </tbody>
    )
}
