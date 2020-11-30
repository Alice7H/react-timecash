import { useAuth } from "../../context";
import Container from "react-bootstrap/Container";
import Notes from '../notes/Notes';

export default function User() {
    const { user, addNote } = useAuth();
    console.log(user);
    return (
        <Container className="w-100 text-center my-5 p-2">
            <h2> Welcome <strong>{user.name}</strong></h2>
            <p>Email: {user.email}</p>
            <Notes notes={user.notes} addNote={addNote}/>
        </Container>
    )
}
