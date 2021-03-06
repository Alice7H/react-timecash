import { Button, Card, Container } from "react-bootstrap"
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getServicesByUser, createService } from "../contexts/Firestore";
import ServiceTable from "./ServiceTable";
import CardBox from './CardBox';
import CardLoading from './CardLoading';
import CatchError from './CatchError';

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState("")
    const [services, setServices] = useState([])
    const columnNames = ["#", "Name", "Status", "Actions"]
    const [error, setError] = useState("")

    const getServices = useCallback(
        async () => {
           try{
                setLoading(true);
                const res = await getServicesByUser(currentUser.uid)
                if(res) {
                    setServices(res);
                    setLoading(false);
                }
           }catch(error){
                setError("Error to get services.");
                console.log(error.message);
           }
        },[currentUser.uid],
    )

    useEffect(() => {
        getServices();
        return () => { getServices(); }
    }, [getServices])

    function addService() {
        createService(currentUser.uid);
        getServices();
    }

    return (
        error ?<CatchError error={error} />
        :
        <>  
            <CardBox minHeight="55vh" maxWidth="500px">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2>
                        <p>Name: <strong>{currentUser.displayName}</strong></p>
                        <p>Email: <strong>{currentUser.email}</strong></p>
                        <Link to="update-profile" className="btn btn-outline-primary w-100 mt-3">
                            Update Profile
                        </Link>
                    </Card.Body>
                </Card>  
            </CardBox>

            <Container className="d-flex justify-content-sm-end">
                <Button variant="primary" onClick={addService}> Add service</Button>
            </Container>

            <h4 className="text-center mb-3"> Services</h4>  
            {
                loading === false
                ?  <ServiceTable services={services} colNames={columnNames} />
                :  <CardLoading />
            }
        </>
    )
}
