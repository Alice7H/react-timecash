import { Col, Container, Row, Table } from "react-bootstrap";
import ColumnComponent from "../utils/ColumnComponent";
import {useState, useEffect} from "react";
import { getProductsByService } from '../contexts/Firestore';
import ProductItems from "./ProductItems";
import CardLoading from "./CardLoading";

export default function ServiceProd({id}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");

    const columnNames = ["#", "Name", "Price", "Quantity", "Total"]

    useEffect(() => {
        async function getProducts() {
            setLoading(true)
            const res = await getProductsByService(id)
            if(res) {
                setProducts(res);
                setLoading(false)
            }
        }
        getProducts();
        return () => { getProducts() };
    }, [id])

    return (
        loading === false
        ?
        <Container>      
            <Row className="justify-content-md-center "> 
                <Col md="auto">
                    <div className="text-center my-5">
                        { products.length > 0 
                            ?<h4 className="text-center">Products</h4> 
                            : <h4 className="text-center">Don't have products</h4> 
                        }
                        <Table striped bordered hover responsive>
                            {products.length > 0 ? <ColumnComponent colNames={columnNames} /> : null}
                            { products.map(product => {                                    
                                return <ProductItems key={product.id} product={product} />                               
                            })} 
                        </Table>
                    </div>
                </Col> 
            </Row>
        </Container>
        :  <CardLoading />
    )
}
