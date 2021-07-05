import React, { useState } from 'react'
import UpdateProfile from '../presentational/user/UpdateProfile';
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from 'react-router-dom';

export default function UpdateProfileContainer() {
    const { currentUser, updateEmail, updatePassword, updateDisplayName } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

    const initialValues = {
        name: "",
        email: currentUser ? currentUser.email : "",
        password: "",
        confirmPassword: ""
    }

    function onSubmit(data) {
        const promises = [];
        setError("");

        if (data.email !== currentUser.email) {
            promises.push(updateEmail(data.email));
        }

        if (data.password) {
            promises.push(updatePassword(data.password));
        }

        if (data.name) {
            promises.push(updateDisplayName(data.name));
        }

        Promise.all(promises).then(() => {
            history.push("/");
        }).catch(() => {
            setError("Failed to update account");
        }).finally(() => {
            console.log('Updated profile');
        })
    }

    return (
        <UpdateProfile error={error} onSubmit={onSubmit} initialValues={initialValues} />
    );
}
