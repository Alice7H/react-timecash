import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getServicesByUser, createService } from "../services/Firestore";

import Home from "./presentational/Home";

export default function HomeContainer() {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState("")
    const [services, setServices] = useState([])
    const columnNames = ["Name", "Status", "Actions"]
    const [error, setError] = useState("")

    const getServices = useCallback(async () => {
        try {
            setLoading(true);
            const tempServices = await getServicesByUser(currentUser.uid)
            setServices(tempServices);
        } catch (error) {
            setError("Error to get services.");
            console.log(error.message);
        }
        setLoading(false);
    }, [currentUser.uid])

    useEffect(() => {
        getServices();
    }, [getServices])

    async function addService() {
        const docRef = await createService(currentUser.uid);
        if (docRef) {
            getServices();
        } else {
            setError("Error to create new service");
        }
    }

    return (
        <Home
            error={error}
            loading={loading}
            services={services}
            columnNames={columnNames}
            currentUser={currentUser}
            addService={addService} />
    )
}
