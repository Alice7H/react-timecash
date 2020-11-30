import {Link, useParams } from "react-router-dom";

export default function ProductItem({product, isResult}) {
    const {id} = useParams();
   // console.log('item', product);
    return (
        // <div className="col-md-auto text-center mx-1"> 
        //     <div className="p-2">
        //         <p>{product.id} - {product.name} </p>
        //         <p>Price: {product.price} - Quantity: {product.quantity} </p>
        //         <p>Total: {product.total} </p>
        //     </div>
        //     <hr/>
        // </div>
        <tbody>
                <tr className="text-center">
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.total}</td>
                {   isResult ? null : 
                    <td>
                        <Link to={`/product-edit/${id}/${product.id}`}> 
                            <i className="fa fa-pencil" aria-hidden="true" />
                        </Link>
                    </td>
                }
            
            </tr>
        </tbody>
    )
}
