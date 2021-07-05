import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { updateService, updateProdService, getById } from "../../contexts/Firestore";
import CardLoading from "../presentational/CardLoading";
import ServiceEdit from "../presentational/service/ServiceEdit";

export default function ServiceEditContainer(props) {
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();
    const status = "in progress";

    const getServiceById = useCallback(
        async () => {
            setError("");
            const res = await getById("services", id);
            if (res) {
                setService(res);
                setLoading(false);
            } else {
                setError("Failed to get service");
            }
        }, [id],
    )

    useEffect(() => {
        getServiceById();
    }, [getServiceById]);

    async function onSubmit(data) {
        setError("");
        const priceHour = await updateService(service.id, data);
        if (priceHour !== 0) {
            const result = await updateProdService(service.id, data, priceHour);
            if (result !== null) {
                props.history.push("/");
            } else {
                setError("Failed to update products_services");
            }
        } else {
            setError("Failed to update service");
        }
    }

    if (loading === true) {
        return <CardLoading />
    } else {
        const updateValues = {
            startTime: new Date((service.startTime.seconds) * 1000),
            endTime: service.endTime,
            name: service.name,
            serviceHour: service.serviceHour,
            travelCost: service.travelCost,
            otherCost: service.otherCost,
        };

        return <ServiceEdit
            error={error}
            onSubmit={onSubmit}
            initialValues={updateValues}
            id={id}
            status={status}
        />
    }
}
