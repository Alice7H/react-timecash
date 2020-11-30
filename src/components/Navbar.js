import {Navbar, Nav } from "react-bootstrap";
import '../styles/Navbar.css';
import { useAuth } from "../context";

export default function NavbarComponent() {

    const {logout, user} = useAuth();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    TimeCash
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">  
                    <Nav className="ml-auto mr-5">
                        { user ?  
                            <Nav.Link onClick={logout}>Logout</Nav.Link> 
                            :
                            (<>
                                <Nav.Link href="/login" alt="login">Login</Nav.Link>
                                {/* <Nav.Link href="/signup" alt="signup">Sign Up</Nav.Link> */}
                            </>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
