import { Navbar, Nav, Alert } from "react-bootstrap";
import logo from '../../images/timecash_logo.svg';

export default function NavbarComponent(props) {
    const { error, currentUser, handleLogout } = props;
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Navbar.Brand href="/">
                    <img
                        alt="logo"
                        src={logo}
                        width="200"
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto mr-5">
                        {currentUser ?
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
        </header>
    );
}
