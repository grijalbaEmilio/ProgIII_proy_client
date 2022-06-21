import React, { useState, useEffect, createContext } from "react"
import {
    getAccessToken,
    getRefreshToken,
    refreshAccessToken,
    logout
} from "../api/auth"

import jwtDecode from "jwt-decode"
export const AuthContext = createContext({})

export default function AuthProvider(props) {
    //console.log('en provider -->', props);
    const { children } = props
    const [user, setUser] = useState({
        user: null,
        isLoanding: true
    })
    useEffect(() => {
        chekUserLogin(setUser)
    }, [])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
const chekUserLogin = (setUser) => {
    //console.log('foncion checking');
    const accessToken = getAccessToken()
    /* validamos si el token es invàlido o nulo */
    if (!accessToken) {
        const refreshToken = getRefreshToken()
        /* validamos si el token caducò o expiro */
        if (!refreshToken) {
            /* si hay algo el el localStorage lo eliminamos */
            logout()
            setUser({
                user: null,
                isLoanding: false
            })
        }
    } else {
        /* validamos si el accessToken es vàlido */
        setUser({
            user: jwtDecode(accessToken),
            isLoanding: false
        })
    }
}

