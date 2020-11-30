import Table from 'react-bootstrap/Table';
import NoteColumn from './NoteColumn';
import NoteItem from './NoteItem';
import { Container } from 'react-bootstrap';
import NoteEmpty from '../notes/NoteEmpty';

export default function Notes({notes, addNote}) {

    const handleAddService = () => {
        addNote();
        alert("Serviço adicionado com sucesso!");
    }

    return (
        <div className="text-center my-5">
            <Container className="text-right mb-3">
                <h3 className="text-center text-uppercase ">Notes</h3>
                <button onClick={handleAddService}>
                    <i className="fa fa-plus-square" aria-hidden="true" /> Add service
                </button>
            </Container>
            
            { notes ? (
                <Container className="p-1">
                    <Table striped bordered hover> 
                        <NoteColumn/>                    
                        { notes.map(note => {                                    
                            return <NoteItem key={note.id} note={note}/>
                        })}      
                    </Table>
                </Container>
                ) : <NoteEmpty/>
            }
        </div>                                           
    )
}


