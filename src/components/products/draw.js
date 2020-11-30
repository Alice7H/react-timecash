import { UserConsumer } from "../../context";
import { Link, useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import ProductEmpty from "./ProductEmpty";
import ProductColumn from "./ProductColumn";
import { Col, Container, Row, Table } from "react-bootstrap";

export default function ProductList() {
    const {id} = useParams();
    return (
        <UserConsumer>
           { values => {
                const products = values.handleProducts(id);
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                        { products ? <h1> Products</h1> : null }
                            <div className='text-center my-5'>
                                <div className="text-right mb-3">
                                    <Link to="/product">
                                        <button> Add Product</button>
                                    </Link>
                                </div>
                                <Table striped bordered hover responsive>
                                    {products.length > 0 ? <ProductColumn isResult={true}/> : <ProductEmpty/>}
                                    { products.map(product => {                                    
                                        return <ProductItem  key={product.id} product={product} isResult={false}/>
                                    })} 
                                </Table>
                            </div>  
                        </Col>
                    </Row>
                </Container>
           }}
        </UserConsumer>
    )
}
