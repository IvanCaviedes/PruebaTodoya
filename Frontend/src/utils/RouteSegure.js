import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux'


const isauth = (payload) => {
    if (payload.length === 0) {
        return false
    }
    return true
}

const Privateroute = ({ component: Component, ...rest }) => {
    const { payload } = useSelector(e => e.AuthReducer)

    return (
        <Route
            {...rest}
            render={props =>
                isauth(payload) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { mensaje: 'Usuario no autorizado' }
                        }}
                    />
                )}
        />
    )
}
export default Privateroute;