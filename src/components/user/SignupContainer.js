import { useState } from 'react'
import { useAuth } from "../../contexts/AuthContext";
import Signup from '../presentational/user/Signup';

export default function SignupContainer(props) {

    const { signup } = useAuth()
    const [error, setError] = useState("")

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: ""
    }

    async function onSubmit(data) {
        try {
            setError("");
            const res = await signup(data.email, data.password);
            if (res) {
                props.history.push("/");
            }
        } catch {
            setError("Failed to create an account");
        }
    }

    return <Signup initialValues={initialValues} error={error} onSubmit={onSubmit} />
}
