import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import Column from "../Column";
import ProductItems from "../product/ProductItems";
import CardLoading from "../CardLoading";

export default function ProductShow(props) {
  const { id, loading, columnNames, products } = props;
  const history = useHistory();

  function handleBack() {
    history.goBack();
  }

  return (
    loading === false
      ?
      <main>
        <Container className="my-5 rounded bg-light pb-2">
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

          <div className="w-100 text-center my-5">
            <Link to={`/product-create/${id}`} title='Add product'>
              <Button className="mt-3 mr-3" variant='outline-success'>Add product</Button>
            </Link>
            <Button className="mt-3" variant='outline-primary' onClick={handleBack}>Back</Button>
          </div>
        </Container>
      </main>
      : <CardLoading />
  )
}
