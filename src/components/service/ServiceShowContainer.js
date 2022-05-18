import { useState, useEffect } from 'react'
import ServiceShow from '../presentational/service/ServiceShow';

export default function ServiceShowContainer(props) {
    const [service, setService] = useState({});
    const [loading, setLoading] = useState("");
    const status = "done";

    useEffect(() => {
        function getServices() {
            setLoading(true);
            const res = props.location.state;
            if (res) {
                setService(res.service);
                setLoading(false);
            }
        }
        getServices();
    }, [props.location.state])

    return <ServiceShow service={service} status={status} loading={loading} />
}
