import React from 'react'
import { Route, Redirect } from "react-router-dom"

function ProtectedRoute({ component: Component, ...rest}) {
    return (
        <Route {...rest}
            render={(props) => {
                if(localStorage.getItem('fundooToken')) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/signin" />
                }
            }} />
    )
}

export default ProtectedRoute
