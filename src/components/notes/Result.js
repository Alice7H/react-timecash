import { Col, Container, Row } from "react-bootstrap";
import { useParams, Link, Redirect } from "react-router-dom";
import ResultProduct from "./ResultProduct";
import { format } from "date-fns";
import { useAuth} from '../../context';

export default function Result() {
    const {id} = useParams();
    const {user} = useAuth();
    const note = user.notes[id];

    return (
        note !==  null ?
        ( <div className="text-center my-5">
            <h1>Result</h1>
            <ResultProduct products={note.products}/>
            <Container>
                <Row>
                    <Col sm>
                        <p>Initial time: {format(new Date(note.service.startTime), "dd/MM/yyyy HH:mm:ss")} </p>  
                        <p>End time: {format(new Date(note.service.endTime), "dd/MM/yyyy HH:mm:ss")} </p> 
                        <p>Price per hour: {note.service.serviceHour}</p>                  
                    </Col>                   
                    <Col sm>
                        <p>Product cost: {note.totalProducts}</p>
                        <p>Service price: {note.priceHour}</p>                    
                        <p>Travel cost: {note.service.travelCost}</p>
                        <p>Other cost: {note.service.otherCost}</p>
                        <hr/>
                        <p>Total: <strong>{note.total}</strong></p> 
                    </Col>
                </Row>
            </Container>                          
           <Link to={`/shared-service/${id}`}>
            <button> Shared</button>
           </Link>
            <Link to="/user">
                <button> Back to note list</button>
            </Link>
        </div>
        ): <Redirect to="/login"/>
    )
}
