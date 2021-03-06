import '../styles/Navbar.css';
import {Navbar, Nav, Alert } from "react-bootstrap";
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';


export default function NavbarComponent(props) {
    
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth(); 

    async function handleLogout () {
        try {
            setError("");
            await logout();
            return <Redirect to='/login' />
        }catch(err) {
            setError("Failed -" + err.message);
        }
    }

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
                    />
                    TimeCash
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">  
                    <Nav className="ml-auto mr-5">
                        { currentUser ?  
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link> 
                            :
                            (<>
                                <Nav.Link href="/login" alt="login">Login</Nav.Link>
                                <Nav.Link href="/signup" alt="signup">Sign Up</Nav.Link>
                            </>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
             {error && <Alert variant="danger">{error}</Alert>}
        </>
    );
}
