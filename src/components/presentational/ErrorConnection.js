import React from 'react';
import CardBox from './CardBox';

export default function ErrorConnection() {
    return (
        <div>
        <CardBox minHeight="65vh" maxWidth="900px">
            <div className="text-right">
                <h2 className="text-uppercase">ERR_INTERNET_DISCONNECTED</h2>
                <h3 className="text-uppercase">Please, verify your internet connection</h3>          
                <p className="text-uppercase">..And reload the page</p>          
            </div>
        </CardBox>
    </div>
    )
}
