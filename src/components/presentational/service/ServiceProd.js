import { Col, Container, Row, Table } from "react-bootstrap";
import Column from "../Column";
import ProductItems from "../product/ProductItems";
import CardLoading from "../CardLoading";

export default function ServiceProd(props) {
    const { id, loading, columnNames, products } = props;
    return (
        loading === false
            ?
            <Container>
                <Row className="justify-content-md-center ">
                    <Col md="auto" className="w-100">
                        <div className="text-center my-5">
                            {products.length > 0
                                ? (<>
                                    <h2 className="text-center text-main">Products</h2>
                                    <Table striped bordered hover responsive>
                                        <Column colNames={columnNames} />
                                        {products.map(product => {
                                            return <ProductItems key={product.id} product={product} serviceId={id} />
                                        })}
                                    </Table>
                                </>
                                )
                                : <h4 className="text-center">Don't have products</h4>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
            : <CardLoading />
    )
}
