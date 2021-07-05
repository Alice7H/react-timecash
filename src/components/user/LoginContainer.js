import React, { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import Login from '../presentational/user/Login';

export default function LoginContainer() {
    const { login, currentUser } = useAuth();
    const [error, setError] = useState("");
    // const [loading, setLoading] = useState(false)

    const initialValues = {
        email: "",
        password: ""
    }

    async function onSubmit(data) {
        try {
            setError("");
            await login(data.email, data.password);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    }

    if (currentUser) { return <Redirect to="/" /> }

    return (
        <Login
            initialValues={initialValues}
            error={error}
            onSubmit={onSubmit}
        />
    )
}
