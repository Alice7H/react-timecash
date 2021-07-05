import React, { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

import ForgotPassword from '../presentational/user/ForgotPassword';

export default function ForgotPasswordContainer() {

    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    async function onSubmit(data) {
        try {
            setMessage("")
            setError("");
            await resetPassword(data.email);
            setMessage("Check your email adress for further instructions")
        } catch (err) {
            setError("Failed to reset password");
            console.log(err.message);
        }
    }

    return <ForgotPassword
        error={error}
        message={message}
        onSubmit={onSubmit}
    />
}
