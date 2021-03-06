import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import CardLoading from "../components/CardLoading";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    // const [credential, setCredential] = useState("")

    function signup(name, email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
            updateDisplayName(name);
            // setCredential(res)
            console.log("Update successful");
        }).catch(error => {
            console.log("Error", error.code + " " + error.message)
        });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    async function logout() {
        return await auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    // function reauthenticate() {
    //     currentUser.reauthenticateWithCredential(credential).then(() => {
    //         console.log("user re-authenticated")
    //     }).catch((error) => {
    //         console.log("Error happened on re-authentication");
    //     });
    // }

    function updateDisplayName(name) {
        return  currentUser.updateProfile({displayName: name });
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);   
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setLoading(false);
            setCurrentUser(user);
        })
      
        return () => { unsubscribe() };
        
    }, [currentUser])

     
    const value = { 
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateDisplayName,
    }

    if(loading) {
        return <CardLoading />
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
