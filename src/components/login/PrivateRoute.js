
// https://github.com/WebDevSimplified/React-Firebase-Auth
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
//import { useAuth } from '../../contexts/AuthContext'
import { UserContext } from '../../providers/UserProvider'

export default function PrivateRoute({component: Component, ...rest}) {
    const currentUser = useContext(UserContext)

    return (
        <Route 
        {...rest}
        render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/login" /> 
        }}
        >
            
        </Route>
    )
}
