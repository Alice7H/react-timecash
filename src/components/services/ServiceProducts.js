import React from 'react'
import ProductColumn from  "../products/ProductColumn";
import ProductItem from "../products/ProductItem";
import { Link } from "react-router-dom";
import { Col, Table } from "react-bootstrap";

export default function ServiceProducts({products, id}) {
    return (
        <Col md="auto">
            <div className='text-center my-5'>
                { products.length > 0 ? <h1> Products</h1> : <h1>Don't have products</h1> }
                <div className="text-right mb-3">
                    <Link to={`/product/${id}`}>
                        <button> Add Product</button>
                    </Link>
                </div>
                <Table striped bordered hover responsive>
                    { products.length > 0 ? <ProductColumn isResult={false} /> : null }
                    { products.map(product => {                                    
                        return <ProductItem  key={product.id} product={product} isResult={false}/>
                    })} 
                </Table>
            </div>                                         
        </Col>
    )
}
