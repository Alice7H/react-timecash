import React from 'react'

export default function Column({colNames}) {
    return (
        <thead className="text-center">
            <tr>
            { colNames.map( (names,index) => <th key={index}>{names}</th>) }
            </tr>
        </thead>
    )
}
