import { Link } from "react-router-dom";

export default function ServiceItems({ service }) {

    return (
        <tbody>
            <tr className="text-center">
                <td>{service.name}</td>
                <td>{service.status}</td>
                <td>
                    {
                        service.status === "in progress" ?
                            <>
                                <Link to={{ pathname: `/service-edit/${service.id}`, state: { service } }} title="Edit service">
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </Link>
                                {/* <Link to={`/product-create/${service.id}`} title='Add product'>
                                    <i className='fa fa-cubes' aria-hidden='true' />
                                </Link> */}
                            </>
                            :
                            <Link to={{ pathname: `/service-show`, state: { service } }} title="See service done">
                                <i className="fa fa-file-text" aria-hidden="true" />
                            </Link>
                    }
                </td>
            </tr>
        </tbody>
    )
}
