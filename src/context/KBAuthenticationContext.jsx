import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    isKBAuthenticated: false,
    userInfo: {
        email: 'guest@email.com',
        name: 'guest',
        role: 'guest',
        status: 'inactive'
    },
    infoMessage: ''
}

function authenticationReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isKBAuthenticated: true,
                userInfo: {
                    email: action.email,
                    name: action.name,
                    role: action.role,
                    status: action.status
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                isKBAuthenticated: false,
                userInfo: {}
            }
        case 'NETWORK_ERROR':
            return {
                ...state,
                infoMessage: 'Something wrong with the network'
            }
        case 'UNAUTHORIZED':
            return {
                ...state,
                isKBAuthenticated: false,
                userInfo: {},
                infoMessage: 'Your session has expired or you may not authorized! Please login again.'
            }
        default:
            return { ...state }
    }
}

function authenticationInit() {
    const userInformation = JSON.parse(window.sessionStorage.getItem('userInfo')) || null

    const KBAuthState = {
        isKBAuthenticated: true,
        userInfo: userInformation,
        infoMessage: ''
    }

    if (userInformation) return KBAuthState
    else return initialState
}

export const KBAuthenticationContext = createContext('')

function KBAuthenticationProvider(props) {
    const [state, dispatch] = useReducer(authenticationReducer, initialState, authenticationInit)

    const value = useMemo(
        () => ({
            state,
            dispatch
        }),
        [state, dispatch]
    )

    return <KBAuthenticationContext.Provider value={value}>{props.children}</KBAuthenticationContext.Provider>
}

export function useKBAuthentication() {
    const { state, dispatch } = useContext(KBAuthenticationContext)

    if (state === undefined) throw new Error('useAuthContext must be used within a Authentication Provider')

    return {
        state,
        dispatch,
        isKBAuthenticated: state.isKBAuthenticated,
        role: state.userInfo.role
    }
}

export default KBAuthenticationProvider
