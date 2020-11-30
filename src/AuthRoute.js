import React from "react"
import { Redirect, Route } from "react-router-dom"
import {useAuth } from "./context"

export default function AuthRoute({component: Component, ...rest}) {
    const { user, loading } = useAuth()
    
    return (
        <Route
            {...rest}
            render={props => {
                return user && !loading ? <Component {...props}/> : <Redirect to="/login"/>
            }}>
        </Route> 
    )
}
