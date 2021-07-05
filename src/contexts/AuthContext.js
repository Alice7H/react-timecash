import React, { useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import CardLoading from "../components/presentational/CardLoading";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // const [credential, setCredential] = useState("")

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
        // .then(res => {
        //     // setCredential(res)
        //     console.log("successful");
        // }).catch(error => {
        //     console.log("Error", error.code + " " + error.message)
        //     return error; 
        // });
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
        return currentUser.updateProfile({ displayName: name });
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
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

    if (loading) {
        return <CardLoading />
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
