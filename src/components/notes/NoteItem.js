import { Link } from 'react-router-dom';

export default function NoteItem({note}) {

    return (
        <tbody>
            <tr className="text-center">
            <td>{note.id}</td>
            <td>{note.service.name}</td>
            <td>{note.status}</td>
            <td>
                {
                    note.status === "in progress" ?  
                    (<Link to={`/service-edit/${note.id}`}>
                        <i className="fa fa-pencil" aria-hidden="true" />
                    </Link>)
                    : 
                    (<Link to={`/note-result/${note.id}`}>  
                        <i className="fa fa-file-text" aria-hidden="true" />
                    </Link>)
                }
            </td>
            </tr>
        </tbody>
    )
}
