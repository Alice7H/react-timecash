import { Col, Container, Row, Table } from "react-bootstrap";
import ProductItem from "../products/ProductItem";
import ProductColumn from "../products/ProductColumn";

export default function ResultProduct({products}) {
    return (
        <Container>      
            <Row className="justify-content-md-center "> 
                <Col md="auto">
                    <div className="text-center my-5">
                        { products.length >= 1 
                            ?<h4 className="text-center">Products</h4> 
                            : <h4 className="text-center">Don't have products</h4> 
                        }
                        <Table striped bordered hover responsive>
                            {products.length > 0 ? <ProductColumn isResult={true}/> : null}
                            { products.map(product => {                                    
                                return <ProductItem key={product.id} product={product} isResult={true} />                               
                            })} 
                        </Table>
                    </div>
                </Col> 
            </Row>
        </Container>
    )
}
