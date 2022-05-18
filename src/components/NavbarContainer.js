import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import NavbarComponent from './presentational/Navbar';
import '../styles/Navbar.css';

export default function NavbarContainer() {
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
    <NavbarComponent error={error} currentUser={currentUser} handleLogout={handleLogout}/>
    
    )
}
