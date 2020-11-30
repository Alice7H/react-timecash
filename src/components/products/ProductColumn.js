import React from 'react'

export default function ProductColumn({isResult}) {
    return (
        <thead className="text-center">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                { isResult ? null : <th>Actions</th> }
            </tr>
        </thead>
    
    )
}
