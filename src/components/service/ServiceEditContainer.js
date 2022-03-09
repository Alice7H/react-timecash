import { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import CardLoading from "../presentational/CardLoading";
import ServiceEdit from "../presentational/service/ServiceEdit";
import { convertToDate } from "../../utils/converter";
import { 
    calculatePriceHour, 
    calculateTotalService, 
    calculateTotalProd,
    calculateTotal
} from "../../utils/calculate";
import { 
    updateService, 
    createProdService, 
    getById, 
    getProductsByService 
} from "../../api/Firestore";

export default function ServiceEditContainer(props) {
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();
    const status = "in progress";
    const history = useHistory();

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
        const endTime = convertToDate(data.endTime);
        const priceHour = calculatePriceHour(endTime, data.startTime, data.serviceHour);
        const docRef = await updateService(service.id, data, endTime, priceHour);

        if (docRef) {
            const totalService = calculateTotalService(data.travelCost, data.otherCost, priceHour)  
            const prod = await getProductsByService(service.id);      
            const totalProduct = calculateTotalProd(prod);
            const total = calculateTotal(totalService, totalProduct);
            const docRefProduct = await createProdService(service.id, total, totalService, totalProduct);
              
            if(docRefProduct){
              props.history.push("/"); 
            }else{
              setError("Failed to update products from service"); 
            }
        } else {
            setError("Failed to update service");
        }
    }

    function handleShowProducts() {
        history.push({
            pathname: "/product-show",id, status
        });
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
            handleShowProducts={handleShowProducts}
        />
    }
}
